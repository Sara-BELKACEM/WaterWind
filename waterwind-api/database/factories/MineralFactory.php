<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MineralFactory extends Factory
{
    public function definition(): array
    {
        $elements = [
            ['name' => 'Nitrogen', 'symbol' => 'N'],
            ['name' => 'Phosphorus', 'symbol' => 'P'],
            ['name' => 'Potassium', 'symbol' => 'K'],
            ['name' => 'Calcium', 'symbol' => 'Ca'],
            ['name' => 'Magnesium', 'symbol' => 'Mg'],
            ['name' => 'Sulfur', 'symbol' => 'S'],
            ['name' => 'Iron', 'symbol' => 'Fe'],
            ['name' => 'Zinc', 'symbol' => 'Zn'],
            ['name' => 'Boron', 'symbol' => 'B'],
            ['name' => 'Manganese', 'symbol' => 'Mn'],
        ];

        $element = fake()->randomElement($elements);

        return [
            'name' => $element['name'] . ' ' . fake()->unique()->numberBetween(1, 999),
            'symbol' => $element['symbol'] . fake()->unique()->numberBetween(1, 99),
            'description' => fake()->sentence(10),
            'importance' => fake()->sentence(15),
        ];
    }
}
