<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Analysis\StoreAnalysisRequest;
use App\Http\Resources\AnalysisResource;
use App\Models\Analysis;
use App\Models\Crop;
use App\Models\Soil;
use App\Services\RecommendationService;
use App\Traits\ApiResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\StreamedResponse;
use Illuminate\Support\Facades\DB;
use OpenApi\Attributes as OA;

#[OA\Tag(name: 'Analysis', description: 'Smart water analysis generation, recommendation, and history')]
class AnalysisController extends Controller
{
    use ApiResponse, AuthorizesRequests;

    public function __construct(private RecommendationService $recommendationService)
    {
    }

    private function baseQuery(Request $request)
    {
        $query = Analysis::with(['crop.minerals', 'soil'])->latest();

        if ($search = $request->query('search')) {
            $safe = $this->escapeLike($search);
            $query->where(function ($q) use ($safe) {
                $q->whereHas('crop', fn ($c) => $c->where('name', 'like', "%{$safe}%"))
                  ->orWhereHas('soil', fn ($s) => $s->where('name', 'like', "%{$safe}%"));
            });
        }

        if ($cropId = $request->query('crop_id')) {
            $query->where('crop_id', $cropId);
        }

        if ($soilId = $request->query('soil_id')) {
            $query->where('soil_id', $soilId);
        }

        if ($deviceId = $request->query('device')) {
            $query->where('recommended_device', 'like', "%{$deviceId}%");
        }

        if ($minScore = $request->query('min_score')) {
            $query->where('score', '>=', $minScore);
        }

        if ($maxScore = $request->query('max_score')) {
            $query->where('score', '<=', $maxScore);
        }

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        if ($minHumidity = $request->query('min_humidity')) {
            $query->where('humidity', '>=', $minHumidity);
        }

        if ($maxHumidity = $request->query('max_humidity')) {
            $query->where('humidity', '<=', $maxHumidity);
        }

        if ($minWind = $request->query('min_wind')) {
            $query->where('wind_speed', '>=', $minWind);
        }

        if ($maxWind = $request->query('max_wind')) {
            $query->where('wind_speed', '<=', $maxWind);
        }

        if ($dateFrom = $request->query('date_from')) {
            $query->whereDate('created_at', '>=', $dateFrom);
        }

        if ($dateTo = $request->query('date_to')) {
            $query->whereDate('created_at', '<=', $dateTo);
        }

        return $query;
    }

