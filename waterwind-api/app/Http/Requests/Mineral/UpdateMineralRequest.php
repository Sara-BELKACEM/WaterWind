<?php

namespace App\Http\Requests\Mineral;

use App\Http\Requests\BaseFormRequest;

class UpdateMineralRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        $mineralId = $this->route('id');

        return [
            'name' => "sometimes|string|max:100|unique:minerals,name,{$mineralId}",
            'symbol' => 'sometimes|nullable|string|max:10',
            'description' => 'sometimes|nullable|string|max:500',
            'importance' => 'sometimes|nullable|string|max:500',
        ];
    }

    public function messages(): array
    {
        return [
            'name.unique' => 'A mineral with this name already exists.',
            'name.max' => 'The mineral name must not exceed 100 characters.',
        ];
    }
}
