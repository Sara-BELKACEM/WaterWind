<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Mineral\StoreMineralRequest;
use App\Http\Requests\Mineral\UpdateMineralRequest;
use App\Http\Resources\MineralResource;
use App\Models\Mineral;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

#[OA\Tag(name: 'Minerals', description: 'Mineral management for crop nutrition')]
class MineralController extends Controller
{
    use ApiResponse;

    #[OA\Get(
        path: '/api/minerals',
        summary: 'List all minerals',
        security: [['sanctum' => []]],
        tags: ['Minerals'],
        parameters: [
            new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', default: 1)),
            new OA\Parameter(name: 'page_size', in: 'query', schema: new OA\Schema(type: 'integer', default: 20)),
            new OA\Parameter(name: 'search', in: 'query', description: 'Filter by name or symbol', schema: new OA\Schema(type: 'string')),
        ],
        responses: [
            new OA\Response(response: 200, description: 'Minerals retrieved successfully'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
        ]
    )]
    public function index(Request $request): JsonResponse
    {
        $pageSize = min((int) $request->query('page_size', 20), 100);

        $query = Mineral::with('crops');

        if ($search = $request->query('search')) {
            $safe = $this->escapeLike($search);
            $query->where(function ($q) use ($safe) {
                $q->where('name', 'like', "%{$safe}%")
                  ->orWhere('symbol', 'like', "%{$safe}%")
                  ->orWhere('description', 'like', "%{$safe}%");
            });
        }

        $minerals = $query->latest()->paginate($pageSize);

        return $this->success('Minerals retrieved successfully.', [
            'current_page' => $minerals->currentPage(),
            'data' => MineralResource::collection($minerals->items()),
            'total' => $minerals->total(),
            'per_page' => $minerals->perPage(),
            'last_page' => $minerals->lastPage(),
        ]);
    }

    #[OA\Get(
        path: '/api/minerals/{id}',
        summary: 'Get a single mineral by ID',
        security: [['sanctum' => []]],
        tags: ['Minerals'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(response: 200, description: 'Mineral retrieved'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'Mineral not found'),
        ]
    )]
    public function show(int $id): JsonResponse
    {
        $mineral = Mineral::with('crops')->findOrFail($id);

        return $this->success('Mineral retrieved successfully.', new MineralResource($mineral));
    }

    #[OA\Post(
        path: '/api/minerals',
        summary: 'Create a new mineral',
        security: [['sanctum' => []]],
        tags: ['Minerals'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['name'],
                properties: [
                    new OA\Property(property: 'name', type: 'string', example: 'Nitrogen'),
                    new OA\Property(property: 'symbol', type: 'string', example: 'N'),
                    new OA\Property(property: 'description', type: 'string'),
                    new OA\Property(property: 'importance', type: 'string'),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: 'Mineral created'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 422, description: 'Validation failed'),
        ]
    )]
    public function store(StoreMineralRequest $request): JsonResponse
    {
        $mineral = Mineral::create($request->validated());

        return $this->success('Mineral created successfully.', new MineralResource($mineral), 201);
    }

    #[OA\Put(
        path: '/api/minerals/{id}',
        summary: 'Update a mineral',
        security: [['sanctum' => []]],
        tags: ['Minerals'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(response: 200, description: 'Mineral updated'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'Mineral not found'),
            new OA\Response(response: 422, description: 'Validation failed'),
        ]
    )]
    public function update(UpdateMineralRequest $request, int $id): JsonResponse
    {
        $mineral = Mineral::findOrFail($id);
        $mineral->update($request->validated());

        return $this->success('Mineral updated successfully.', new MineralResource($mineral));
    }

    #[OA\Delete(
        path: '/api/minerals/{id}',
        summary: 'Delete a mineral',
        security: [['sanctum' => []]],
        tags: ['Minerals'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(response: 200, description: 'Mineral deleted'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'Mineral not found'),
            new OA\Response(response: 409, description: 'Mineral is referenced by crops'),
        ]
    )]
    public function destroy(int $id): JsonResponse
    {
        $mineral = Mineral::findOrFail($id);

        if ($mineral->crops()->exists()) {
            return $this->error(
                'This mineral cannot be deleted because it is associated with crops.',
                null,
                409
            );
        }

        $mineral->delete();

        return $this->success('Mineral deleted successfully.');
    }
}
