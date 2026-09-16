<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\LegalController;
use App\Http\Controllers\NewsController;
use Illuminate\Support\Facades\Route;

// Public Pages
Route::get('/', [LandingController::class, 'index'])->name('home');
Route::get('/terms', [LegalController::class, 'terms'])->name('legal.terms');
Route::get('/privacy', [LegalController::class, 'privacy'])->name('legal.privacy');
Route::get('/refunds', [LegalController::class, 'refunds'])->name('legal.refunds');
Route::get('/cookies', [LegalController::class, 'cookies'])->name('legal.cookies');

// News & Articles
Route::get('/news', [NewsController::class, 'index'])->name('news.index');
Route::get('/news/{slug}', [NewsController::class, 'show'])->name('news.show');

// Authentication Routes
Route::middleware('guest')->group(function () {
    Route::get('/register', [RegisterController::class, 'showRegistrationForm'])->name('register');
    Route::post('/register', [RegisterController::class, 'register']);

    Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [LoginController::class, 'login']);
});

Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

// Game Arena (Protected - Authenticated Mayors Only)
Route::middleware('auth')->group(function () {
    Route::get('/play', [GameController::class, 'play'])->name('game.play');
});
