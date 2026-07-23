<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Analysis;
use App\Models\Crop;
use App\Models\Mineral;
use App\Models\Product;
use App\Models\Soil;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use OpenApi\Attributes as OA;

#[OA\Tag(name: 'Statistics', description: 'Comprehensive usage statistics and analytics')]
class StatisticsController extends Controller
{
    use ApiResponse;

    #[OA\Get(
        path: '/api/statistics',
        summary: 'Get overall statistics',
        security: [['sanctum' => []]],
        tags: ['Statistics'],
        responses: [
            new OA\Response(response: 200, description: 'Statistics retrieved'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
        ]
    )]
    public function index(): JsonResponse
    {
        return $this->success('Statistics retrieved successfully.', $this->getDashboardStats());
    }

    #[OA\Get(
        path: '/api/statistics/crops',
        summary: 'Get crop usage statistics',
        security: [['sanctum' => []]],
        tags: ['Statistics'],
        responses: [
            new OA\Response(response: 200, description: 'Crop statistics retrieved'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
        ]
    )]
    public function crops(): JsonResponse
    {
        $crops = DB::table('analyses')
            ->join('crops', 'analyses.crop_id', '=', 'crops.id')
            ->select('crops.name', DB::raw('COUNT(*) as total_analyses'), DB::raw('AVG(analyses.score) as avg_score'))
            ->groupBy('analyses.crop_id', 'crops.name')
            ->orderByDesc('total_analyses')
            ->get();

        return $this->success('Crop statistics retrieved.', [
            'crops' => $crops,
            'total_crops' => Crop::count(),
        ]);
    }

    #[OA\Get(
        path: '/api/statistics/soils',
        summary: 'Get soil usage statistics',
        security: [['sanctum' => []]],
        tags: ['Statistics'],
        responses: [
            new OA\Response(response: 200, description: 'Soil statistics retrieved'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
        ]
    )]
    public function soils(): JsonResponse
    {
        $soils = DB::table('analyses')
            ->join('soils', 'analyses.soil_id', '=', 'soils.id')
            ->select('soils.name', DB::raw('COUNT(*) as total_analyses'), DB::raw('AVG(analyses.score) as avg_score'))
            ->groupBy('analyses.soil_id', 'soils.name')
            ->orderByDesc('total_analyses')
            ->get();

        return $this->success('Soil statistics retrieved.', [
            'soils' => $soils,
            'total_soils' => Soil::count(),
        ]);
    }

    #[OA\Get(
        path: '/api/statistics/minerals',
        summary: 'Get mineral usage statistics',
        security: [['sanctum' => []]],
        tags: ['Statistics'],
        responses: [
            new OA\Response(response: 200, description: 'Mineral statistics retrieved'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
        ]
    )]
    public function minerals(): JsonResponse
    {
        $minerals = DB::table('crop_mineral')
            ->join('minerals', 'crop_mineral.mineral_id', '=', 'minerals.id')
            ->select('minerals.name', 'minerals.symbol', DB::raw('COUNT(*) as total_crops'), DB::raw('SUM(CASE WHEN priority = "high" THEN 1 ELSE 0 END) as high_priority_count'))
            ->groupBy('minerals.id', 'minerals.name', 'minerals.symbol')
            ->orderByDesc('total_crops')
            ->get();

        return $this->success('Mineral statistics retrieved.', [
            'minerals' => $minerals,
            'total_minerals' => Mineral::count(),
        ]);
    }

    #[OA\Get(
        path: '/api/statistics/devices',
        summary: 'Get device usage statistics',
        security: [['sanctum' => []]],
        tags: ['Statistics'],
        responses: [
            new OA\Response(response: 200, description: 'Device statistics retrieved'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
        ]
    )]
    public function devices(): JsonResponse
    {
        $devices = DB::table('analyses')
            ->select('recommended_device', DB::raw('COUNT(*) as total'), DB::raw('AVG(score) as avg_score'))
            ->groupBy('recommended_device')
            ->orderByDesc('total')
            ->get();

        $productStats = Product::all()->map(function ($product) {
            $analysisCount = Analysis::where('recommended_device', $product->name)->count();
            return [
                'name' => $product->name,
                'total_analyses' => $analysisCount,
                'capacity' => $product->capacity,
                'daily_water_output' => $product->daily_water_output,
            ];
        });

        return $this->success('Device statistics retrieved.', [
            'device_usage' => $devices,
            'product_stats' => $productStats,
        ]);
    }

    #[OA\Get(
        path: '/api/statistics/monthly',
        summary: 'Get monthly analysis statistics',
        security: [['sanctum' => []]],
        tags: ['Statistics'],
        responses: [
            new OA\Response(response: 200, description: 'Monthly statistics retrieved'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
        ]
    )]
    public function monthly(): JsonResponse
    {
        $driver = DB::getDriverName();

        $yearExpr = $driver === 'sqlite'
            ? DB::raw("strftime('%Y', created_at)")
            : DB::raw("DATE_FORMAT(created_at, '%Y')");

        $monthExpr = $driver === 'sqlite'
            ? DB::raw("strftime('%m', created_at)")
            : DB::raw("DATE_FORMAT(created_at, '%m')");

        $monthly = DB::table('analyses')
            ->select(
                $yearExpr->getValue(DB::getQueryGrammar()) . ' as year',
                $monthExpr->getValue(DB::getQueryGrammar()) . ' as month',
                DB::raw('COUNT(*) as total_analyses'),
                DB::raw('AVG(score) as avg_score'),
                DB::raw("SUM(CASE WHEN status = 'Excellent' THEN 1 ELSE 0 END) as excellent_count"),
                DB::raw("SUM(CASE WHEN status = 'Very Good' THEN 1 ELSE 0 END) as very_good_count"),
                DB::raw("SUM(CASE WHEN status = 'Acceptable' THEN 1 ELSE 0 END) as acceptable_count"),
                DB::raw("SUM(CASE WHEN status = 'Poor' THEN 1 ELSE 0 END) as poor_count"),
                DB::raw("SUM(CASE WHEN status = 'Not Recommended' THEN 1 ELSE 0 END) as not_recommended_count"),
            )
            ->groupBy($yearExpr->getValue(DB::getQueryGrammar()), $monthExpr->getValue(DB::getQueryGrammar()))
            ->orderByDesc('year')
            ->orderByDesc('month')
            ->get();

        return $this->success('Monthly statistics retrieved.', [
            'monthly_data' => $monthly,
        ]);
    }

    #[OA\Get(
        path: '/api/statistics/dashboard',
        summary: 'Get dashboard-ready statistics',
        security: [['sanctum' => []]],
        tags: ['Statistics'],
        responses: [
            new OA\Response(response: 200, description: 'Dashboard statistics retrieved'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
        ]
    )]
    public function dashboard(): JsonResponse
    {
        return $this->success('Dashboard statistics retrieved.', $this->getDashboardStats());
    }

    private function getDashboardStats(): array
    {
        $totalAnalyses = Analysis::count();
        $mostUsedCropRow = DB::table('analyses')
            ->join('crops', 'analyses.crop_id', '=', 'crops.id')
            ->select('crops.name', DB::raw('COUNT(*) as total'))
            ->groupBy('analyses.crop_id', 'crops.name')
            ->orderByDesc('total')
            ->first();

        $mostUsedSoilRow = DB::table('analyses')
            ->join('soils', 'analyses.soil_id', '=', 'soils.id')
            ->select('soils.name', DB::raw('COUNT(*) as total'))
            ->groupBy('analyses.soil_id', 'soils.name')
            ->orderByDesc('total')
            ->first();

        $mostRecommendedDeviceRow = DB::table('analyses')
            ->select('recommended_device', DB::raw('COUNT(*) as total'))
            ->groupBy('recommended_device')
            ->orderByDesc('total')
            ->first();

        $avgScore = Analysis::whereNotNull('score')->avg('score');

        $statusDistribution = DB::table('analyses')
            ->select('status', DB::raw('COUNT(*) as total'))
            ->groupBy('status')
            ->get()
            ->toArray();

        return [
            'total_analyses' => $totalAnalyses,
            'total_crops' => Crop::count(),
            'total_soils' => Soil::count(),
            'total_products' => Product::count(),
            'total_minerals' => Mineral::count(),
            'most_used_crop' => $mostUsedCropRow?->name,
            'most_used_soil' => $mostUsedSoilRow?->name,
            'most_recommended_device' => $mostRecommendedDeviceRow?->recommended_device,
            'average_score' => $avgScore ? round($avgScore, 2) : null,
            'status_distribution' => $statusDistribution,
        ];
    }
}
