<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

#[OA\Tag(name: 'Products', description: 'Product catalog management')]
class ProductController extends Controller
{
    use ApiResponse;

    #[OA\Get(
        path: '/api/products',
        summary: 'List all products (public). Supports search by name.',
        tags: ['Products'],
        parameters: [
            new OA\Parameter(name: 'page',      in: 'query', schema: new OA\Schema(type: 'integer', default: 1)),
            new OA\Parameter(name: 'page_size', in: 'query', schema: new OA\Schema(type: 'integer', default: 20)),
            new OA\Parameter(name: 'search',    in: 'query', description: 'Filter by product name or description', schema: new OA\Schema(type: 'string')),
        ],
        responses: [new OA\Response(response: 200, description: 'Products retrieved successfully')]
    )]
    public function index(Request $request): JsonResponse
    {
        $pageSize = min((int) $request->query('page_size', 20), 100);

        $query = Product::query();

        if ($search = $request->query('search')) {
            $safe = $this->escapeLike($search);
            $query->where(function ($q) use ($safe) {
                $q->where('name', 'like', "%{$safe}%")
                  ->orWhere('description', 'like', "%{$safe}%");
            });
        }

        $products = $query->latest()->paginate($pageSize);

        return $this->success('Products retrieved successfully.', [
            'current_page' => $products->currentPage(),
            'data'         => ProductResource::collection($products->items()),
            'total'        => $products->total(),
            'per_page'     => $products->perPage(),
            'last_page'    => $products->lastPage(),
        ]);
    }

    #[OA\Post(
        path: '/api/products',
        summary: 'Create a new product (admin)',
        security: [['sanctum' => []]],
        tags: ['Products'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['name', 'description', 'capacity', 'daily_water_output', 'recommended_surface', 'image'],
                properties: [
                    new OA\Property(property: 'name',                type: 'string', example: 'WaterWind Micro'),
                    new OA\Property(property: 'description',         type: 'string'),
                    new OA\Property(property: 'capacity',            type: 'number', example: 200),
                    new OA\Property(property: 'daily_water_output',  type: 'number', example: 50),
                    new OA\Property(property: 'recommended_surface', type: 'number', example: 200),
                    new OA\Property(property: 'image',               type: 'string', example: 'products/waterwind-micro.jpg'),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: 'Product created'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 422, description: 'Validation failed'),
        ]
    )]
    public function store(StoreProductRequest $request): JsonResponse
    {
        $product = Product::create($request->validated());

        return $this->success('Product created successfully.', new ProductResource($product), 201);
    }

    #[OA\Put(
        path: '/api/products/{id}',
        summary: 'Update a product (admin)',
        security: [['sanctum' => []]],
        tags: ['Products'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(response: 200, description: 'Product updated'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'Product not found'),
            new OA\Response(response: 422, description: 'Validation failed'),
        ]
    )]
    public function update(UpdateProductRequest $request, int $id): JsonResponse
    {
        $product = Product::findOrFail($id);
        $product->update($request->validated());

        return $this->success('Product updated successfully.', new ProductResource($product));
    }

    #[OA\Delete(
        path: '/api/products/{id}',
        summary: 'Soft-delete a product (admin)',
        security: [['sanctum' => []]],
        tags: ['Products'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(response: 200, description: 'Product deleted'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'Product not found'),
        ]
    )]
    public function destroy(int $id): JsonResponse
    {
        $product = Product::findOrFail($id);
        $product->delete(); // soft delete — record stays in DB with deleted_at set

        return $this->success('Product deleted successfully.');
    }
}
