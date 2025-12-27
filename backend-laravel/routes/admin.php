<?php

use App\Http\Controllers\Admin\Auth\AdminAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group(function(){
    Route::post('/login', [AdminAuthController::class, 'login']);
    Route::post('/signup', [AdminAuthController::class, 'signup']);

    Route::middleware('auth:admin')->group(function () {
        Route::post('/logout', [AdminAuthController::class, 'logout']);
    });
});