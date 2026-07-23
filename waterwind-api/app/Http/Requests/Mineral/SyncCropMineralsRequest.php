<?php

namespace App\Http\Requests\Mineral;

use App\Http\Requests\BaseFormRequest;

class SyncCropMineralsRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'minerals' => 'required|array|max:50',
            'minerals.*.mineral_id' => 'required|integer|exists:minerals,id',
            'minerals.*.priority' => 'required|in:low,medium,high',
            'minerals.*.reason' => 'nullable|string|max:500',
        ];
    }

    public function messages(): array
    {
        return [
            'minerals.required' => 'Please provide a list of minerals.',
            'minerals.array' => 'Minerals must be provided as a list.',
            'minerals.max' => 'You may not associate more than 50 minerals at once.',
            'minerals.*.mineral_id.required' => 'Each mineral entry must include a mineral_id.',
            'minerals.*.mineral_id.exists' => 'One or more of the selected minerals do not exist.',
            'minerals.*.priority.required' => 'Each mineral entry must include a priority.',
            'minerals.*.priority.in' => 'Priority must be low, medium, or high.',
            'minerals.*.reason.max' => 'The reason must not exceed 500 characters.',
        ];
    }
}
