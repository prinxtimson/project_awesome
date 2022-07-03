<?php

use App\Actions\Basecamp\Basecamp;
use App\Http\Controllers\BasecampController;
use App\Http\Controllers\LmsController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Redirect::route('login');
});

Route::get('/login', function () {
    return Inertia::render('Auth/Login', [
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/help', function () {
    return Inertia::render('Help');
})->middleware(['auth', 'verified'])->name('help');

Route::get('/profile', function () {
    return Inertia::render('Profile', ['status' => session('status')]);
})->middleware(['auth', 'verified'])->name('profile');

Route::middleware(['auth'])->group(function () {

    Route::put('/change-password', [UserController::class, 'changePass'])->name('change-password');

    Route::put('/update', [UserController::class, 'update'])->name('update');
});

Route::get('basecamp/download', [BasecampController::class, 'download'])->middleware(['auth']);
Route::get('basecamp/email', [BasecampController::class, 'email'])->middleware(['auth']);

Route::get('lms/download', [LmsController::class, 'download']);

require __DIR__.'/auth.php';
