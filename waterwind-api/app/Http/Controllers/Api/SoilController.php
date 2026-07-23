<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Soil\StoreSoilRequest;
use App\Http\Requests\Soil\UpdateSoilRequest;
use App\Http\Resources\SoilResource;
use App\Models\Soil;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

#[OA\Tag(name: 'Soils', description: 'Soil type management with agricultural properties')]
class SoilController extends Controller
{
    use ApiResponse;

    #[OA\Get(
        path: '/api/soils',
        summary: 'List all soils with optional search',
        security: [['sanctum' => []]],
        tags: ['Soils'],
        parameters: [
            new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', default: 1)),
            new OA\Parameter(name: 'page_size', in: 'query', schema: new OA\Schema(type: 'integer', default: 20)),
            new OA\Parameter(name: 'search', in: 'query', description: 'Filter by name, texture, or fertility', schema: new OA\Schema(type: 'string')),
        ],
        responses: [
            new OA\Response(response: 200, description: 'Soils retrieved successfully'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
        ]
    )]
    public function index(Request $request): JsonResponse
    {
        $pageSize = min((int) $request->query('page_size', 20), 100);

        $query = Soil::with('crops');

        if ($search = $request->query('search')) {
            $safe = $this->escapeLike($search);
            $query->where(function ($q) use ($safe) {
                $q->where('name', 'like', "%{$safe}%")
                  ->orWhere('soil_texture', 'like', "%{$safe}%")
                  ->orWhere('fertility', 'like', "%{$safe}%")
                  ->orWhere('description', 'like', "%{$safe}%");
            });
        }

        $soils = $query->latest()->paginate($pageSize);

        return $this->success('Soils retrieved successfully.', [
            'current_page' => $soils->currentPage(),
            'data' => SoilResource::collection($soils->items()),
            'total' => $soils->total(),
            'per_page' => $soils->perPage(),
            'last_page' => $soils->lastPage(),
        ]);
    }

    #[OA\Post(
        path: '/api/soils',
        summary: 'Create a new soil type',
        security: [['sanctum' => []]],
        tags: ['Soils'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['name'],
                properties: [
                    new OA\Property(property: 'name', type: 'string', example: 'Loamy'),
                    new OA\Property(property: 'soil_texture', type: 'string', example: 'Medium'),
                    new OA\Property(property: 'water_retention', type: 'number', example: 60),
                    new OA\Property(property: 'drainage', type: 'number', example: 60),
                    new OA\Property(property: 'organic_matter', type: 'number', example: 4.0),
                    new OA\Property(property: 'fertility', type: 'string', example: 'High'),
                    new OA\Property(property: 'salinity', type: 'number', example: 3.0),
                    new OA\Property(property: 'ph_min', type: 'number', example: 6.0),
                    new OA\Property(property: 'ph_max', type: 'number', example: 7.0),
                    new OA\Property(property: 'recommended_crops', type: 'string', example: 'Wheat, Corn'),
                    new OA\Property(property: 'description', type: 'string'),
                    new OA\Property(property: 'notes', type: 'string'),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: 'Soil created successfully'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 422, description: 'Validation failed'),
        ]
    )]
    public function store(StoreSoilRequest $request): JsonResponse
    {
        $soil = Soil::create($request->validated());
        $soil->load('crops');

        return $this->success('Soil created successfully.', new SoilResource($soil), 201);
    }

    #[OA\Put(
        path: '/api/soils/{id}',
        summary: 'Update a soil type',
        security: [['sanctum' => []]],
        tags: ['Soils'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(response: 200, description: 'Soil updated successfully'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'Soil not found'),
            new OA\Response(response: 422, description: 'Validation failed'),
        ]
    )]
    public function update(UpdateSoilRequest $request, int $id): JsonResponse
    {
        $soil = Soil::findOrFail($id);
        $soil->update($request->validated());
        $soil->load('crops');

        return $this->success('Soil updated successfully.', new SoilResource($soil));
    }

    #[OA\Delete(
        path: '/api/soils/{id}',
        summary: 'Soft-delete a soil type',
        security: [['sanctum' => []]],
        tags: ['Soils'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(response: 200, description: 'Soil deleted successfully'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'Soil not found'),
            new OA\Response(response: 409, description: 'Soil is referenced and cannot be deleted'),
        ]
    )]
    public function destroy(int $id): JsonResponse
    {
        $soil = Soil::findOrFail($id);

        if ($soil->analyses()->exists() || $soil->crops()->exists()) {
            return $this->error(
                'This soil cannot be deleted because it is referenced by existing analyses or crop associations.',
                null,
                409
            );
        }

        $soil->delete();

        return $this->success('Soil deleted successfully.');
    }
}
