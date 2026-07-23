<?php

namespace App\Http\Requests\Crop;

use App\Http\Requests\BaseFormRequest;

class SyncCropSoilsRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'soil_ids'   => 'required|array|max:50',
            'soil_ids.*' => 'integer|exists:soils,id',
        ];
    }

    public function messages(): array
    {
        return [
            'soil_ids.required' => 'Please provide a list of soil IDs.',
            'soil_ids.array'    => 'Soil IDs must be provided as a list.',
            'soil_ids.max'      => 'You may not associate more than 50 soils at once.',
            'soil_ids.*.exists' => 'One or more of the selected soils do not exist.',
        ];
    }
}
