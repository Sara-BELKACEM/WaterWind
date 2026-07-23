<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CropFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->unique()->words(2, true);

        return [
            'name' => ucfirst($name),
            'scientific_name' => fake()->words(2, true),
            'category' => fake()->randomElement(['Vegetable', 'Cereal Grain', 'Fruit Crop', 'Root Vegetable', 'Oilseed Crop', 'Fiber Crop']),
            'recommended_ph' => fake()->randomFloat(2, 5.5, 7.5),
            'recommended_ph_min' => fake()->randomFloat(2, 5.0, 6.5),
            'recommended_ph_max' => fake()->randomFloat(2, 6.5, 8.0),
            'recommended_water' => fake()->randomFloat(2, 200, 1200),
            'recommended_water_type' => 'Fresh Water',
            'irrigation_frequency' => fake()->randomElement(['Daily', 'Weekly', 'Every 2-3 days', 'Every 7-10 days']),
            'water_requirement_liters_per_hectare' => fake()->randomFloat(2, 20000, 120000),
            'growth_period_days' => fake()->numberBetween(60, 180),
            'temperature_min' => fake()->randomFloat(2, 10, 20),
            'temperature_max' => fake()->randomFloat(2, 25, 35),
            'humidity_min' => fake()->randomFloat(2, 35, 60),
            'humidity_max' => fake()->randomFloat(2, 70, 90),
            'wind_min' => fake()->randomFloat(2, 0.5, 2.0),
            'wind_max' => fake()->randomFloat(2, 4.0, 6.0),
            'recommended_device' => fake()->randomElement(['WaterWind Micro', 'WaterWind Pro']),
            'notes' => fake()->sentence(10),
        ];
    }
}
