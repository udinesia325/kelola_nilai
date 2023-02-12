<?php

use App\Http\Controllers\JenisNilaiController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\RekapanController;
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
Route::get("/kelas", [KelasController::class, "getAll"])->name("api.kelas");
Route::get("/jenis", [JenisNilaiController::class, "show"])->name("api.jenis");
Route::get("/rekapan/mingguan", [RekapanController::class, "mingguan"])->name("api.rekapan.mingguan");
