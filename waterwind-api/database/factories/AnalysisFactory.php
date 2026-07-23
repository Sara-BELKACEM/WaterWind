<?php

namespace Database\Factories;

use App\Models\Crop;
use App\Models\Soil;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AnalysisFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'crop_id' => Crop::factory(),
            'soil_id' => Soil::factory(),
            'surface' => fake()->randomFloat(2, 50, 2000),
            'humidity' => fake()->randomFloat(2, 30, 90),
            'wind_speed' => fake()->randomFloat(2, 0.5, 8.0),
            'score' => fake()->randomFloat(2, 20, 95),
            'status' => fake()->randomElement(['Excellent', 'Very Good', 'Acceptable', 'Poor', 'Not Recommended']),
            'recommendation' => fake()->sentence(15),
            'recommendation_data' => null,
            'recommended_device' => fake()->randomElement(['WaterWind Micro', 'WaterWind Pro']),
            'warnings' => [],
            'suggestions' => [fake()->sentence(8)],
            'recommended_minerals' => ['Nitrogen', 'Potassium'],
            'recommended_daily_water' => fake()->randomFloat(2, 10, 200),
            'recommended_water_type' => 'Fresh Water',
        ];
    }
}
