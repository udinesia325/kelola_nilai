<?php

namespace App\Contracts;

interface RekapanRepositoryInterface
{
    //tampilkan semua data bulanan yang tersedia
    public function bulanan();
    // tampilkan hanya dalam bulan tersebut
    public function tampilPerbulan(array $input);
}
