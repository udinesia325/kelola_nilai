<?php

namespace App\Imports;

use App\Models\Kelas;
use App\Models\Siswa;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class SiswaImport implements ToModel, WithHeadingRow
{
    public function kelasId(string $nama_kelas): int
    {
        $kelasToId = [];
        $kelas = Kelas::all();
        foreach ($kelas as $k) {
            $kelasToId[$k->nama_kelas] = $k->id;
        }
        $value = 0;
        if (array_key_exists($nama_kelas, $kelasToId)) {
            $value = $kelasToId[$nama_kelas];
        }
        return $value;
    }
    public function model(array $row)
    {

        // jika data di dalam rombel tidak ada dalam database dengan nama kelas yang di maksud
        // maka akan mendapatkan kelas yang memiliki id 0
        if ($row["nama"] != null) {
            Siswa::updateOrCreate(
               ["nama_siswa" => $row["nama"]],
               [
                "nama_siswa" => $row["nama"],
                "kelas_id" => $this->kelasId($row["rombel"])
               ]
            );
        }
    }
    public function headingRow(): int
    {
        return 5;
    }
   
}
