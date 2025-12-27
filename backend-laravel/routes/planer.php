<?php

use App\Http\Controllers\Planner\Auth\PlannerAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('planer')->group(function(){
    Route::post('/login', [PlannerAuthController::class, 'login']);
    Route::post('/signup', [PlannerAuthController::class, 'signup']);

    Route::middleware('auth:planer')->group(function () {
        Route::post('/logout', [PlannerAuthController::class, 'logout']);
    });
});