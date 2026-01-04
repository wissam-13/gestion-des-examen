<?php

use App\Http\Controllers\Teacher\Auth\TeacherAuthController;
use App\Http\Controllers\Teacher\Auth\TeacherForgotPasswordController;
use App\Http\Controllers\Teacher\Auth\TeacherResetPasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('teacher')->group(function(){
    Route::post('/login', [TeacherAuthController::class, 'login']);
    Route::post('/signup', [TeacherAuthController::class, 'signup']);

    // Reset Password
    Route::controller(TeacherForgotPasswordController::class)->group(function(){
        Route::post('/forgot-password','sendVerificationCodeEmail');
    });
    Route::controller(TeacherResetPasswordController::class)->group(function(){
        Route::post('/reset-password','send');
        Route::get('/reset-password/{email}/{token}','index')->name('teacher.password.reset');
    });
    Route::middleware('auth:teacher')->group(function () {
        Route::post('/logout', [TeacherAuthController::class, 'logout']);
    });
});