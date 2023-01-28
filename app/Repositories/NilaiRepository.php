<?php

namespace App\Repositories;

use App\Contracts\NilaiRepositoryInterface;
use App\Models\JenisNilai;
use App\Models\Kelas;
use App\Models\Nilai;
use Illuminate\Support\Facades\DB;

class NilaiRepository implements NilaiRepositoryInterface
{
    public function getNilaiByUser(): array
    {
        $data = [
            "kelas" => Kelas::all(),
            "jenis" => JenisNilai::all(),
        ];
        $data["nilai"] = DB::table("nilais", "nilais")
            ->where("user_id", auth()->user()->id)
            ->join("jenis_nilais as jn", "jn.id", "=", "nilais.nilai_id")
            ->join("siswas", "siswas.id", "=", "nilais.siswa_id")
            ->join("kelas", "kelas.id", "=", "siswas.kelas_id")
            ->groupBy(["kelas.id", "nilais.mapel"])->get([
                "mapel",
                "kelas.id as kelas",
                "jn.id as jenis",
                "kelas.nama_kelas",
                "nilais.created_at",
                "nama_nilai",
                DB::raw("DAYNAME(nilais.created_at) as hari")
            ]);
        return $data;
    }
    public function showSavedNilai(array $input)
    {
        return DB::table("nilais", "n")
            ->join("jenis_nilais as jn", "jn.id", "=", "n.nilai_id")
            ->join("siswas", "siswas.id", "=", "n.siswa_id")
            ->join("kelas", "kelas.id", "=", "siswas.kelas_id")
            ->where("user_id", auth()->user()->id) //berdasarkan yang sedang login
            ->where("mapel", $input["mapel"]) // dan mapel dari inputan useForm
            ->where("kelas.id", $input["kelas"]) // beserta kelasnya juga
            ->where("jn.id", $input["jenis"]) //sertakan relasi jenis nilai 
            ->where(DB::raw("DAY(n.created_at)"), date("d", strtotime($input["created_at"]))) // ambil yang dalam satu hari itu
            ->get(["n.*", "siswas.nama_siswa as nama_siswa", "kelas.nama_kelas as kelas", "jn.nama_nilai as jenis"]);
    }
}
