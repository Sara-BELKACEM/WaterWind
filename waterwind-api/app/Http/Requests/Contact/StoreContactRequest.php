<?php

namespace App\Http\Requests\Contact;

use App\Http\Requests\BaseFormRequest;

class StoreContactRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'         => 'required|string|max:255',
            'email'        => 'required|email',
            'subject'      => 'required|string|max:255',
            'message'      => 'required|string|max:2000',
            'service_type' => 'required|in:purchase,leasing,maintenance,general',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'         => 'Your name is required.',
            'name.max'              => 'Your name must not exceed 255 characters.',
            'email.required'        => 'An email address is required.',
            'email.email'           => 'Please provide a valid email address.',
            'subject.required'      => 'A subject is required.',
            'subject.max'           => 'The subject must not exceed 255 characters.',
            'message.required'      => 'A message is required.',
            'message.max'           => 'The message must not exceed 2000 characters.',
            'service_type.required' => 'Please select a service type.',
            'service_type.in'       => 'Service type must be one of: purchase, leasing, maintenance, general.',
        ];
    }
}
