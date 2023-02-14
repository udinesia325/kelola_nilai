<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelasController extends Controller
{
    public function index()
    {
        $data = [];
        $data["kelas"] = Kelas::all();
        return Inertia::render("Kelas/Index", compact("data"));
    }
    //
    public function getAll()
    {
        return response()->json(Kelas::get());
    }
    public function store(Request $request)
    {
        $request->validate([
            "nama_kelas" => "required|string"
        ]);
        Kelas::create([
            "nama_kelas" => $request->input("nama_kelas")
        ]);
        return to_route("kelas")->with("message", "Berhasil menambahkan kelas baru !");
    }
    public function transferKelas(Request $request)
    {
        $request->validate([
            "kelas_asal" => "required",
            "kelas_tujuan" => "required",
        ]);
        Siswa::where("kelas_id", $request->input("kelas_asal"))
            ->update(["kelas_id" => $request->input("kelas_tujuan")]);
        return to_route("kelas")->with("message", "Berhasil mentransfer semua siswa ke kelas tujuan !");
    }
}
