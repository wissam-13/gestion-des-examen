<?php

use App\Http\Controllers\Admin\EnrollementController;
use App\Http\Controllers\Admin\GroupController;
use App\Http\Controllers\Admin\RoomController;
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
        // Manage Enrollements
        Route::controller(EnrollementController::class)->prefix('enrollement')->group(function(){
            Route::get('/','index');
            Route::get('/group/{group}','index_by_group');
            Route::post('/','store');
            Route::get('/{student}/{group}/show','show');
            Route::put('/{student}/{group}','update');
            Route::delete('/{student}/{group}','destroy');
        });
        // Manage Rooms
        Route::controller(RoomController::class)->prefix('room')->group(function(){
            Route::get('/','index');
            Route::post('/','store');
            Route::get('/{room}/show','show');
            Route::put('/{room}','update');
            Route::delete('/{room}','destroy');
        });
    });
});