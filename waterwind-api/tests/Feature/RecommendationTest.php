<?php

namespace Tests\Feature;

use App\Models\Crop;
use App\Models\Mineral;
use App\Models\Soil;
use App\Models\User;
use App\Services\RecommendationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RecommendationTest extends TestCase
{
    use RefreshDatabase;

    private RecommendationService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new RecommendationService();
    }

    public function test_recommendation_score_ranges(): void
    {
        $crop = Crop::factory()->create([
            'humidity_min' => 60,
            'humidity_max' => 85,
            'wind_min' => 1,
            'wind_max' => 5,
            'recommended_ph_min' => 6.0,
            'recommended_ph_max' => 6.8,
        ]);
        $soil = Soil::factory()->create([
            'ph_min' => 5.5,
            'ph_max' => 7.0,
        ]);
        $crop->soils()->attach($soil->id);

        $mineral = Mineral::factory()->create();
        $crop->minerals()->attach($mineral->id, ['priority' => 'high']);

        $result = $this->service->generate($crop, $soil, 500, 70, 3.5);

        $this->assertGreaterThanOrEqual(0, $result['waterwind_score']);
        $this->assertLessThanOrEqual(100, $result['waterwind_score']);
        $this->assertArrayHasKey('status', $result);
        $this->assertArrayHasKey('warnings', $result);
        $this->assertArrayHasKey('suggestions', $result);
    }

    public function test_compatible_soil_gives_higher_score(): void
    {
        $crop = Crop::factory()->create([
            'humidity_min' => 60,
            'humidity_max' => 85,
            'wind_min' => 1,
            'wind_max' => 5,
            'recommended_ph_min' => 6.0,
            'recommended_ph_max' => 6.8,
        ]);
        $compatibleSoil = Soil::factory()->create([
            'ph_min' => 5.5,
            'ph_max' => 7.0,
        ]);
        $incompatibleSoil = Soil::factory()->create([
            'ph_min' => 3.0,
            'ph_max' => 4.0,
        ]);
        $crop->soils()->attach($compatibleSoil->id);

        $compatibleResult = $this->service->generate($crop, $compatibleSoil, 500, 70, 3.5);
        $incompatibleResult = $this->service->generate($crop, $incompatibleSoil, 500, 70, 3.5);

        $this->assertGreaterThan($incompatibleResult['waterwind_score'], $compatibleResult['waterwind_score']);
    }

    public function test_incompatible_soil_generates_warning(): void
    {
        $crop = Crop::factory()->create([
            'humidity_min' => 60,
            'humidity_max' => 85,
            'wind_min' => 1,
            'wind_max' => 5,
            'recommended_ph_min' => 8.0,
            'recommended_ph_max' => 9.0,
        ]);
        $soil = Soil::factory()->create([
            'ph_min' => 5.5,
            'ph_max' => 6.5,
        ]);

        $result = $this->service->generate($crop, $soil, 500, 70, 3.5);

        $this->assertEquals('Incompatible', $result['soil']['compatibility']);
        $this->assertNotEmpty($result['warnings']);
    }

    public function test_recommendation_includes_required_fields(): void
    {
        $crop = Crop::factory()->create([
            'humidity_min' => 60,
            'humidity_max' => 85,
            'wind_min' => 1,
            'wind_max' => 5,
        ]);
        $soil = Soil::factory()->create([
            'ph_min' => 5.5,
            'ph_max' => 7.0,
        ]);
        $crop->soils()->attach($soil->id);

        $result = $this->service->generate($crop, $soil, 500, 70, 3.5);

        $this->assertArrayHasKey('crop', $result);
        $this->assertArrayHasKey('soil', $result);
        $this->assertArrayHasKey('water', $result);
        $this->assertArrayHasKey('minerals', $result);
        $this->assertArrayHasKey('atmospheric', $result);
        $this->assertArrayHasKey('device', $result);
        $this->assertArrayHasKey('waterwind_score', $result);
        $this->assertArrayHasKey('status', $result);
        $this->assertArrayHasKey('recommendation', $result);
        $this->assertArrayHasKey('warnings', $result);
        $this->assertArrayHasKey('suggestions', $result);

        $this->assertArrayHasKey('recommended', $result['device']);
        $this->assertArrayHasKey('reason', $result['device']);
        $this->assertArrayHasKey('daily_output', $result['device']);
        $this->assertArrayHasKey('estimated_daily_need_liters', $result['water']);
        $this->assertArrayHasKey('water_quality', $result['water']);
        $this->assertArrayHasKey('compatibility', $result['soil']);
    }
}
