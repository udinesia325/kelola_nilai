<?php

namespace App\Services;

use App\Contracts\SiswaServiceInterface;
use App\Imports\SiswaImport;
use Maatwebsite\Excel\Facades\Excel;

class SiswaService implements SiswaServiceInterface
{
    public function import($file): void
    {
        Excel::import(new SiswaImport(), $file);
    }
}
