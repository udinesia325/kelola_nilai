<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShowNilaiRequest extends FormRequest
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
            "mapel" => "required|string",
            "created_at" => "required|date",
            "user_id" => "required|numeric",
            "kelas" => "required|numeric",
            "jenis" => "required|numeric"
        ];
    }
}
