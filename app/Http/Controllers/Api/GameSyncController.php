<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\GameSyncService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GameSyncController extends Controller
{
    public function __construct(
        protected GameSyncService $syncService,
    ) {}

    /**
     * Batch synchronization of player clicks and purchases
     */
    public function sync(Request $request): JsonResponse
    {
        $user = Auth::user();

        // Fallback for guest or direct API calls
        if (! $user) {
            $user = User::first();
        }

        if (! $user) {
            return response()->json(['error' => 'Пользователь не найден'], 401);
        }

        $validated = $request->validate([
            'clicks' => 'nullable|integer|min:0',
            'elapsed_seconds' => 'nullable|numeric|min:0.1',
            'purchases' => 'nullable|array',
            'client_coins' => 'nullable|numeric',
        ]);

        $result = $this->syncService->processSync($user, $validated, $request->ip());

        return response()->json($result);
    }

    /**
     * Claim offline earnings
     */
    public function claimOffline(Request $request): JsonResponse
    {
        $user = Auth::user() ?? User::first();
        if (! $user) {
            return response()->json(['error' => 'Пользователь не найден'], 401);
        }

        $double = (bool) $request->input('double_with_gems', false);
        $result = $this->syncService->claimOfflineBonus($user, $double);

        return response()->json($result);
    }
}
