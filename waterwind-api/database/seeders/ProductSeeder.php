<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name'                => 'WaterWind Micro',
                'description'         => 'The WaterWind Micro is our compact atmospheric water generator, ideal for small agricultural plots and household gardens. It captures ambient humidity and converts it into clean irrigation water, providing an eco-friendly alternative to traditional water sources.',
                'capacity'            => 200.00,
                'daily_water_output'  => 50.00,
                'recommended_surface' => 200.00,
                'image'               => 'products/waterwind-micro.jpg',
            ],
            [
                'name'                => 'WaterWind Pro',
                'description'         => 'The WaterWind Pro is our high-capacity atmospheric water generator designed for large-scale agricultural operations. With advanced condensation technology and smart sensors, it maximises water yield even in arid conditions, making it perfect for extensive farmland irrigation.',
                'capacity'            => 1200.00,
                'daily_water_output'  => 300.00,
                'recommended_surface' => 1200.00,
                'image'               => 'products/waterwind-pro.jpg',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
