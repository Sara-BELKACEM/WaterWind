<?php

namespace Tests\Feature;

use App\Models\Crop;
use App\Models\Soil;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
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

    public function test_user_can_access_dashboard(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->getJson('/api/dashboard');

        $response->assertOk()
            ->assertJsonStructure([
                'success',
                'data' => [
                    'total_crops',
                    'total_soils',
                    'total_products',
                    'total_minerals',
                    'total_analyses',
                    'total_recommendations',
                    'average_score',
                    'most_recommended_device',
                    'most_recommended_crop',
                    'average_humidity',
                    'average_wind',
                    'today_analyses',
                    'recent_analyses',
                ],
            ]);
    }

    public function test_dashboard_counts_are_accurate(): void
    {
        Crop::factory()->count(5)->create();
        Soil::factory()->count(3)->create();

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->getJson('/api/dashboard');

        $response->assertOk()
            ->assertJsonPath('data.total_crops', 5)
            ->assertJsonPath('data.total_soils', 3);
    }

    public function test_unauthenticated_user_cannot_access_dashboard(): void
    {
        $response = $this->getJson('/api/dashboard');

        $response->assertStatus(401);
    }
}
