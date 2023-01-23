<?php

namespace App\Services;

use App\Contracts\UserServiceInterface;
use App\Imports\UserImport;
use Maatwebsite\Excel\Facades\Excel;

class UserService implements UserServiceInterface
{
    public function import($file): void
    {
        Excel::import(new UserImport(),$file);
    }
}
