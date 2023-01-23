<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    use HasFactory;
    protected $fillable = ["nama_siswa", "kelas_id"];
    public function Kelas()
    {
        return $this->belongsTo(Kelas::class,"kelas_id");
    }
}
