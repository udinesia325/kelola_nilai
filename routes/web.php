<?php

use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\NilaiController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RekapanController;
use App\Http\Controllers\SiswaController;
use Illuminate\Foundation\Application;
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

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });


Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    // untuk user
    Route::get("/users", [UserController::class, "index"])->name("users");
    Route::post("/users/import", [UserController::class, "import"])->name("users.import");

    //untuk siswa
    Route::get('/siswa', [SiswaController::class, "index"])->name("siswa");
    Route::post('/siswa/import', [SiswaController::class, "import"])->name("siswa.import");

    // untuk nilai
    Route::get("/nilai", [NilaiController::class, "index"])->name("nilai");
    Route::get("/nilai/create", [NilaiController::class, "create"])->name("nilai.create");
    Route::post("/nilai/store", [NilaiController::class, "store"])->name("nilai.store");
    Route::get("/nilai/show", [NilaiController::class, "show"])->name("nilai.show");
    Route::get("/nilai/edit", [NilaiController::class, "edit"])->name("nilai.edit");
    Route::put("/nilai/update", [NilaiController::class, "update"])->name("nilai.update");
    Route::delete("/nilai/delete", [NilaiController::class, "delete"])->name("nilai.delete");


    // rekapan nilai
    Route::get("/rekapan", [RekapanController::class, "index"])->name("rekapan");
    Route::get("/rekapan/show", [RekapanController::class, "show"])->name("rekapan.show");
});

require __DIR__ . '/auth.php';

// Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
// Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
// Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');