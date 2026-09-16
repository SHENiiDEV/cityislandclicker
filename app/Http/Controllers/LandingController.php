<?php

namespace App\Http\Controllers;

use App\Models\Upgrade;
use App\Models\User;
use App\Services\NewsService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    public function index(Request $request): Response
    {
        $upgradesCount = Upgrade::count();
        $totalUsers = User::count();
        $totalClicks = User::sum('total_clicks');

        return Inertia::render('Landing', [
            'stats' => [
                'active_mayors' => max(1420, $totalUsers * 80 + 1240),
                'coins_mined' => max(8450000, $totalClicks * 150 + 5200000),
                'upgrades_available' => $upgradesCount > 0 ? $upgradesCount : 12,
                'islands_built' => 380,
            ],
            'articles' => NewsService::all(),
            'faq' => [
                [
                    'q' => 'How does progress synchronization work?',
                    'a' => 'The game manages your clicks and building levels locally in memory, syncing batched updates to the Laravel backend every 15 seconds and automatically whenever you close or switch browser tabs.',
                ],
                [
                    'q' => 'Do I continue earning coins while offline?',
                    'a' => 'Yes! Your city infrastructure continues generating income around the clock. When you log back in, your idle earnings are calculated with the option to double them using gems.',
                ],
                [
                    'q' => 'What are gems and how do I obtain them?',
                    'a' => 'Gems are premium island jewels used for instant speed boosters, doubling offline rewards, and exclusive city monuments. You receive free starter gems upon registration and can purchase additional packs in the Mayor Shop.',
                ],
                [
                    'q' => 'Is City Island Clicker mobile-friendly?',
                    'a' => 'Yes! The user interface is fully optimized for touch devices, supporting high-speed multi-touch tapping, fluid spring animations, and smooth responsive layouts.',
                ],
                [
                    'q' => 'How is fair play guaranteed?',
                    'a' => 'Our servers enforce physical click-per-second (CPS) limits and sequential transaction validation to ensure a secure, cheat-free community leaderboard.',
                ],
            ],
        ]);
    }
}
