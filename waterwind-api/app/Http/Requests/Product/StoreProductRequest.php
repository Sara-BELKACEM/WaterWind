<?php

namespace App\Http\Requests\Product;

use App\Http\Requests\BaseFormRequest;

class StoreProductRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'name'                => 'required|string|max:255',
            'description'         => 'required|string|max:2000',
            'capacity'            => 'required|numeric|gt:0',
            'daily_water_output'  => 'required|numeric|gt:0',
            'recommended_surface' => 'required|numeric|gt:0',
            'image'               => 'required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'                => 'The product name is required.',
            'name.max'                     => 'The product name must not exceed 255 characters.',
            'description.required'         => 'A product description is required.',
            'description.max'              => 'The description must not exceed 2000 characters.',
            'capacity.required'            => 'The capacity is required.',
            'capacity.gt'                  => 'The capacity must be greater than 0.',
            'daily_water_output.required'  => 'The daily water output is required.',
            'daily_water_output.gt'        => 'The daily water output must be greater than 0.',
            'recommended_surface.required' => 'The recommended surface area is required.',
            'recommended_surface.gt'       => 'The recommended surface area must be greater than 0.',
            'image.required'               => 'An image path or filename is required.',
        ];
    }
}
