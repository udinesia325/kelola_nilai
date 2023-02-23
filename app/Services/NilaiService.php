<?php

namespace App\Services;

use App\Contracts\NilaiRepositoryInterface;
use App\Contracts\NilaiServiceInterface;
use App\Models\Nilai;

class NilaiService implements NilaiServiceInterface
{
    public $nilaiRepository;
    public function __construct(NilaiRepositoryInterface $nilaiRepositoryInterface)
    {
        $this->nilaiRepository = $nilaiRepositoryInterface;
    }
    public function store(array $data_nilai)
    {

        // pastikan untuk mapel dan kelas yang sama tidak bentrok dalam satu hari
        // karena untuk tiap jenis nilai dengan mapel dan kelas yang sama
        // hanya ada boleh ada 1 dalam sehari
        if ($this->nilaiRepository->cekDuplikatDalamSehari($data_nilai) == true) {
            // berarti sudah ada nilai yang sama dalam sehari terakhir
            return to_route("nilai")->with("message", "Nilai Sudah ada coba buat kriteria penilaian yang lain");
        }

        // masukkan ke database
        foreach ($data_nilai as $nilai) {
            Nilai::create([
                "nilai" => $nilai["nilai"],
                "mapel" => $nilai["mapel"],
                "siswa_id" => $nilai["siswa_id"],
                "nilai_id" => $nilai["nilai_id"],
                "user_id" => $nilai["user_id"],
            ]);
        }
        return to_route("nilai")->with("message", "Nilai baru ditambahkan !");
    }
    public function update(array $data_nilai): void
    {
        $ids = collect($data_nilai)->map(fn ($data) => $data["siswa_id"]);
        foreach ($data_nilai as $data) {
            Nilai::where("id", $data["id"])->update(["nilai" => $data["nilai"]]);
        }
    }
}
