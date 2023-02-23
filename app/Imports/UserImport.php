<?php

namespace App\Imports;

use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithValidation;

class UserImport implements ToModel, WithHeadingRow
{


    public function model(array $row)
    {
        // dd($row);
        // jika kredensial user sama dengan yang ada di env maka jangan di update
        try {
            if ($row["email"] == config("auth.default_admin.email")) {
                return;
            }
            return User::updateOrCreate(["email" => $row["email"]], [
                'name' => $row["username"],
                'email' => $row["email"],
                'email_verified_at' => now(),
                'password' => Hash::make($row["password"]),
                'remember_token' => Str::random(10),
            ]);
        } catch (\Exception $e) {
            Log::info("Format dokumen import user salah");
        }
    }
    public function headingRow(): int
    {
        return 4;
    }
}
