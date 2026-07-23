<?php

namespace App\Http\Requests\Product;

use App\Http\Requests\BaseFormRequest;

class UpdateProductRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'name'                => 'sometimes|string|max:255',
            'description'         => 'sometimes|string|max:2000',
            'capacity'            => 'sometimes|numeric|gt:0',
            'daily_water_output'  => 'sometimes|numeric|gt:0',
            'recommended_surface' => 'sometimes|numeric|gt:0',
            'image'               => 'sometimes|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'name.max'                => 'The product name must not exceed 255 characters.',
            'description.max'         => 'The description must not exceed 2000 characters.',
            'capacity.gt'             => 'The capacity must be greater than 0.',
            'daily_water_output.gt'   => 'The daily water output must be greater than 0.',
            'recommended_surface.gt'  => 'The recommended surface area must be greater than 0.',
        ];
    }
}
