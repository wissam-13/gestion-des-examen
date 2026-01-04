<?php

use App\Http\Controllers\Admin\AuditLogController;
use App\Http\Controllers\Admin\Auth\AdminAuthController;
use App\Http\Controllers\Admin\Auth\AdminForgotPasswordController;
use App\Http\Controllers\Admin\Auth\AdminResetPasswordController;
use App\Http\Controllers\Admin\EnrollementController;
use App\Http\Controllers\Admin\GroupController;
use App\Http\Controllers\Admin\PlanerController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\TeacherConstraintController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group(function(){
    Route::post('/login', [AdminAuthController::class, 'login']);
    // Route::post('/signup', [AdminAuthController::class, 'signup']);

    // Reset Password
    Route::controller(AdminForgotPasswordController::class)->group(function(){
        Route::post('/forgot-password','sendVerificationCodeEmail');
    });

    Route::controller(AdminResetPasswordController::class)->group(function(){
        Route::post('/reset-password','send');
        Route::get('/reset-password/{email}/{token}','index')->name('admin.password.reset');
    });

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
        // Manage Groups
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
        // Manage Teacher Constraints
        Route::controller(TeacherConstraintController::class)->prefix('constraint')->group(function(){
            Route::get('/','index');
            Route::get('/teacher/{teacher}','index_teacher');
            Route::post('/','store');
            Route::get('/{const}/show','show');
            Route::put('/{const}','update');
            Route::delete('/{const}','destroy');
        });
        // manage log audit
        Route::controller(AuditLogController::class)->prefix('logaudit')->group(function(){
            Route::get('/current','index_admin');
            Route::get('/{auditlog}/show','show');
            Route::delete('/{auditlog}','destroy');
            Route::delete('/clearhistory/all','destroy_admin');
        });
    });
});