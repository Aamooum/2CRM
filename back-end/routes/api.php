<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\TaskController;
use App\Models\Task;
use App\Events\MyLol;


Route::post('login',    [AuthController::class, 'login']);    // public
Route::post('register', [AuthController::class, 'register']); // public

Route::middleware('jwt.auth')->group(function () {
    // User Profile
    Route::get('profile', [AuthController::class, 'profile']);

    // Task CRUD
    Route::apiResource('tasks', TaskController::class);
});
