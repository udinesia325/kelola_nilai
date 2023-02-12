<?php

namespace App\Http\Controllers;

use App\Models\JenisNilai;
use Illuminate\Http\Request;

class JenisNilaiController extends Controller
{
    //

    public function show()
    {
        return response()->json(JenisNilai::all());
    }
}
