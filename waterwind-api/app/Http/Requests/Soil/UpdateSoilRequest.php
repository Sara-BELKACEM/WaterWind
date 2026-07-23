<?php

namespace App\Http\Requests\Soil;

use App\Http\Requests\BaseFormRequest;

class UpdateSoilRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'name' => 'sometimes|required|string|max:100',
            'soil_texture' => 'sometimes|nullable|string|max:100',
            'water_retention' => 'sometimes|nullable|numeric|between:0,100',
            'drainage' => 'sometimes|nullable|numeric|between:0,100',
            'organic_matter' => 'sometimes|nullable|numeric|min:0',
            'fertility' => 'sometimes|nullable|string|max:50',
            'salinity' => 'sometimes|nullable|numeric|min:0',
            'ph_min' => 'sometimes|nullable|numeric|between:0,14',
            'ph_max' => 'sometimes|nullable|numeric|between:0,14',
            'recommended_crops' => 'sometimes|nullable|string|max:500',
            'description' => 'sometimes|nullable|string|max:500',
            'notes' => 'sometimes|nullable|string|max:2000',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The soil name is required.',
            'name.max' => 'The soil name must not exceed 100 characters.',
            'water_retention.between' => 'Water retention must be between 0 and 100%.',
            'drainage.between' => 'Drainage must be between 0 and 100%.',
            'description.max' => 'The description must not exceed 500 characters.',
        ];
    }
}
