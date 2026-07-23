<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnalysisResource;
use App\Models\Analysis;
use App\Models\Crop;
use App\Models\Mineral;
use App\Models\Product;
use App\Models\Soil;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use OpenApi\Attributes as OA;

#[OA\Tag(name: 'Dashboard', description: 'Admin dashboard with comprehensive summary')]
class DashboardController extends Controller
{
    use ApiResponse;

    #[OA\Get(
        path: '/api/dashboard',
        summary: 'Get comprehensive dashboard summary',
        security: [['sanctum' => []]],
        tags: ['Dashboard'],
        responses: [
            new OA\Response(response: 200, description: 'Dashboard data retrieved'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
        ]
    )]
    public function index(): JsonResponse
    {
        $latestAnalysis = Analysis::with(['crop', 'soil'])->latest()->first();

        $totalRecommendations = Analysis::count();

        $averageScore = Analysis::whereNotNull('score')->avg('score');

        $mostRecommendedDevice = DB::table('analyses')
            ->select('recommended_device', DB::raw('COUNT(*) as total'))
            ->groupBy('recommended_device')
            ->orderByDesc('total')
            ->first();

        $mostRecommendedCrop = DB::table('analyses')
            ->join('crops', 'analyses.crop_id', '=', 'crops.id')
            ->select('crops.name', DB::raw('COUNT(*) as total'))
            ->groupBy('analyses.crop_id', 'crops.name')
            ->orderByDesc('total')
            ->first();

        $averageHumidity = Analysis::avg('humidity');
        $averageWind = Analysis::avg('wind_speed');

        $todayStart = now()->startOfDay();
        $todayAnalyses = Analysis::where('created_at', '>=', $todayStart)->count();

        $recentAnalyses = Analysis::with(['crop', 'soil'])
            ->latest()
            ->limit(5)
            ->get();

        return $this->success('Dashboard data retrieved successfully.', [
            'total_crops' => Crop::count(),
            'total_soils' => Soil::count(),
            'total_products' => Product::count(),
            'total_minerals' => Mineral::count(),
            'total_analyses' => Analysis::count(),
            'total_recommendations' => $totalRecommendations,
            'average_score' => $averageScore ? round($averageScore, 2) : null,
            'most_recommended_device' => $mostRecommendedDevice?->recommended_device,
            'most_recommended_crop' => $mostRecommendedCrop?->name,
            'average_humidity' => $averageHumidity ? round($averageHumidity, 2) : null,
            'average_wind' => $averageWind ? round($averageWind, 2) : null,
            'today_analyses' => $todayAnalyses,
            'recent_analyses' => AnalysisResource::collection($recentAnalyses),
            'latest_analysis' => $latestAnalysis ? new AnalysisResource($latestAnalysis) : null,
        ]);
    }
}
