<?php

namespace App\Http\Requests\Mineral;

use App\Http\Requests\BaseFormRequest;

class StoreMineralRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100|unique:minerals,name',
            'symbol' => 'nullable|string|max:10',
            'description' => 'nullable|string|max:500',
            'importance' => 'nullable|string|max:500',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The mineral name is required.',
            'name.unique' => 'A mineral with this name already exists.',
            'name.max' => 'The mineral name must not exceed 100 characters.',
        ];
    }
}
