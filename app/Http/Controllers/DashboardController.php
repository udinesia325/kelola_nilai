<?php

namespace App\Http\Controllers;

use App\Contracts\RekapanRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public $rekapanRepository;
    public function __construct(RekapanRepositoryInterface $rekapanRepositoryInterface)
    {
        $this->rekapanRepository = $rekapanRepositoryInterface;
    }
    public function __invoke(Request $request)
    {
        if ($request->user()->email == env("DEFAULT_ADMIN_EMAIL")) {
            return Inertia::render("Dashboard/Admin", $this->rekapanRepository->dashboardAdmin());
        }
        return Inertia::render("Dashboard/User");
    }
}
