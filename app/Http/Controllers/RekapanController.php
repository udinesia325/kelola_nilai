<?php

namespace App\Http\Controllers;

use App\Contracts\NilaiRepositoryInterface;
use App\Contracts\RekapanRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RekapanController extends Controller
{
    public $rekapanRepository;
    public function __construct(RekapanRepositoryInterface $rekapanRepositoryInterface)
    {
        $this->rekapanRepository = $rekapanRepositoryInterface;
    }
    public function index()
    {
        $data = $this->rekapanRepository->bulanan();

        return Inertia::render("Rekapan/Index", compact("data"));
    }
}
