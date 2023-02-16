<?php

namespace App\Http\Controllers;

use App\Http\Requests\SiswaImportRequest;
use App\Http\Requests\SiswaStoreRequest;
use App\Http\Resources\SiswaResource;
use App\Imports\SiswaImport;
use App\Models\Siswa;
use App\Services\SiswaService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiswaController extends Controller
{
    public function index(Request $request)
    {
        $kelas_id = $request->input("kelas_id");
        $siswa = new SiswaResource(Siswa::with("kelas")->when($kelas_id,function(Builder $query,$kelas_id){
            $query->where('kelas_id',$kelas_id);
        })->orderBy("nama_siswa", "asc")->paginate(50));
        return Inertia::render("Siswa", compact("siswa"));
    }
    public function import(SiswaImportRequest $siswaImportRequest, SiswaService $siswaService)
    {
        $siswaImportRequest->validated();
        $siswaService->import($siswaImportRequest->file("file"));
        return to_route("siswa")->with("message", "Siswa Berhasil Ditambahkan !");
    }
    public function store(SiswaStoreRequest $siswaStoreRequest)
    {
        $input = $siswaStoreRequest->input();
        Siswa::create([
            "nama_siswa" => $input["nama_siswa"],
            "kelas_id" => $input["kelas_id"],
        ]);
        return to_route("siswa")->with("message","Berhasil menambahkan siswa baru !");
    }
}
