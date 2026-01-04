<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// PUBLIC
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

// Reset Password
Route::controller(ForgotPasswordController::class)->group(function(){
    Route::post('/forgot-password','sendVerificationCodeEmail');
});
Route::controller(ResetPasswordController::class)->group(function(){
    Route::post('/reset-password','send');
    Route::get('/reset-password/{email}/{token}','index')->name('password.reset');
});
// PROTECTED
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

require __DIR__.'/admin.php';
require __DIR__.'/teacher.php';
require __DIR__.'/planer.php';


