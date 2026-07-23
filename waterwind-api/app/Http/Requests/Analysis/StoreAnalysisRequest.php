<?php

namespace App\Http\Requests\Analysis;

use App\Http\Requests\BaseFormRequest;

class StoreAnalysisRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'crop_id'    => 'required|integer|exists:crops,id',
            'soil_id'    => 'required|integer|exists:soils,id',
            'surface'    => 'required|numeric|gt:0',
            'humidity'   => 'required|numeric|between:0,100',
            'wind_speed' => 'required|numeric|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'crop_id.required'    => 'Please select a crop.',
            'crop_id.exists'      => 'The selected crop does not exist.',
            'soil_id.required'    => 'Please select a soil type.',
            'soil_id.exists'      => 'The selected soil type does not exist.',
            'surface.required'    => 'The surface area is required.',
            'surface.gt'          => 'The surface area must be greater than 0 m².',
            'humidity.required'   => 'The humidity value is required.',
            'humidity.between'    => 'Humidity must be between 0 and 100 %.',
            'wind_speed.required' => 'The wind speed is required.',
            'wind_speed.min'      => 'Wind speed cannot be negative.',
        ];
    }
}
