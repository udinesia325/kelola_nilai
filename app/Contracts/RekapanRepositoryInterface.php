<?php

namespace App\Contracts;


interface RekapanRepositoryInterface
{
    //tampilkan semua data bulanan yang tersedia
    public function bulanan();
    // tampilkan hanya dalam bulan tersebut
    public function tampilPerbulan(array $input);
    // untuk data di halaman admin
    public function diagramMingguan(): array;
    //  untuk data yang ada di halaman admin
    public function dashboardAdmin(): array;
    // untuk mengambil diagram bulanan admin | user
    public function diagramBulanan(?string $email) : array;
}
