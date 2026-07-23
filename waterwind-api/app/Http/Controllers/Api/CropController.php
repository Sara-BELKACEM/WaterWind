<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Crop\StoreCropRequest;
use App\Http\Requests\Crop\SyncCropSoilsRequest;
use App\Http\Requests\Crop\UpdateCropRequest;
use App\Http\Requests\Mineral\SyncCropMineralsRequest;
use App\Http\Resources\CropResource;
use App\Http\Resources\SoilResource;
use App\Http\Resources\MineralResource;
use App\Models\Crop;
use App\Traits\ApiResponse;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

#[OA\Tag(name: 'Crops', description: 'Crop management with soil and mineral associations')]
class CropController extends Controller
{
    use ApiResponse;

    #[OA\Get(
        path: '/api/crops',
        summary: 'List all crops with optional search',
        security: [['sanctum' => []]],
        tags: ['Crops'],
        parameters: [
            new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', default: 1)),
            new OA\Parameter(name: 'page_size', in: 'query', schema: new OA\Schema(type: 'integer', default: 20)),
            new OA\Parameter(name: 'search', in: 'query', description: 'Filter by name, category, or device', schema: new OA\Schema(type: 'string')),
        ],
        responses: [
            new OA\Response(response: 200, description: 'Crops retrieved successfully'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
        ]
    )]
    public function index(Request $request): JsonResponse
    {
        $pageSize = min((int) $request->query('page_size', 20), 100);

        $query = Crop::with(['minerals', 'soils']);

        if ($search = $request->query('search')) {
            $safe = $this->escapeLike($search);
            $query->where(function ($q) use ($safe) {
                $q->where('name', 'like', "%{$safe}%")
                  ->orWhere('scientific_name', 'like', "%{$safe}%")
                  ->orWhere('category', 'like', "%{$safe}%")
                  ->orWhere('recommended_device', 'like', "%{$safe}%");
            });
        }

        $crops = $query->latest()->paginate($pageSize);

        return $this->success('Crops retrieved successfully.', [
            'current_page' => $crops->currentPage(),
            'data' => CropResource::collection($crops->items()),
            'total' => $crops->total(),
            'per_page' => $crops->perPage(),
            'last_page' => $crops->lastPage(),
        ]);
    }

    #[OA\Post(
        path: '/api/crops',
        summary: 'Create a new crop',
        security: [['sanctum' => []]],
        tags: ['Crops'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['name', 'recommended_water', 'recommended_ph', 'recommended_device'],
                properties: [
                    new OA\Property(property: 'name', type: 'string', example: 'Tomato'),
                    new OA\Property(property: 'scientific_name', type: 'string', example: 'Solanum lycopersicum'),
                    new OA\Property(property: 'category', type: 'string', example: 'Vegetable'),
                    new OA\Property(property: 'recommended_ph', type: 'number', example: 6.2),
                    new OA\Property(property: 'recommended_ph_min', type: 'number', example: 6.0),
                    new OA\Property(property: 'recommended_ph_max', type: 'number', example: 6.8),
                    new OA\Property(property: 'recommended_water', type: 'number', example: 400),
                    new OA\Property(property: 'recommended_water_type', type: 'string', example: 'Fresh Water'),
                    new OA\Property(property: 'irrigation_frequency', type: 'string', example: 'Daily'),
                    new OA\Property(property: 'water_requirement_liters_per_hectare', type: 'number', example: 40000),
                    new OA\Property(property: 'growth_period_days', type: 'integer', example: 80),
                    new OA\Property(property: 'temperature_min', type: 'number', example: 18),
                    new OA\Property(property: 'temperature_max', type: 'number', example: 29),
                    new OA\Property(property: 'humidity_min', type: 'number', example: 65),
                    new OA\Property(property: 'humidity_max', type: 'number', example: 85),
                    new OA\Property(property: 'wind_min', type: 'number', example: 1),
                    new OA\Property(property: 'wind_max', type: 'number', example: 4),
                    new OA\Property(property: 'recommended_device', type: 'string', example: 'WaterWind Micro'),
                    new OA\Property(property: 'notes', type: 'string'),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: 'Crop created successfully'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 409, description: 'Duplicate crop name'),
            new OA\Response(response: 422, description: 'Validation failed'),
        ]
    )]
    public function store(StoreCropRequest $request): JsonResponse
    {
        try {
            $crop = Crop::create($request->validated());
        } catch (QueryException $e) {
            if ($e->errorInfo[1] === 1062) {
                return $this->error('A crop with this name already exists.', [
                    'name' => ['The crop name has already been taken.'],
                ], 409);
            }
            throw $e;
        }

        $crop->load(['minerals', 'soils']);

        return $this->success('Crop created successfully.', new CropResource($crop), 201);
    }

    #[OA\Put(
        path: '/api/crops/{id}',
        summary: 'Update a crop',
        security: [['sanctum' => []]],
        tags: ['Crops'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(response: 200, description: 'Crop updated successfully'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'Crop not found'),
            new OA\Response(response: 422, description: 'Validation failed'),
        ]
    )]
    public function update(UpdateCropRequest $request, int $id): JsonResponse
    {
        $crop = Crop::findOrFail($id);
        $crop->update($request->validated());
        $crop->load(['minerals', 'soils']);

        return $this->success('Crop updated successfully.', new CropResource($crop));
    }

    #[OA\Delete(
        path: '/api/crops/{id}',
        summary: 'Soft-delete a crop',
        security: [['sanctum' => []]],
        tags: ['Crops'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(response: 200, description: 'Crop deleted successfully'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'Crop not found'),
        ]
    )]
    public function destroy(int $id): JsonResponse
    {
        $crop = Crop::findOrFail($id);
        $crop->delete();

        return $this->success('Crop deleted successfully.');
    }

    #[OA\Post(
        path: '/api/crops/{id}/soils',
        summary: 'Sync compatible soils for a crop',
        security: [['sanctum' => []]],
        tags: ['Crops'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['soil_ids'],
                properties: [
                    new OA\Property(property: 'soil_ids', type: 'array', items: new OA\Items(type: 'integer'), example: [1, 3, 5]),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'Compatible soils updated'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'Crop not found'),
            new OA\Response(response: 422, description: 'Validation failed'),
        ]
    )]
    public function syncSoils(SyncCropSoilsRequest $request, int $id): JsonResponse
    {
        $crop = Crop::findOrFail($id);
        $crop->soils()->sync($request->soil_ids);
        $crop->load('soils');

        return $this->success('Compatible soils updated successfully.', SoilResource::collection($crop->soils));
    }

    #[OA\Post(
        path: '/api/crops/{id}/minerals',
        summary: 'Sync minerals for a crop with priority levels',
        security: [['sanctum' => []]],
        tags: ['Crops'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['minerals'],
                properties: [
                    new OA\Property(
                        property: 'minerals',
                        type: 'array',
                        items: new OA\Items(
                            type: 'object',
                            properties: [
                                new OA\Property(property: 'mineral_id', type: 'integer'),
                                new OA\Property(property: 'priority', type: 'string', enum: ['low', 'medium', 'high']),
                            ]
                        )
                    ),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'Minerals updated'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'Crop not found'),
            new OA\Response(response: 422, description: 'Validation failed'),
        ]
    )]
    public function syncMinerals(SyncCropMineralsRequest $request, int $id): JsonResponse
    {
        $crop = Crop::findOrFail($id);

        $syncData = [];
        foreach ($request->minerals as $mineral) {
            $syncData[$mineral['mineral_id']] = [
                'priority' => $mineral['priority'],
                'reason' => $mineral['reason'] ?? null,
            ];
        }

        $crop->minerals()->sync($syncData);
        $crop->load('minerals');

        return $this->success('Minerals updated successfully.', MineralResource::collection($crop->minerals));
    }
}
