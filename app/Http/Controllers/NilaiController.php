<?php

namespace App\Http\Controllers;

use App\Contracts\NilaiServiceInterface;
use App\Http\Requests\CreateNilaiRequest;
use App\Http\Requests\StoreNilaiRequest;
use App\Jobs\StoreNilaiJob;
use App\Models\JenisNilai;
use App\Models\Kelas;
use App\Models\Nilai;
use App\Models\Siswa;
use App\Repositories\NilaiRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NilaiController extends Controller
{
    public $nilaiRepository;
    public function __construct(NilaiRepository $nilaiRepository)
    {
        $this->nilaiRepository = $nilaiRepository;
    }
    public function index()
    {
        return Inertia::render("Nilai/Index",[
            "data" => $this->nilaiRepository->getNilaiByUser()
        ]);
    }
    public function create(CreateNilaiRequest $createNilaiRequest)
    {
        $createNilaiRequest->validated();
        $input = $createNilaiRequest->only(["mapel", "kelas", "jenis"]);
        $data = [
            "siswa" => Siswa::where("kelas_id", $input["kelas"])->get(),
            "mapel" => $input["mapel"],
            "jenis" => JenisNilai::find($input["jenis"]),

        ];
        return Inertia::render("Nilai/Create", compact("data"));
    }
    public function store(StoreNilaiRequest $storeNilaiRequest, NilaiServiceInterface $nilaiServiceInterface)
    {
        $storeNilaiRequest->validated();
        $nilaiServiceInterface->store($storeNilaiRequest->input("data_nilai"));
        return to_route("nilai");
    }
}
