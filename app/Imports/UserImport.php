<?php

namespace App\Imports;

use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class UserImport implements ToCollection
{

    /**
     * @param Collection $collection
     */
    public function collection(Collection $collection)
    {
        // pastikan format dokumen telah selesai
        if (
            $collection[3][0] != "Username" &&
            $collection[3][0] != "Email" &&
            $collection[3][0] != "Status" &&
            $collection[3][0] != "Password"
        ) {
            return redirect(to_route('users'))->with("message", "Format dokumen tidak valid");
        }
        $index = 0;
        foreach ($collection as $key => $value) {
            if ($key < 4) {
                continue;
            }
            // dd($value);
            User::create([
                'name' => $value[0],
                'email' => $value[1],
                'email_verified_at' => now(),
                'password' => Hash::make($value[3]),
                'remember_token' => Str::random(10),
            ]);
        }
    }
}
