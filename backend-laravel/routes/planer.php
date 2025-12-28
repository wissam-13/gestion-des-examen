<?php

use App\Http\Controllers\Admin\GroupController;
use App\Http\Controllers\Planner\Auth\PlannerAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('planer')->group(function(){
    Route::post('/login', [PlannerAuthController::class, 'login']);
    Route::post('/signup', [PlannerAuthController::class, 'signup']);

    Route::middleware('auth:planer')->group(function () {
        Route::post('/logout', [PlannerAuthController::class, 'logout']);
        // Mange Groups
        Route::controller(GroupController::class)->prefix('group')->group(function(){
            Route::get('/','index');
            Route::post('/','store');
            Route::get('/{group}/show','show');
            Route::put('/{group}','update');
            Route::delete('/{group}','destroy');
        });
    });
});