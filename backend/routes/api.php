<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BonLivraisonController;
use App\Http\Controllers\Api\CategorieController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\ColisController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\FactureController;
use App\Http\Controllers\Api\ProduitController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ReclamationController;
use App\Http\Controllers\Api\VilleController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// Public auth

Route::post('auth/register', [AuthController::class, 'register']);
Route::post('auth/login', [AuthController::class, 'login']);

// Protected API (JWT required)
Route::middleware('auth:api')->group(function () {
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::post('auth/refresh', [AuthController::class, 'refresh']);
    Route::get('auth/me', [AuthController::class, 'me']);

    Route::get('dashboard/stats', [DashboardController::class, 'stats']);
    Route::get('dashboard/recent', [DashboardController::class, 'recentActivity']);

    Route::apiResource('colis', ColisController::class);
    Route::apiResource('produits', ProduitController::class);
    Route::apiResource('villes', VilleController::class);
    Route::apiResource('clients', ClientController::class);
    Route::apiResource('categories', CategorieController::class);
    Route::apiResource('profiles', ProfileController::class)->parameters(['profiles' => 'profile']);
    Route::apiResource('factures', FactureController::class);
    Route::apiResource('bons-livraison', BonLivraisonController::class)->parameters(['bons-livraison' => 'bonLivraison']);
    Route::apiResource('reclamations', ReclamationController::class);
});
