<?php

use App\Http\Controllers\JenisNilaiController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\RekapanController;
use App\Models\JenisNilai;
use App\Models\Kelas;
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

//  ini berisi data yang diperlukan saat ingin membuat penilaian
Route::get("/nilai/create", function () {
    return response()->json([
        "kelas" => Kelas::all(),
        "jenis" => JenisNilai::all()
    ]);
})->name("api.nilai.create");