    #[OA\Get(
        path: '/api/analysis',
        summary: 'List analyses with advanced filtering',
        security: [['sanctum' => []]],
        tags: ['Analysis'],
        parameters: [
            new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', default: 1)),
            new OA\Parameter(name: 'page_size', in: 'query', schema: new OA\Schema(type: 'integer', default: 20)),
            new OA\Parameter(name: 'search', in: 'query', description: 'Filter by crop or soil name', schema: new OA\Schema(type: 'string')),
            new OA\Parameter(name: 'crop_id', in: 'query', description: 'Filter by crop ID', schema: new OA\Schema(type: 'integer')),
            new OA\Parameter(name: 'soil_id', in: 'query', description: 'Filter by soil ID', schema: new OA\Schema(type: 'integer')),
            new OA\Parameter(name: 'device', in: 'query', description: 'Filter by recommended device', schema: new OA\Schema(type: 'string')),
            new OA\Parameter(name: 'min_score', in: 'query', description: 'Minimum score', schema: new OA\Schema(type: 'number')),
            new OA\Parameter(name: 'max_score', in: 'query', description: 'Maximum score', schema: new OA\Schema(type: 'number')),
            new OA\Parameter(name: 'status', in: 'query', description: 'Filter by status', schema: new OA\Schema(type: 'string', enum: ['Excellent', 'Very Good', 'Acceptable', 'Poor', 'Not Recommended'])),
            new OA\Parameter(name: 'min_humidity', in: 'query', schema: new OA\Schema(type: 'number')),
            new OA\Parameter(name: 'max_humidity', in: 'query', schema: new OA\Schema(type: 'number')),
            new OA\Parameter(name: 'min_wind', in: 'query', schema: new OA\Schema(type: 'number')),
            new OA\Parameter(name: 'max_wind', in: 'query', schema: new OA\Schema(type: 'number')),
            new OA\Parameter(name: 'date_from', in: 'query', description: 'Start date (Y-m-d)', schema: new OA\Schema(type: 'string', format: 'date')),
            new OA\Parameter(name: 'date_to', in: 'query', description: 'End date (Y-m-d)', schema: new OA\Schema(type: 'string', format: 'date')),
        ],
        responses: [
            new OA\Response(response: 200, description: 'Analyses retrieved successfully'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
        ]
    )]
    public function index(Request $request): JsonResponse
    {
        $pageSize = min((int) $request->query('page_size', 20), 100);
        $analyses = $this->baseQuery($request)->paginate($pageSize);

        return $this->success('Analyses retrieved successfully.', [
            'current_page' => $analyses->currentPage(),
            'data' => AnalysisResource::collection($analyses->items()),
            'total' => $analyses->total(),
            'per_page' => $analyses->perPage(),
            'last_page' => $analyses->lastPage(),
        ]);
    }

    #[OA\Post(
        path: '/api/analysis',
        summary: 'Run a smart water analysis with scoring recommendation',
        security: [['sanctum' => []]],
        tags: ['Analysis'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['crop_id', 'soil_id', 'surface', 'humidity', 'wind_speed'],
                properties: [
                    new OA\Property(property: 'crop_id', type: 'integer', example: 1),
                    new OA\Property(property: 'soil_id', type: 'integer', example: 2),
                    new OA\Property(property: 'surface', type: 'number', example: 500, description: 'Surface area in m² (must be > 0)'),
                    new OA\Property(property: 'humidity', type: 'number', example: 70, description: 'Humidity percentage (0–100)'),
                    new OA\Property(property: 'wind_speed', type: 'number', example: 4, description: 'Wind speed in m/s (>= 0)'),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: 'Analysis created with smart recommendation'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 422, description: 'Validation failed'),
        ]
    )]
    public function store(StoreAnalysisRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $analysis = DB::transaction(function () use ($validated) {
            $crop = Crop::with('soils')->with('minerals')->findOrFail($validated['crop_id']);
            $soil = Soil::findOrFail($validated['soil_id']);

            $report = $this->recommendationService->generate(
                $crop,
                $soil,
                (float) $validated['surface'],
                (float) $validated['humidity'],
                (float) $validated['wind_speed']
            );

            return Analysis::create([
                'user_id' => auth()->id(),
                'crop_id' => $crop->id,
                'soil_id' => $soil->id,
                'surface' => $validated['surface'],
                'humidity' => $validated['humidity'],
                'wind_speed' => $validated['wind_speed'],
                'score' => $report['waterwind_score'],
                'status' => $report['status'],
                'recommendation' => $report['recommendation'],
                'recommendation_data' => $report,
                'recommended_device' => $report['device']['recommended'],
                'warnings' => $report['warnings'],
                'suggestions' => $report['suggestions'],
                'recommended_minerals' => collect($report['minerals'])->pluck('name')->toArray(),
                'recommended_daily_water' => $report['water']['estimated_daily_need_liters'],
                'recommended_water_type' => $report['water']['water_quality'],
            ]);
        });

        $analysis->load(['crop.minerals', 'soil']);

        return $this->success('Analysis created successfully.', new AnalysisResource($analysis), 201);
    }

    #[OA\Get(
        path: '/api/analysis/{id}',
        summary: 'Get a single analysis by ID with full nested data',
        security: [['sanctum' => []]],
        tags: ['Analysis'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(response: 200, description: 'Analysis retrieved'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'Analysis not found'),
        ]
    )]
    public function show(int $id): JsonResponse
    {
        $analysis = Analysis::with(['crop.minerals', 'soil'])->find($id);

        abort_if(!$analysis, 404, 'Analysis not found.');

        abort_if(
            $analysis->user_id !== auth()->id(),
            403,
            'You do not have permission to view this analysis.'
        );

        return $this->success('Analysis retrieved successfully.', new AnalysisResource($analysis));
    }

    #[OA\Delete(
        path: '/api/analysis/{id}',
        summary: 'Delete an analysis',
        security: [['sanctum' => []]],
        tags: ['Analysis'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(response: 200, description: 'Analysis deleted'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'Analysis not found'),
        ]
    )]
    public function destroy(int $id): JsonResponse
    {
        $analysis = Analysis::find($id);

        abort_if(!$analysis, 404, 'Analysis not found.');

        abort_if(
            $analysis->user_id !== auth()->id(),
            403,
            'You do not have permission to delete this analysis.'
        );

        $analysis->delete();

        return $this->success('Analysis deleted successfully.');
    }

    #[OA\Get(
        path: '/api/analysis/export',
        summary: 'Export analysis history as CSV, PDF, or Excel',
        security: [['sanctum' => []]],
        tags: ['Analysis'],
        parameters: [
            new OA\Parameter(name: 'format', in: 'query', description: 'Export format: csv, pdf, excel', schema: new OA\Schema(type: 'string', enum: ['csv', 'pdf', 'excel'], default: 'csv')),
            new OA\Parameter(name: 'search', in: 'query', schema: new OA\Schema(type: 'string')),
        ],
        responses: [
            new OA\Response(response: 200, description: 'Export file download'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
        ]
    )]
    public function export(Request $request)
    {
        $format = $request->query('format', 'csv');
        $analyses = $this->baseQuery($request)->get();

        return match ($format) {
            'pdf' => $this->exportPdf($analyses),
            'excel' => $this->exportExcel($analyses),
            default => $this->exportCsv($analyses),
        };
    }

    private function exportCsv($analyses)
    {
        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="analyses_' . now()->format('Y-m-d_His') . '.csv"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $callback = function () use ($analyses) {
            $handle = fopen('php://output', 'w');
            fprintf($handle, chr(0xEF) . chr(0xBB) . chr(0xBF));

            fputcsv($handle, [
                'ID', 'Date', 'Crop', 'Soil', 'Surface (m²)', 'Humidity (%)',
                'Wind Speed (m/s)', 'Score', 'Status', 'Recommended Device',
                'Daily Water (L)', 'Water Type', 'Minerals', 'Warnings', 'Suggestions',
            ]);

            foreach ($analyses as $a) {
                fputcsv($handle, [
                    $a->id,
                    $a->created_at->format('Y-m-d H:i:s'),
                    $a->crop?->name ?? 'N/A',
                    $a->soil?->name ?? 'N/A',
                    $a->surface,
                    $a->humidity,
                    $a->wind_speed,
                    $a->score ?? 'N/A',
                    $a->status ?? 'N/A',
                    $a->recommended_device,
                    $a->recommended_daily_water ?? 'N/A',
                    $a->recommended_water_type ?? 'N/A',
                    implode('; ', $a->recommended_minerals ?? []),
                    implode('; ', $a->warnings ?? []),
                    implode('; ', $a->suggestions ?? []),
                ]);
            }

            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }

    private function exportPdf($analyses): Response
    {
        $html = $this->buildExportHtml($analyses, 'PDF Export');

        return response($html, 200, [
            'Content-Type' => 'text/html; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="analyses_' . now()->format('Y-m-d_His') . '.html"',
        ]);
    }

    private function exportExcel($analyses)
    {
        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="analyses_' . now()->format('Y-m-d_His') . '.csv"',
            'Pragma' => 'no-cache',
        ];

        $callback = function () use ($analyses) {
            $handle = fopen('php://output', 'w');
            fprintf($handle, chr(0xEF) . chr(0xBB) . chr(0xBF));

            fputcsv($handle, [
                'ID', 'Date', 'Crop', 'Soil', 'Surface', 'Humidity',
                'Wind', 'Score', 'Status', 'Device', 'Daily Water',
                'Water Type', 'Minerals', 'Warnings', 'Suggestions',
            ]);

            foreach ($analyses as $a) {
                fputcsv($handle, [
                    $a->id,
                    $a->created_at->format('Y-m-d H:i:s'),
                    $a->crop?->name ?? 'N/A',
                    $a->soil?->name ?? 'N/A',
                    $a->surface,
                    $a->humidity,
                    $a->wind_speed,
                    $a->score ?? 'N/A',
                    $a->status ?? 'N/A',
                    $a->recommended_device,
                    $a->recommended_daily_water ?? 'N/A',
                    $a->recommended_water_type ?? 'N/A',
                    implode('; ', $a->recommended_minerals ?? []),
                    implode('; ', $a->warnings ?? []),
                    implode('; ', $a->suggestions ?? []),
                ]);
            }

            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }

    private function buildExportHtml($analyses, string $title): string
    {
        $rows = '';
        foreach ($analyses as $a) {
            $cropName = e($a->crop?->name ?? 'N/A');
            $soilName = e($a->soil?->name ?? 'N/A');
            $device = e($a->recommended_device ?? 'N/A');
            $status = e($a->status ?? 'N/A');

            $rows .= "<tr>"
                . "<td>" . e($a->id) . "</td>"
                . "<td>" . e($a->created_at->format('Y-m-d H:i')) . "</td>"
                . "<td>{$cropName}</td>"
                . "<td>{$soilName}</td>"
                . "<td>" . e($a->surface) . "</td>"
                . "<td>" . e($a->humidity) . "</td>"
                . "<td>" . e($a->wind_speed) . "</td>"
                . "<td>" . e($a->score ?? 'N/A') . "</td>"
                . "<td>{$status}</td>"
                . "<td>{$device}</td>"
                . "</tr>";
        }

        return "<html><head><title>" . e($title) . "</title></head><body>"
            . "<h1>WaterWind Analysis Export</h1>"
            . "<table border='1' cellpadding='5'><thead><tr>"
            . "<th>ID</th><th>Date</th><th>Crop</th><th>Soil</th>"
            . "<th>Surface</th><th>Humidity</th><th>Wind</th>"
            . "<th>Score</th><th>Status</th><th>Device</th>"
            . "</tr></thead><tbody>{$rows}</tbody></table>"
            . "</body></html>";
    }
}
