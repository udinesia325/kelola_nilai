<?php

namespace App\Repositories;

use App\Contracts\RekapanRepositoryInterface;
use App\Models\Kelas;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;


class RekapanRepository implements RekapanRepositoryInterface
{
    public function baseTable()
    {
        return DB::table("nilais", "n")
            ->join("siswas as s", "s.id", "=", "n.siswa_id")
            ->join("kelas as k", "k.id", "=", "s.kelas_id");
    }
    public function bulanan()
    {
        return $this->baseTable()
            ->where("n.user_id", auth()->user()->id)
            ->groupBy([DB::raw("MONTH(n.created_at)"), DB::raw("YEAR(n.created_at)"), "k.nama_kelas", "n.mapel"])
            ->orderBy("n.created_at", "DESC")
            ->get(["k.nama_kelas", "n.mapel", "n.created_at"]);
    }
    public function tampilPerbulan(array $input)
    {
        // dd($input);
        $data = $this->baseTable()
            ->join("jenis_nilais as jn", "jn.id", "=", "n.nilai_id")
            ->where("n.user_id", auth()->user()->id)
            ->where("k.nama_kelas", $input["nama_kelas"])
            ->where("n.mapel", $input["mapel"])
            ->where(DB::raw("DATE_FORMAT(n.created_at, '%Y-%m')"), date("Y-m", strtotime($input["created_at"])))
            ->get(["s.nama_siswa", "n.nilai", "n.mapel", "k.nama_kelas", "jn.nama_nilai", "n.created_at"]);
        return $data;
    }
    public function diagramMingguan(): array
    {
        $data = [];
        $data["mingguan"] = $this->baseTable()
            ->join("jenis_nilais as jn", "jn.id", "=", "n.nilai_id")
            ->groupBy("mapel", "kelas_id", "nilai_id", "user_id", DB::raw("DATE_FORMAT(n.created_at, '%M %Y'), DATE_FORMAT(n.created_at, '%d')"))
            ->orderBy('n.created_at')
            ->whereBetween("n.created_at", [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
            ->get(["jn.nama_nilai", DB::raw("count(distinct(nama_nilai)) as total"), "n.created_at"]);
        $data["tanggal"] = [
            "awal" => Carbon::now()->startOfWeek()->format("Y-m-d"),
            "akhir" => Carbon::now()->endOfWeek()->format("Y-m-d"),
        ];
        return $data;
    }

    public function dashboardAdmin(): array
    {
        $data = [];
        $data["nilai_tersimpan"] = $this->baseTable()
            ->groupBy(["mapel", "k.id", "nilai_id"])
            ->get()->count();
        $data["guru"] = User::all()->count();
        $data["kelas"] = Kelas::all()->count();
        return $data;
    }
    public function diagramBulanan(?string $email = ""): array
    {
        $data = [];
        $data["bulanan"] = $this->baseTable()
            ->join("jenis_nilais as jn", "jn.id", "=", "n.nilai_id")
            ->join("users as u", "u.id", "=", "n.user_id")
            ->groupBy("mapel", "kelas_id", "nilai_id", "user_id", DB::raw("DATE_FORMAT(n.created_at, '%M %Y'), DATE_FORMAT(n.created_at, '%d')"))
            ->orderBy('n.created_at')
            // jika bukan admin maka ambil data berdasarkan user tersebut
            ->when($email != env("DEFAULT_ADMIN_EMAIL"), function ($query, $email) {
                $query->where("email", $email);
            })
            ->whereBetween("n.created_at", [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])
            ->get(["jn.nama_nilai", DB::raw("count(distinct(nama_nilai)) as total"), "n.created_at"]);
        $data["tanggal"] = [
            "awal" => Carbon::now()->startOfMonth()->format("Y-m-d"),
            "akhir" => Carbon::now()->endOfMonth()->format("Y-m-d"),
        ];
        return $data;
    }
}
