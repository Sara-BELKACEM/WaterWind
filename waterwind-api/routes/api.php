<?php

use App\Http\Controllers\Api\AnalysisController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\CropController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\MineralController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\SoilController;
use App\Http\Controllers\Api\StatisticsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes (no authentication required)
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register'])
    ->middleware('throttle:10,1');
Route::post('/login', [AuthController::class, 'login'])
    ->middleware('throttle:10,1');

Route::get('/products', [ProductController::class, 'index']);

Route::post('/contact', [ContactController::class, 'store'])
    ->middleware('throttle:5,1');

/*
|--------------------------------------------------------------------------
| Protected Routes (Sanctum token required)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'profile']);

    // Products
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    // Crops
    Route::get('/crops', [CropController::class, 'index']);
    Route::get('/crops/{id}', [CropController::class, 'show']);
    Route::post('/crops', [CropController::class, 'store']);
    Route::put('/crops/{id}', [CropController::class, 'update']);
    Route::delete('/crops/{id}', [CropController::class, 'destroy']);
    Route::post('/crops/{id}/soils', [CropController::class, 'syncSoils']);
    Route::post('/crops/{id}/minerals', [CropController::class, 'syncMinerals']);

    // Soils
    Route::get('/soils', [SoilController::class, 'index']);
    Route::get('/soils/{id}', [SoilController::class, 'show']);
    Route::post('/soils', [SoilController::class, 'store']);
    Route::put('/soils/{id}', [SoilController::class, 'update']);
    Route::delete('/soils/{id}', [SoilController::class, 'destroy']);

    // Minerals
    Route::get('/minerals', [MineralController::class, 'index']);
    Route::get('/minerals/{id}', [MineralController::class, 'show']);
    Route::post('/minerals', [MineralController::class, 'store']);
    Route::put('/minerals/{id}', [MineralController::class, 'update']);
    Route::delete('/minerals/{id}', [MineralController::class, 'destroy']);

    // Analysis — export MUST be before {id}
    Route::get('/analysis/export', [AnalysisController::class, 'export']);
    Route::get('/analysis', [AnalysisController::class, 'index']);
    Route::post('/analysis', [AnalysisController::class, 'store'])
        ->middleware('throttle:30,1');
    Route::get('/analysis/{id}', [AnalysisController::class, 'show']);
    Route::delete('/analysis/{id}', [AnalysisController::class, 'destroy']);

    // Dashboard & Statistics
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/statistics', [StatisticsController::class, 'index']);
    Route::get('/statistics/crops', [StatisticsController::class, 'crops']);
    Route::get('/statistics/soils', [StatisticsController::class, 'soils']);
    Route::get('/statistics/minerals', [StatisticsController::class, 'minerals']);
    Route::get('/statistics/devices', [StatisticsController::class, 'devices']);
    Route::get('/statistics/monthly', [StatisticsController::class, 'monthly']);
    Route::get('/statistics/dashboard', [StatisticsController::class, 'dashboard']);
});
