<?php

namespace App\Services;

use App\Mail\TopUpReceiptMail;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class PaymentService
{
    /**
     * Catalog of top-up packages (in English)
     */
    public function getPackages(): array
    {
        return [
            [
                'key' => 'starter_pack',
                'name' => 'First Mayor Starter Kit',
                'description' => '100 Gems + 15,000 Starter Coins to jumpstart your tropical colony.',
                'price' => 1.99,
                'currency' => 'USD',
                'gems' => 100,
                'bonus_coins' => 15000,
                'badge' => '2x Value',
                'icon' => 'Sparkles',
            ],
            [
                'key' => 'mayor_vault',
                'name' => 'Mayor\'s Vault',
                'description' => '300 Gems + 80,000 Coins to construct seaside hotels and harbors.',
                'price' => 4.99,
                'currency' => 'USD',
                'gems' => 300,
                'bonus_coins' => 80000,
                'badge' => 'Popular',
                'icon' => 'Landmark',
            ],
            [
                'key' => 'tycoon_chest',
                'name' => 'Tycoon Chest',
                'description' => '750 Gems + 300,000 Coins. Instant leap to the high-income premier league!',
                'price' => 9.99,
                'currency' => 'USD',
                'gems' => 750,
                'bonus_coins' => 300000,
                'badge' => 'Best Value',
                'icon' => 'Crown',
            ],
            [
                'key' => 'island_ruler',
                'name' => 'Archipelago Empire',
                'description' => '2,000 Gems + 1,500,000 Coins. Build your spaceport and dominate the seas!',
                'price' => 19.99,
                'currency' => 'USD',
                'gems' => 2000,
                'bonus_coins' => 1500000,
                'badge' => 'VIP',
                'icon' => 'Rocket',
            ],
        ];
    }

    /**
     * Find a package by key
     */
    public function findPackage(string $key): ?array
    {
        foreach ($this->getPackages() as $package) {
            if ($package['key'] === $key) {
                return $package;
            }
        }

        return null;
    }

    /**
     * Initiate a pending transaction
     */
    public function createCheckout(User $user, string $packageKey): array
    {
        $package = $this->findPackage($packageKey);
        if (! $package) {
            return [
                'success' => false,
                'message' => 'Unknown package selected.',
            ];
        }

        $orderId = 'ORD-'.strtoupper(Str::random(10));

        $transaction = Transaction::create([
            'user_id' => $user->id,
            'order_id' => $orderId,
            'package_key' => $packageKey,
            'amount_fiat' => $package['price'],
            'currency' => $package['currency'],
            'gems_reward' => $package['gems'],
            'status' => 'pending',
            'payment_gateway' => 'city_island_pay',
            'payload' => [
                'bonus_coins' => $package['bonus_coins'],
                'package_name' => $package['name'],
            ],
        ]);

        return [
            'success' => true,
            'order_id' => $orderId,
            'amount' => $package['price'],
            'currency' => $package['currency'],
            'package' => $package,
        ];
    }

    /**
     * Process simulated payment or incoming webhook
     * Idempotent: safe against double triggers
     */
    public function processWebhook(string $orderId, array $gatewayData = []): array
    {
        return DB::transaction(function () use ($orderId, $gatewayData) {
            $transaction = Transaction::where('order_id', $orderId)->lockForUpdate()->first();

            if (! $transaction) {
                return [
                    'success' => false,
                    'message' => 'Transaction not found.',
                ];
            }

            // Idempotency: if already completed, do not credit twice
            if ($transaction->status === 'success') {
                return [
                    'success' => true,
                    'already_processed' => true,
                    'message' => 'Transaction has already been processed.',
                ];
            }

            $user = User::where('id', $transaction->user_id)->lockForUpdate()->first();
            $package = $this->findPackage($transaction->package_key);

            $bonusCoins = $transaction->payload['bonus_coins'] ?? ($package['bonus_coins'] ?? 0);
            $gemsReward = $transaction->gems_reward;

            // Credit gems and bonus coins to user
            $user->gems += $gemsReward;
            $user->coins += $bonusCoins;
            $user->save();

            // Mark transaction as success
            $transaction->status = 'success';
            $transaction->paid_at = Carbon::now();
            $transaction->payload = array_merge($transaction->payload ?? [], [
                'processed_at' => Carbon::now()->toIso8601String(),
                'gateway_data' => $gatewayData,
            ]);
            $transaction->save();

            // Send receipt email with PDF invoice attachment
            try {
                Mail::to($user->email)->send(new TopUpReceiptMail($transaction));
            } catch (\Throwable $e) {
                Log::warning('Payment receipt email failed to send: '.$e->getMessage());
            }

            return [
                'success' => true,
                'already_processed' => false,
                'order_id' => $orderId,
                'gems_awarded' => $gemsReward,
                'coins_awarded' => $bonusCoins,
                'user_new_gems' => $user->gems,
                'user_new_coins' => $user->coins,
            ];
        });
    }
}
