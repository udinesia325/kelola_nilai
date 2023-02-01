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
            ->groupBy([DB::raw("MONTH(n.created_at)"),DB::raw("YEAR(n.created_at)"), "k.nama_kelas", "n.mapel"])
            ->orderBy("n.created_at","DESC")
            ->get(["k.nama_kelas", "n.mapel", "n.created_at"]);
    }
}
