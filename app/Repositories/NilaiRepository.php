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
            ->groupBy("nilai_id", DB::raw("DAY(nilais.created_at)"))->get(["mapel", "nilais.created_at", "nama_nilai", DB::raw("DAYNAME(nilais.created_at) as hari")]);
        return $data;
    }
}
