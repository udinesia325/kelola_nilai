<?php

namespace App\Http\Controllers\Auth;

use App\Contracts\ImportUserInterface;
use App\Contracts\UserServiceInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserImportRequest;
use App\Models\User;
use App\Services\ImportUserService;
// use App\Services\ImportUserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public $importUserService;
    public function __construct()
    {
        // $this->importUserService = new ImportUserService();
    }
    public function index(Request $request)
    {
        $users = User::whereNotNull('email_verified_at')->get();
        return Inertia::render("Users", compact('users'));
    }
    public function import(UserImportRequest $request, UserServiceInterface $userServiceInterface)
    {
        $request->validated();
        $userServiceInterface->import($request->file("file"));
        return to_route("users")->with("message", "User Berhasil Ditambahkan !");
    }
}
