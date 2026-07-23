<?php

namespace App\Http\Requests\Soil;

use App\Http\Requests\BaseFormRequest;

class StoreSoilRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100',
            'soil_texture' => 'nullable|string|max:100',
            'water_retention' => 'nullable|numeric|between:0,100',
            'drainage' => 'nullable|numeric|between:0,100',
            'organic_matter' => 'nullable|numeric|min:0',
            'fertility' => 'nullable|string|max:50',
            'salinity' => 'nullable|numeric|min:0',
            'ph_min' => 'nullable|numeric|between:0,14',
            'ph_max' => 'nullable|numeric|between:0,14|gte:ph_min',
            'recommended_crops' => 'nullable|string|max:500',
            'description' => 'nullable|string|max:500',
            'notes' => 'nullable|string|max:2000',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The soil name is required.',
            'name.max' => 'The soil name must not exceed 100 characters.',
            'water_retention.between' => 'Water retention must be between 0 and 100%.',
            'drainage.between' => 'Drainage must be between 0 and 100%.',
            'ph_max.gte' => 'The maximum pH must be greater than or equal to the minimum pH.',
            'description.max' => 'The description must not exceed 500 characters.',
        ];
    }
}
