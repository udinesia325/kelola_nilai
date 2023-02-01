<?php

namespace App\Contracts;

interface NilaiRepositoryInterface
{
    public function getNilaiByUser(): array;
    public function delete(array $input): void;
    public function cekDuplikatDalamSehari(array $data_nilai): bool;
}
