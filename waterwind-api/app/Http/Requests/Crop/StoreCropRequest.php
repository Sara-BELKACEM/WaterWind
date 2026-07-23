<?php

namespace App\Http\Requests\Crop;

use App\Http\Requests\BaseFormRequest;

class StoreCropRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:crops,name',
            'scientific_name' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:100',
            'recommended_ph' => 'required|numeric|between:0,14',
            'recommended_ph_min' => 'nullable|numeric|between:0,14',
            'recommended_ph_max' => 'nullable|numeric|between:0,14|gte:recommended_ph_min',
            'recommended_water' => 'required|numeric|gt:0',
            'recommended_water_type' => 'nullable|string|max:100',
            'irrigation_frequency' => 'nullable|string|max:255',
            'water_requirement_liters_per_hectare' => 'nullable|numeric|min:0',
            'growth_period_days' => 'nullable|integer|min:1',
            'temperature_min' => 'nullable|numeric|between:-50,60',
            'temperature_max' => 'nullable|numeric|between:-50,60|gte:temperature_min',
            'humidity_min' => 'nullable|numeric|between:0,100',
            'humidity_max' => 'nullable|numeric|between:0,100|gte:humidity_min',
            'wind_min' => 'nullable|numeric|min:0',
            'wind_max' => 'nullable|numeric|min:0|gte:wind_min',
            'recommended_device' => 'required|string|max:255',
            'notes' => 'nullable|string|max:2000',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The crop name is required.',
            'name.unique' => 'A crop with this name already exists.',
            'name.max' => 'The crop name must not exceed 255 characters.',
            'recommended_ph.required' => 'The recommended pH is required.',
            'recommended_ph.between' => 'The recommended pH must be between 0 and 14.',
            'recommended_ph_max.gte' => 'The maximum pH must be greater than or equal to the minimum pH.',
            'recommended_water.required' => 'The recommended water value is required.',
            'recommended_water.gt' => 'Recommended water must be greater than 0.',
            'temperature_max.gte' => 'The maximum temperature must be greater than or equal to the minimum temperature.',
            'humidity_max.gte' => 'The maximum humidity must be greater than or equal to the minimum humidity.',
            'wind_max.gte' => 'The maximum wind speed must be greater than or equal to the minimum wind speed.',
            'recommended_device.required' => 'A recommended device is required.',
            'growth_period_days.min' => 'Growth period must be at least 1 day.',
        ];
    }
}
