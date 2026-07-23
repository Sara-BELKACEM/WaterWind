<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SoilFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->randomElement([
                'Sandy', 'Clay', 'Loamy', 'Silty', 'Peaty', 'Chalky',
                'Saline', 'Sandy Loam', 'Clay Loam', 'Silty Clay',
                'Rocky', 'Volcanic', 'Alluvial', 'Laterite',
            ]),
            'soil_texture' => fake()->randomElement(['Coarse', 'Fine', 'Medium', 'Fibrous']),
            'water_retention' => fake()->randomFloat(2, 10, 90),
            'drainage' => fake()->randomFloat(2, 10, 95),
            'organic_matter' => fake()->randomFloat(2, 1, 25),
            'fertility' => fake()->randomElement(['Low', 'Medium', 'High', 'Very High']),
            'salinity' => fake()->randomFloat(2, 1, 15),
            'ph_min' => fake()->randomFloat(2, 4.0, 6.5),
            'ph_max' => fake()->randomFloat(2, 6.5, 8.5),
            'recommended_crops' => fake()->words(3, true),
            'description' => fake()->sentence(15),
            'notes' => fake()->sentence(10),
        ];
    }
}
