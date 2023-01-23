<?php

namespace App\Imports;

use App\Models\Kelas;
use App\Models\Siswa;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class SiswaImport implements ToCollection
{
    /**
     * @param Collection $collection
     */
    public function collection(Collection $collection)
    {
        if (
            $collection[4][0] != "No" &&
            $collection[4][0] != "Nama" &&
            $collection[4][0] != "Rombel"
        ) {
            return redirect(to_route("siswa"))->with("message", "Format dokumen tidak valid");
        }

        // buat sebuah key yang berasal dari nama kelas dan id sebagai value nya
        // karena siswa hanya butuh id kelas
        $kelasToId = [];
        $kelas = Kelas::all();
        foreach ($kelas as $k) {
            $kelasToId[$k->nama_kelas] = $k->id;
        }
        foreach ($collection as $key => $value) {
            // data siswa dimulai dari baris ke 6
            // jadi kalau kurang dari 6 skip aja
            if ($key < 6) {
                continue;
            }
            Siswa::create([
                "nama_siswa" => $value[1],// kolom berisi nama siswa
                "kelas_id" => $kelasToId[$value[2]], // ambil nama kelas sebagai id dari kelas karena relasi
            ]);
        }
    }
}
