<?php

namespace App\Services;

use App\Models\SyncLog;
use App\Models\Upgrade;
use App\Models\User;
use App\Models\UserUpgrade;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class GameSyncService
{
    // Maximum allowable human clicks per second before flagging as autohotkey / macro
    public const MAX_CPS_PHYSICAL = 18.0;

    public const CPS_BURST_TOLERANCE = 5.0; // allows small bursts or network sync latency delay

    /**
     * Compute offline progress for user on login / page load
     */
    public function getOfflineProgress(User $user): array
    {
        $lastSync = $user->last_sync_at;
        $passiveRate = $user->getPassiveRate();

        if (! $lastSync || $passiveRate <= 0) {
            return [
                'has_bonus' => false,
                'offline_seconds' => 0,
                'offline_coins' => 0,
                'passive_rate' => $passiveRate,
            ];
        }

        $now = Carbon::now();
        $elapsedSeconds = max(0, $now->getTimestamp() - $lastSync->getTimestamp());

        // Ignore short pauses under 30 seconds
        if ($elapsedSeconds < 30) {
            return [
                'has_bonus' => false,
                'offline_seconds' => $elapsedSeconds,
                'offline_coins' => 0,
                'passive_rate' => $passiveRate,
            ];
        }

        // Cap offline calculation to 24 hours (86,400 seconds)
        $cappedSeconds = min(86400, $elapsedSeconds);
        $offlineCoins = round($cappedSeconds * $passiveRate);

        return [
            'has_bonus' => $offlineCoins > 0,
            'offline_seconds' => $cappedSeconds,
            'total_absent_seconds' => $elapsedSeconds,
            'offline_coins' => $offlineCoins,
            'passive_rate' => $passiveRate,
        ];
    }

    /**
     * Claim the offline bonus
     */
    public function claimOfflineBonus(User $user, bool $doubleWithGems = false): array
    {
        $bonus = $this->getOfflineProgress($user);
        if (! $bonus['has_bonus']) {
            return [
                'success' => false,
                'message' => 'No offline rewards available.',
            ];
        }

        $coinsToAward = $bonus['offline_coins'];

        if ($doubleWithGems) {
            $gemCost = 10;
            if ($user->gems < $gemCost) {
                return [
                    'success' => false,
                    'message' => 'Not enough gems to double your offline rewards.',
                ];
            }
            $user->gems -= $gemCost;
            $coinsToAward *= 2;
        }

        $user->coins += $coinsToAward;
        $user->last_sync_at = Carbon::now();
        $user->save();

        return [
            'success' => true,
            'coins_awarded' => $coinsToAward,
            'new_coins' => $user->coins,
            'new_gems' => $user->gems,
        ];
    }

    /**
     * Process batch synchronization from client
     */
    public function processSync(User $user, array $data, ?string $ipAddress = null): array
    {
        return DB::transaction(function () use ($user, $data, $ipAddress) {
            // Lock user row for update
            $user = User::where('id', $user->id)->lockForUpdate()->first();

            $clicks = max(0, (int) ($data['clicks'] ?? 0));
            $clientElapsed = max(0.5, (float) ($data['elapsed_seconds'] ?? 1.0));
            $purchases = (array) ($data['purchases'] ?? []);

            $lastSync = $user->last_sync_at ?? Carbon::now()->subSeconds((int) $clientElapsed);
            $realElapsedSeconds = max(0.5, (float) (Carbon::now()->getTimestamp() - $lastSync->getTimestamp()));
            // Use maximum between client-reported elapsed time and server timestamp delta
            $elapsedSeconds = max($clientElapsed, $realElapsedSeconds);

            $tapPower = $user->getTapPower();
            $passiveRate = $user->getPassiveRate();

            // 1. Anti-Cheat Check: CPS
            $cps = $clicks / $elapsedSeconds;
            $isFlagged = false;
            $flagReason = null;

            $maxAllowedClicks = round($elapsedSeconds * self::MAX_CPS_PHYSICAL + self::CPS_BURST_TOLERANCE);

            if ($clicks > $maxAllowedClicks) {
                $isFlagged = true;
                $flagReason = sprintf('Exceeded CPS physical threshold: %.1f clicks/sec (limit %.1f)', $cps, self::MAX_CPS_PHYSICAL);
                $user->cheat_flags += 1;
                // Clamp clicks to maximum allowable to prevent infinite balance inflation
                $clicks = $maxAllowedClicks;
            }

            // 2. Earnings calculation
            $earnedFromClicks = $clicks * $tapPower;
            $earnedFromPassive = round($elapsedSeconds * $passiveRate);
            $totalEarned = $earnedFromClicks + $earnedFromPassive;

            $currentBalance = $user->coins + $totalEarned;

            // 3. Process upgrade purchases
            $upgradesCatalog = Upgrade::all()->keyBy('key');
            $appliedPurchases = [];
            $totalSpent = 0;

            foreach ($purchases as $item) {
                $upgradeKey = $item['upgrade_key'] ?? null;
                $count = max(1, (int) ($item['count'] ?? 1));

                if (! $upgradeKey || ! isset($upgradesCatalog[$upgradeKey])) {
                    continue;
                }

                $upgrade = $upgradesCatalog[$upgradeKey];
                $userUpgrade = UserUpgrade::firstOrCreate([
                    'user_id' => $user->id,
                    'upgrade_id' => $upgrade->id,
                ], ['level' => 0]);

                for ($i = 0; $i < $count; $i++) {
                    $nextCost = $upgrade->getCostForLevel($userUpgrade->level);
                    if ($currentBalance >= $nextCost) {
                        $currentBalance -= $nextCost;
                        $totalSpent += $nextCost;
                        $userUpgrade->level += 1;
                        $appliedPurchases[$upgradeKey] = $userUpgrade->level;
                    } else {
                        // Not enough coins for this upgrade step
                        $isFlagged = true;
                        $flagReason = ($flagReason ? $flagReason.'; ' : '').
                            "Insufficient balance to purchase '{$upgrade->name}'";
                        break;
                    }
                }

                $userUpgrade->save();
            }

            // 4. Update user state
            $user->coins = round($currentBalance);
            $user->total_clicks += $clicks;
            $user->last_sync_at = Carbon::now();
            $user->save();

            // 5. Log synchronization
            SyncLog::create([
                'user_id' => $user->id,
                'ip_address' => $ipAddress,
                'cps' => round($cps, 2),
                'earned_clicks' => $earnedFromClicks,
                'earned_passive' => $earnedFromPassive,
                'is_flagged' => $isFlagged,
                'flag_reason' => $flagReason,
            ]);

            // Re-calculate updated powers after purchases
            $newTapPower = $user->getTapPower();
            $newPassiveRate = $user->getPassiveRate();

            return [
                'success' => true,
                'coins' => $user->coins,
                'gems' => $user->gems,
                'tap_power' => $newTapPower,
                'passive_rate' => $newPassiveRate,
                'total_clicks' => $user->total_clicks,
                'is_flagged' => $isFlagged,
                'server_time' => Carbon::now()->toIso8601String(),
            ];
        });
    }
}
