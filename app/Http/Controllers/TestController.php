<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class TestController extends Controller
{
    //
    public function index(Request $request)
    {
        return Inertia::render('Hello');
    }
}
