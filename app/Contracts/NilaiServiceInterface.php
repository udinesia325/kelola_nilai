<?php

namespace App\Contracts;


interface NilaiServiceInterface
{
    public function store(array $data_nilai): void;
    public function update(array $data_nilai): void;
}
