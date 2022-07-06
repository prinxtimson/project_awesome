<?php

use App\Http\Controllers\BasecampController;
use App\Http\Controllers\LmsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'basecamp'], function() {
    Route::get('people', [BasecampController::class, 'people']);
    Route::get('activities', [BasecampController::class, 'activities']);
    Route::get('campfires', [BasecampController::class, 'campfires']);
    Route::get('search', [BasecampController::class, 'search']);
});

Route::group(['prefix' => 'lms'], function() {
    Route::get('search', [LmsController::class, 'search']);
});