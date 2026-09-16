<?php

use App\Http\Controllers\Api\GameSyncController;
use App\Http\Controllers\Api\PaymentController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth'])->group(function () {
    // Game synchronization (Authenticated Mayors Only)
    Route::post('/game/sync', [GameSyncController::class, 'sync']);
    Route::post('/game/claim-offline', [GameSyncController::class, 'claimOffline']);

    // Payments
    Route::get('/payment/packages', [PaymentController::class, 'packages']);
    Route::post('/payment/checkout', [PaymentController::class, 'checkout']);
});

Route::middleware('web')->group(function () {
    Route::post('/payment/webhook', [PaymentController::class, 'webhook']);
    Route::post('/payment/simulate-success', [PaymentController::class, 'webhook']);
});
