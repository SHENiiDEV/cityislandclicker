<?php

namespace App\Http\Controllers;

use App\Models\Upgrade;
use App\Models\User;
use App\Services\GameSyncService;
use App\Services\PaymentService;
use Database\Seeders\UpgradeSeeder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GameController extends Controller
{
    public function __construct(
        protected GameSyncService $syncService,
        protected PaymentService $paymentService,
    ) {}

    public function play(Request $request): Response|RedirectResponse
    {
        $user = $request->user();

        if (! $user) {
            return redirect()->route('login');
        }

        $sessionSecret = $user->ensureSessionSecret();
        $offlineProgress = $this->syncService->getOfflineProgress($user);

        // Ensure upgrades are seeded if database was freshly created
        if (Upgrade::count() === 0) {
            $seeder = new UpgradeSeeder;
            $seeder->run();
        }

        // Load all upgrades with current user level
        $userUpgrades = $user->userUpgrades()->get()->keyBy('upgrade_id');
        $upgrades = Upgrade::orderBy('order')->get()->map(function ($upgrade) use ($userUpgrades) {
            $userUpgrade = $userUpgrades->get($upgrade->id);
            $currentLevel = $userUpgrade ? $userUpgrade->level : 0;

            return [
                'id' => $upgrade->id,
                'key' => $upgrade->key,
                'name' => $upgrade->name,
                'description' => $upgrade->description,
                'category' => $upgrade->category,
                'base_cost' => $upgrade->base_cost,
                'cost_multiplier' => $upgrade->cost_multiplier,
                'base_power' => $upgrade->base_power,
                'icon' => $upgrade->icon,
                'tier' => $upgrade->tier,
                'level' => $currentLevel,
                'next_cost' => $upgrade->getCostForLevel($currentLevel),
                'current_total_power' => $currentLevel * $upgrade->base_power,
            ];
        });

        return Inertia::render('Game', [
            'initialUser' => [
                'id' => $user->id,
                'name' => $user->name,
                'coins' => $user->coins,
                'gems' => $user->gems,
                'tap_power' => $user->getTapPower(),
                'passive_rate' => $user->getPassiveRate(),
                'total_clicks' => $user->total_clicks,
            ],
            'upgrades' => $upgrades,
            'offlineProgress' => $offlineProgress,
            'packages' => $this->paymentService->getPackages(),
            'sessionSecret' => $sessionSecret,
        ]);
    }
}
