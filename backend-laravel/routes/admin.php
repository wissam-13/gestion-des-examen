<?php

use App\Http\Controllers\Admin\Auth\AdminAuthController;
use App\Http\Controllers\Admin\PlanerController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group(function(){
    Route::post('/login', [AdminAuthController::class, 'login']);
    // Route::post('/signup', [AdminAuthController::class, 'signup']);

    //  When the admin Auth
    Route::middleware('auth:admin')->group(function () {
        Route::post('/logout', [AdminAuthController::class, 'logout']);
        // Manage students
        Route::controller(UserController::class)->prefix('etudiant')->group(function(){
            Route::get('/','index');
            Route::post('/','store');
            Route::get('/{user}/show','show');
            Route::put('/{user}','update');
            Route::delete('/{user}','destroy');
            Route::put('/{user}/active','active');
        });
        // Manage Teachers
        Route::controller(TeacherController::class)->prefix('teacher')->group(function(){
            Route::get('/','index');
            Route::post('/','store');
            Route::get('/{teacher}/show','show');
            Route::put('/{teacher}','update');
            Route::delete('/{teacher}','destroy');
            Route::put('/{teacher}/active','active');
        });
        // Manage Planers
        Route::controller(PlanerController::class)->prefix('planer')->group(function(){
            Route::get('/','index');
            Route::post('/','store');
            Route::get('/{planer}/show','show');
            Route::put('/{planer}','update');
            Route::delete('/{planer}','destroy');
            Route::put('/{planer}/active','active');
        });
    });
});