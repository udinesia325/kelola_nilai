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
            "kelas_asal" => "required|numeric",
            "kelas_tujuan" => "required|numeric",
        ]);

        // dd($request->input());
        Siswa::where("kelas_id", $request->input("kelas_asal"))
            ->update(["kelas_id" => $request->input("kelas_tujuan")]);
        return to_route("kelas")->with("message", "Berhasil mentransfer semua siswa ke kelas tujuan !");
    }
    public function kosongkan(Request $request)
    {
        $request->validate([
            "kelas_id" => "required|numeric"
        ]);
        Siswa::where("kelas_id", $request->input("kelas_id"))->delete();
        return to_route("kelas")->with("message", "Kelas berhasil di kosongkan !");
    }
    public function update(Request $request)
    {
        $id = $request->input("id");
        $nama_kelas = $request->input("nama_kelas");
        Kelas::where("id", $id)->update(["nama_kelas" => $nama_kelas]);
        return to_route("kelas")->with("message", "Nama kelas berhasil di perbarui !");
    }
}
