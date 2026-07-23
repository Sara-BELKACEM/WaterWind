<?php

namespace Database\Seeders;

use App\Models\Crop;
use Illuminate\Database\Seeder;

class CropSoilSeeder extends Seeder
{
    public function run(): void
    {
        // Map crop names to compatible soil names (agronomically realistic)
        $cropSoilMap = [
            'Wheat'      => ['Loamy', 'Clay Loam', 'Silty'],
            'Corn'       => ['Loamy', 'Silty', 'Sandy Loam'],
            'Rice'       => ['Clay', 'Silty Clay', 'Clay Loam'],
            'Tomato'     => ['Loamy', 'Sandy Loam', 'Silty'],
            'Olive'      => ['Sandy', 'Chalky', 'Sandy Loam'],
            'Grapes'     => ['Sandy Loam', 'Loamy', 'Chalky'],
            'Potato'     => ['Sandy Loam', 'Loamy', 'Sandy'],
            'Cotton'     => ['Loamy', 'Sandy Loam', 'Clay Loam'],
            'Sunflower'  => ['Loamy', 'Sandy Loam', 'Silty'],
            'Barley'     => ['Loamy', 'Sandy Loam', 'Chalky'],
        ];

        foreach ($cropSoilMap as $cropName => $soilNames) {
            $crop = Crop::where('name', $cropName)->first();

            if (!$crop) {
                continue;
            }

            $soilIds = \App\Models\Soil::whereIn('name', $soilNames)->pluck('id')->toArray();
            $crop->soils()->sync($soilIds);
        }
    }
}
