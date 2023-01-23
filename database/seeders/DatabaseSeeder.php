<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Kelas;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        \App\Models\User::create([
            'name' => env('DEFAULT_ADMIN_USERNAME'),
            'email' => env("DEFAULT_ADMIN_EMAIL"),
            'email_verified_at' => now(),
            'password' => Hash::make(env("DEFAULT_ADMIN_PASSWORD")) , // password
            'remember_token' => Str::random(10),
        ]);
        collect([
            "X A RPL",
            "X B RPL",
            "X C RPL",
            "X TB",
            "XI A RPL",
            "XI B RPL",
            "XI C RPL",
            "XI TB",
            "XII A RPL",
            "XII B RPL",
            "XII C RPL",
            "XII TB",
        ])->map(function($data){
            Kelas::create([
                "nama_kelas" => $data
            ]);
        });
        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
