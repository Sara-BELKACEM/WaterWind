<?php

namespace Tests\Feature;

use App\Models\Crop;
use App\Models\Soil;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AnalysisTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private string $token;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->token = $this->user->createToken('auth_token')->plainTextToken;
    }

    public function test_user_can_create_analysis(): void
    {
        $crop = Crop::factory()->create();
        $soil = Soil::factory()->create();

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/analysis', [
                'crop_id' => $crop->id,
                'soil_id' => $soil->id,
                'surface' => 500,
                'humidity' => 70,
                'wind_speed' => 4,
            ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'id',
                    'waterwind_score',
                    'status',
                    'recommendation',
                    'water' => ['estimated_daily_need_liters', 'water_quality'],
                    'device' => ['recommended', 'reason', 'daily_output'],
                    'minerals',
                    'atmospheric' => ['humidity', 'wind'],
                    'warnings',
                    'suggestions',
                ],
            ]);

        $this->assertDatabaseHas('analyses', [
            'crop_id' => $crop->id,
            'soil_id' => $soil->id,
        ]);
    }

    public function test_user_can_list_analyses(): void
    {
        $crop = Crop::factory()->create();
        $soil = Soil::factory()->create();

        $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/analysis', [
                'crop_id' => $crop->id,
                'soil_id' => $soil->id,
                'surface' => 500,
                'humidity' => 70,
                'wind_speed' => 4,
            ]);

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->getJson('/api/analysis');

        $response->assertOk()
            ->assertJsonStructure([
                'success',
                'data' => ['current_page', 'data', 'total'],
            ]);
    }

    public function test_user_can_show_analysis(): void
    {
        $crop = Crop::factory()->create();
        $soil = Soil::factory()->create();

        $createResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/analysis', [
                'crop_id' => $crop->id,
                'soil_id' => $soil->id,
                'surface' => 500,
                'humidity' => 70,
                'wind_speed' => 4,
            ]);

        $analysisId = $createResponse->json('data.id');

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->getJson("/api/analysis/{$analysisId}");

        $response->assertOk()
            ->assertJsonStructure([
                'success',
                'data' => ['id', 'waterwind_score', 'status'],
            ]);
    }

    public function test_user_cannot_show_other_users_analysis(): void
    {
        $crop = Crop::factory()->create();
        $soil = Soil::factory()->create();

        $createResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/analysis', [
                'crop_id' => $crop->id,
                'soil_id' => $soil->id,
                'surface' => 500,
                'humidity' => 70,
                'wind_speed' => 4,
            ]);

        $analysisId = $createResponse->json('data.id');

        $otherUser = User::factory()->create();

        \Laravel\Sanctum\Sanctum::actingAs($otherUser);

        $response = $this->getJson("/api/analysis/{$analysisId}");

        $response->assertStatus(403);
    }

    public function test_user_can_delete_analysis(): void
    {
        $crop = Crop::factory()->create();
        $soil = Soil::factory()->create();

        $createResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/analysis', [
                'crop_id' => $crop->id,
                'soil_id' => $soil->id,
                'surface' => 500,
                'humidity' => 70,
                'wind_speed' => 4,
            ]);

        $analysisId = $createResponse->json('data.id');

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->deleteJson("/api/analysis/{$analysisId}");

        $response->assertOk();
        $this->assertDatabaseMissing('analyses', ['id' => $analysisId]);
    }

    public function test_analysis_validation_rejects_invalid_humidity(): void
    {
        $crop = Crop::factory()->create();
        $soil = Soil::factory()->create();

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/analysis', [
                'crop_id' => $crop->id,
                'soil_id' => $soil->id,
                'surface' => 500,
                'humidity' => 150,
                'wind_speed' => 4,
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['humidity']);
    }

    public function test_analysis_validation_rejects_negative_wind(): void
    {
        $crop = Crop::factory()->create();
        $soil = Soil::factory()->create();

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/analysis', [
                'crop_id' => $crop->id,
                'soil_id' => $soil->id,
                'surface' => 500,
                'humidity' => 70,
                'wind_speed' => -5,
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['wind_speed']);
    }

    public function test_analysis_validation_rejects_zero_surface(): void
    {
        $crop = Crop::factory()->create();
        $soil = Soil::factory()->create();

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/analysis', [
                'crop_id' => $crop->id,
                'soil_id' => $soil->id,
                'surface' => 0,
                'humidity' => 70,
                'wind_speed' => 4,
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['surface']);
    }

    public function test_user_can_filter_analyses(): void
    {
        $crop = Crop::factory()->create(['name' => 'Tomato']);
        $soil = Soil::factory()->create();

        $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/analysis', [
                'crop_id' => $crop->id,
                'soil_id' => $soil->id,
                'surface' => 500,
                'humidity' => 70,
                'wind_speed' => 4,
            ]);

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->getJson('/api/analysis?search=Tomato');

        $response->assertOk();
    }

    public function test_user_can_export_analyses_csv(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->getJson('/api/analysis/export?format=csv');

        $response->assertOk()
            ->assertHeader('Content-Type', 'text/csv; charset=UTF-8');
    }
}
