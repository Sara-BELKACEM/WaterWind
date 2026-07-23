<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            ProductSeeder::class,
            MineralSeeder::class,
            CropSeeder::class,
            SoilSeeder::class,
            CropSoilSeeder::class,
            CropMineralSeeder::class,
        ]);
    }
}
