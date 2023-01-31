<?php

namespace App\Repositories;

use App\Contracts\RekapanRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Psy\Command\WhereamiCommand;

class RekapanRepository implements RekapanRepositoryInterface
{
    public function bulanan()
    {
        return DB::table("nilais", "n")
            ->join("siswas as s", "s.id", "=", "n.siswa_id")
            ->join("kelas as k", "k.id", "=", "s.kelas_id")
            ->where("n.user_id", auth()->user()->id)
            ->groupBy(DB::raw("MONTH(n.created_at)"))
            ->groupBy("k.nama_kelas")
            ->get(["k.nama_kelas", "n.mapel", "n.created_at"]);
    }
}
