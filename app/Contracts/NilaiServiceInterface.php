<?php

namespace App\Contracts;


interface NilaiServiceInterface
{
    public function store(array $data_nilai);
    public function update(array $data_nilai): void;
}
