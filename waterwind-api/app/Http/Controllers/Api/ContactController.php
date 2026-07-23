<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contact\StoreContactRequest;
use App\Http\Resources\ContactMessageResource;
use App\Models\ContactMessage;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use OpenApi\Attributes as OA;

#[OA\Tag(name: 'Contact', description: 'Visitor contact submissions')]
class ContactController extends Controller
{
    use ApiResponse;

    #[OA\Post(
        path: '/api/contact',
        summary: 'Submit a contact message (public)',
        tags: ['Contact'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['name', 'email', 'subject', 'message', 'service_type'],
                properties: [
                    new OA\Property(property: 'name', type: 'string', example: 'John Doe'),
                    new OA\Property(property: 'email', type: 'string', format: 'email', example: 'john@example.com'),
                    new OA\Property(property: 'subject', type: 'string', example: 'Product inquiry'),
                    new OA\Property(property: 'message', type: 'string', example: 'I would like more information.'),
                    new OA\Property(
                        property: 'service_type',
                        type: 'string',
                        enum: ['purchase', 'leasing', 'maintenance', 'general'],
                        example: 'general'
                    ),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: 'Message sent successfully'),
            new OA\Response(response: 422, description: 'Validation failed'),
        ]
    )]
    public function store(StoreContactRequest $request): JsonResponse
    {
        $message = ContactMessage::create($request->validated());

        return $this->success('Message sent successfully.', new ContactMessageResource($message), 201);
    }
}
