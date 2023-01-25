<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNilaiRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "data_nilai"=>"required|array",
            "data_nilai.*.mapel"=>"required", 
            "data_nilai.*.nilai"=>"required|numeric", 
            "data_nilai.*.user_id"=>"required|numeric", 
            "data_nilai.*.nilai_id"=>"required|numeric", 
        ];
    }
}
