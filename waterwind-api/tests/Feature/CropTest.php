<?php

namespace Tests\Feature;

use App\Models\Crop;
use App\Models\Mineral;
use App\Models\Soil;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CropTest extends TestCase
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

    public function test_user_can_list_crops(): void
    {
        Crop::factory()->count(3)->create();

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->getJson('/api/crops');

        $response->assertOk()
            ->assertJsonStructure([
                'success',
                'data' => ['current_page', 'data', 'total', 'per_page', 'last_page'],
            ]);
    }

    public function test_user_can_create_crop(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/crops', [
                'name' => 'Tomato',
                'scientific_name' => 'Solanum lycopersicum',
                'category' => 'Vegetable',
                'recommended_ph' => 6.2,
                'recommended_ph_min' => 6.0,
                'recommended_ph_max' => 6.8,
                'recommended_water' => 400,
                'recommended_water_type' => 'Fresh Water',
                'irrigation_frequency' => 'Daily',
                'water_requirement_liters_per_hectare' => 40000,
                'growth_period_days' => 80,
                'temperature_min' => 18,
                'temperature_max' => 29,
                'humidity_min' => 65,
                'humidity_max' => 85,
                'wind_min' => 1.0,
                'wind_max' => 4.0,
                'recommended_device' => 'WaterWind Micro',
                'notes' => 'Test crop notes',
            ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => ['id', 'name', 'scientific_name', 'category'],
            ]);

        $this->assertDatabaseHas('crops', ['name' => 'Tomato']);
    }

    public function test_user_can_update_crop(): void
    {
        $crop = Crop::factory()->create();

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->putJson("/api/crops/{$crop->id}", [
                'name' => 'Updated Tomato',
                'recommended_water' => 500,
            ]);

        $response->assertOk()
            ->assertJsonStructure([
                'success',
                'data' => ['id', 'name'],
            ]);
    }

    public function test_user_can_delete_crop(): void
    {
        $crop = Crop::factory()->create();

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->deleteJson("/api/crops/{$crop->id}");

        $response->assertOk();
        $this->assertSoftDeleted('crops', ['id' => $crop->id]);
    }

    public function test_crop_validation_rejects_invalid_ph(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/crops', [
                'name' => 'Bad Crop',
                'recommended_ph' => 15,
                'recommended_water' => 400,
                'recommended_device' => 'WaterWind Micro',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['recommended_ph']);
    }

    public function test_crop_validation_rejects_duplicate_name(): void
    {
        Crop::factory()->create(['name' => 'Tomato']);

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/crops', [
                'name' => 'Tomato',
                'recommended_ph' => 6.2,
                'recommended_water' => 400,
                'recommended_device' => 'WaterWind Micro',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    }

    public function test_crop_validation_rejects_negative_water(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/crops', [
                'name' => 'Negative Water',
                'recommended_ph' => 6.2,
                'recommended_water' => -100,
                'recommended_device' => 'WaterWind Micro',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['recommended_water']);
    }

    public function test_user_can_sync_soils(): void
    {
        $crop = Crop::factory()->create();
        $soils = Soil::factory()->count(3)->create();

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson("/api/crops/{$crop->id}/soils", [
                'soil_ids' => $soils->pluck('id')->toArray(),
            ]);

        $response->assertOk();
        $this->assertDatabaseHas('crop_soil', [
            'crop_id' => $crop->id,
            'soil_id' => $soils->first()->id,
        ]);
    }

    public function test_user_can_sync_minerals(): void
    {
        $crop = Crop::factory()->create();
        $minerals = Mineral::factory()->count(3)->create();

        $mineralData = $minerals->map(fn ($m) => [
            'mineral_id' => $m->id,
            'priority' => 'high',
        ])->toArray();

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson("/api/crops/{$crop->id}/minerals", [
                'minerals' => $mineralData,
            ]);

        $response->assertOk();
        $this->assertDatabaseHas('crop_mineral', [
            'crop_id' => $crop->id,
            'mineral_id' => $minerals->first()->id,
            'priority' => 'high',
        ]);
    }
}
