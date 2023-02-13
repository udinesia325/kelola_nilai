<?php

namespace App\Imports;

use App\Models\Kelas;
use App\Models\Siswa;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
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
    /**
     * @param Collection $collection
     */
    // public function collection(Collection $collection)
    // {
    //     if (
    //         $collection[4][0] != "No" &&
    //         $collection[4][0] != "Nama" &&
    //         $collection[4][0] != "Rombel"
    //     ) {
    //         redirect(to_route("siswa"))->with("message", "Format dokumen tidak valid");
    //     }

    //     // buat sebuah key yang berasal dari nama kelas dan id sebagai value nya
    //     // karena siswa hanya butuh id kelas
    //     $kelasToId = [];
    //     $kelas = Kelas::all();
    //     foreach ($kelas as $k) {
    //         $kelasToId[$k->nama_kelas] = $k->id;
    //     }
    //     foreach ($collection as $key => $value) {
    //         // data siswa dimulai dari baris ke 6
    //         // jadi kalau kurang dari 6 skip aja
    //         if ($key < 6) {
    //             continue;
    //         }
    //         Siswa::create([
    //             "nama_siswa" => $value[1], // kolom berisi nama siswa
    //             "kelas_id" => $kelasToId[$value[2]], // ambil nama kelas sebagai id dari kelas karena relasi
    //         ]);
    //     }
    // }
}
