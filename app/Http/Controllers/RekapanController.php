<?php

namespace App\Http\Controllers;

use App\Contracts\NilaiRepositoryInterface;
use App\Contracts\RekapanRepositoryInterface;
use App\Http\Requests\ShowRekapanRequest;
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
    public function show(ShowRekapanRequest $showRekapanRequest)
    {
        $showRekapanRequest->validated();
        $data = $this->rekapanRepository->tampilPerbulan($showRekapanRequest->input());
        return Inertia::render("Rekapan/Show", compact("data"));
    }
    public function mingguan()
    {
        return response()->json($this->rekapanRepository->diagramMingguan());
    }
    public function bulanan(Request $request)
    {
        return response()->json($this->rekapanRepository->bulanan());
    }
    public function diagramBulanan(Request $request)
    {
        return $this->rekapanRepository->diagramBulanan($request->query("email"));
    }
}
