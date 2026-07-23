<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StatisticsTest extends TestCase
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

    public function test_user_can_access_statistics(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->getJson('/api/statistics');

        $response->assertOk()
            ->assertJsonStructure([
                'success',
                'data' => [
                    'total_analyses',
                    'total_crops',
                    'total_soils',
                    'total_products',
                    'total_minerals',
                ],
            ]);
    }

    public function test_user_can_access_crop_statistics(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->getJson('/api/statistics/crops');

        $response->assertOk()
            ->assertJsonStructure([
                'success',
                'data' => ['crops', 'total_crops'],
            ]);
    }

    public function test_user_can_access_soil_statistics(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->getJson('/api/statistics/soils');

        $response->assertOk()
            ->assertJsonStructure([
                'success',
                'data' => ['soils', 'total_soils'],
            ]);
    }

    public function test_user_can_access_mineral_statistics(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->getJson('/api/statistics/minerals');

        $response->assertOk()
            ->assertJsonStructure([
                'success',
                'data' => ['minerals', 'total_minerals'],
            ]);
    }

    public function test_user_can_access_device_statistics(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->getJson('/api/statistics/devices');

        $response->assertOk()
            ->assertJsonStructure([
                'success',
                'data' => ['device_usage', 'product_stats'],
            ]);
    }

    public function test_user_can_access_monthly_statistics(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->getJson('/api/statistics/monthly');

        $response->assertOk()
            ->assertJsonStructure([
                'success',
                'data' => ['monthly_data'],
            ]);
    }

    public function test_user_can_access_dashboard_statistics(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->getJson('/api/statistics/dashboard');

        $response->assertOk()
            ->assertJsonStructure([
                'success',
                'data' => [
                    'total_analyses',
                    'total_crops',
                    'total_soils',
                    'average_score',
                    'status_distribution',
                ],
            ]);
    }

    public function test_unauthenticated_user_cannot_access_statistics(): void
    {
        $response = $this->getJson('/api/statistics');

        $response->assertStatus(401);
    }
}
