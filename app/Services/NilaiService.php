<?php

namespace App\Services;

use App\Contracts\NilaiServiceInterface;
use App\Http\Requests\StoreNilaiRequest;
use App\Jobs\StoreNilaiJob;
use App\Models\Nilai;

class NilaiService implements NilaiServiceInterface
{
    public function store(array $data_nilai): void
    {
        foreach ($data_nilai as $nilai) {
            Nilai::create([
                "nilai" => $nilai["nilai"],
                "mapel" => $nilai["mapel"],
                "siswa_id" => $nilai["siswa_id"],
                "nilai_id" => $nilai["nilai_id"],
                "user_id" => $nilai["user_id"],
            ]);
        }
    }
}
