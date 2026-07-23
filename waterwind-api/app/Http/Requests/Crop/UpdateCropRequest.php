<?php

namespace App\Http\Requests\Crop;

use App\Http\Requests\BaseFormRequest;

class UpdateCropRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        $cropId = $this->route('id');

        return [
            'name' => "sometimes|string|max:255|unique:crops,name,{$cropId}",
            'scientific_name' => 'sometimes|nullable|string|max:255',
            'category' => 'sometimes|nullable|string|max:100',
            'recommended_ph' => 'sometimes|numeric|between:0,14',
            'recommended_ph_min' => 'sometimes|nullable|numeric|between:0,14',
            'recommended_ph_max' => 'sometimes|nullable|numeric|between:0,14',
            'recommended_water' => 'sometimes|numeric|gt:0',
            'recommended_water_type' => 'sometimes|nullable|string|max:100',
            'irrigation_frequency' => 'sometimes|nullable|string|max:255',
            'water_requirement_liters_per_hectare' => 'sometimes|nullable|numeric|min:0',
            'growth_period_days' => 'sometimes|nullable|integer|min:1',
            'temperature_min' => 'sometimes|nullable|numeric|between:-50,60',
            'temperature_max' => 'sometimes|nullable|numeric|between:-50,60',
            'humidity_min' => 'sometimes|nullable|numeric|between:0,100',
            'humidity_max' => 'sometimes|nullable|numeric|between:0,100',
            'wind_min' => 'sometimes|nullable|numeric|min:0',
            'wind_max' => 'sometimes|nullable|numeric|min:0',
            'recommended_device' => 'sometimes|string|max:255',
            'notes' => 'sometimes|nullable|string|max:2000',
        ];
    }

    public function messages(): array
    {
        return [
            'name.unique' => 'A crop with this name already exists.',
            'name.max' => 'The crop name must not exceed 255 characters.',
            'recommended_ph.between' => 'The recommended pH must be between 0 and 14.',
            'recommended_water.gt' => 'Recommended water must be greater than 0.',
            'recommended_device.required' => 'A recommended device is required.',
        ];
    }
}
