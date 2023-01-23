<?php

namespace App\Http\Controllers;

use App\Http\Requests\SiswaImportRequest;
use App\Http\Resources\SiswaResource;
use App\Imports\SiswaImport;
use App\Models\Siswa;
use App\Services\SiswaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiswaController extends Controller
{
    public function index()
    {
        $siswa = new SiswaResource(Siswa::with("kelas")->orderBy("nama_siswa", "asc")->paginate(50));
        return Inertia::render("Siswa", compact("siswa"));
    }
    public function import(SiswaImportRequest $siswaImportRequest, SiswaService $siswaService)
    {
        $siswaImportRequest->validated();
        $siswaService->import($siswaImportRequest->file("file"));
    }
}
