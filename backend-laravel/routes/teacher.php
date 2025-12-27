<?php

use App\Http\Controllers\Teacher\Auth\TeacherAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('teacher')->group(function(){
    Route::post('/login', [TeacherAuthController::class, 'login']);
    Route::post('/signup', [TeacherAuthController::class, 'signup']);

    Route::middleware('auth:teacher')->group(function () {
        Route::post('/logout', [TeacherAuthController::class, 'logout']);
    });
});