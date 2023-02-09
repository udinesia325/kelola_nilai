<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use Illuminate\Http\Request;

class KelasController extends Controller
{
    //
    public function getAll()
    {
        return response()->json(Kelas::get());
    }
}
