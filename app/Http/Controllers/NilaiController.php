<?php

namespace App\Http\Controllers;

use App\Contracts\NilaiRepositoryInterface;
use App\Contracts\NilaiServiceInterface;
use App\Http\Requests\CreateNilaiRequest;
use App\Http\Requests\ShowNilaiRequest;
use App\Http\Requests\StoreNilaiRequest;
use App\Http\Requests\UpdateNilaiRequest;
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
        return Inertia::render("Nilai/Index", [
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
        return $nilaiServiceInterface->store($storeNilaiRequest->input("data_nilai"));
    }
    public function show(ShowNilaiRequest $showNilaiRequest)
    {
        $showNilaiRequest->validated();
        $data["data"] = $this->nilaiRepository->showSavedNilai($showNilaiRequest->input());
        if (count($data["data"]) == 0) {
            return to_route("nilai");
        }
        return Inertia::render("Nilai/Show", $data);
    }
    public function edit(ShowNilaiRequest $showNilaiRequest)
    {
        $showNilaiRequest->validated();
        return Inertia::render("Nilai/Edit", [
            "siswa" => $this->nilaiRepository->showSavedNilai($showNilaiRequest->input())
        ]);
    }
    public function update(UpdateNilaiRequest $updateNilaiRequest, NilaiServiceInterface $nilaiServiceInterface)
    {
        $updateNilaiRequest->validated();
        $nilaiServiceInterface->update($updateNilaiRequest->input("data_nilai"));
        return redirect($updateNilaiRequest->input("back_url"))->with("message", "Nilai Berhasil di perbarui !");
    }
    public function delete(Request $request)
    {
        $this->nilaiRepository->delete($request->input());
        return to_route("nilai")->with("message", "Nilai berhasil di hapus");
    }
}
