<?php

namespace Database\Seeders;

use App\Models\Mineral;
use Illuminate\Database\Seeder;

class MineralSeeder extends Seeder
{
    public function run(): void
    {
        $minerals = [
            [
                'name' => 'Nitrogen',
                'symbol' => 'N',
                'description' => 'Essential for vegetative growth, chlorophyll production, and protein synthesis.',
                'importance' => 'Primary macronutrient. Drives leaf and stem growth, enhances green color, and is a key component of amino acids and proteins.',
                'benefit' => 'Promotes rapid vegetative growth, deep green foliage, and high protein content in crops.',
            ],
            [
                'name' => 'Phosphorus',
                'symbol' => 'P',
                'description' => 'Vital for root development, flower formation, and energy transfer within the plant.',
                'importance' => 'Primary macronutrient. Promotes root growth, seed development, and energy transfer via ATP.',
                'benefit' => 'Accelerates root establishment, improves flowering and fruiting, and strengthens early plant vigor.',
            ],
            [
                'name' => 'Potassium',
                'symbol' => 'K',
                'description' => 'Regulates water uptake, enzyme activation, and overall plant vigor.',
                'importance' => 'Primary macronutrient. Controls stomatal opening, improves water use efficiency, strengthens cell walls, and enhances fruit quality.',
                'benefit' => 'Improves fruit size and color, enhances disease resistance, and increases drought tolerance.',
            ],
            [
                'name' => 'Calcium',
                'symbol' => 'Ca',
                'description' => 'Strengthens cell walls and membranes. Critical for root tip growth and preventing disorders.',
                'importance' => 'Secondary macronutrient. Builds strong cell structure, activates enzymes, and prevents physiological disorders in fruits.',
                'benefit' => 'Prevents blossom end rot in tomatoes, strengthens cell walls, and improves root health.',
            ],
            [
                'name' => 'Magnesium',
                'symbol' => 'Mg',
                'description' => 'Central atom of the chlorophyll molecule. Essential for photosynthesis and enzyme function.',
                'importance' => 'Secondary macronutrient. Enables photosynthesis, activates phosphate enzymes, and aids in phosphorus and iron uptake.',
                'benefit' => 'Ensures efficient photosynthesis, prevents leaf yellowing, and supports oil and fat synthesis in seeds.',
            ],
            [
                'name' => 'Sulfur',
                'symbol' => 'S',
                'description' => 'Component of amino acids and proteins. Contributes to chlorophyll formation and enzyme activation.',
                'importance' => 'Secondary macronutrient. Required for protein synthesis, oil production in seeds, and nitrogen fixation in legumes.',
                'benefit' => 'Improves protein quality, enhances oil content in seeds, and supports nitrogen-fixing bacteria in legumes.',
            ],
            [
                'name' => 'Iron',
                'symbol' => 'Fe',
                'description' => 'Essential for chlorophyll synthesis and electron transport in photosynthesis.',
                'importance' => 'Micronutrient. Catalyzes chlorophyll production, participates in energy transfer, and activates many enzymatic reactions.',
                'benefit' => 'Prevents iron chlorosis (yellowing of young leaves), supports vigorous growth, and enhances nitrogen metabolism.',
            ],
            [
                'name' => 'Zinc',
                'symbol' => 'Zn',
                'description' => 'Regulates plant growth hormones and is involved in enzyme systems.',
                'importance' => 'Micronutrient. Stimulates growth hormone production, aids in protein synthesis, and helps in starch formation.',
                'benefit' => 'Prevents stunted growth and small leaves, promotes internode elongation, and improves crop uniformity.',
            ],
            [
                'name' => 'Boron',
                'symbol' => 'B',
                'description' => 'Critical for cell wall formation, reproductive development, and sugar transport.',
                'importance' => 'Micronutrient. Supports cell division, flower retention, fruit set, and calcium transport within the plant.',
                'benefit' => 'Ensures proper pollen germination, prevents hollow heart in crops, and improves fruit set and seed development.',
            ],
            [
                'name' => 'Copper',
                'symbol' => 'Cu',
                'description' => 'Involved in photosynthesis, respiration, and lignin synthesis.',
                'importance' => 'Micronutrient. Facilitates electron transport in photosynthesis, lignin formation for structural strength, and reproductive development.',
                'benefit' => 'Strengthens cell walls against pathogens, improves grain filling in cereals, and enhances enzyme activity.',
            ],
            [
                'name' => 'Manganese',
                'symbol' => 'Mn',
                'description' => 'Activates enzymes involved in photosynthesis and respiration.',
                'importance' => 'Micronutrient. Essential for oxygen evolution in photosynthesis, enzyme activation, and iron absorption.',
                'benefit' => 'Supports chlorophyll formation, improves seed germination, and enhances resistance to root diseases.',
            ],
            [
                'name' => 'Molybdenum',
                'symbol' => 'Mo',
                'description' => 'Required for nitrogen metabolism and enzyme function.',
                'importance' => 'Micronutrient. Enables nitrogen assimilation, activates nitrate reductase enzyme, and supports legume nitrogen fixation.',
                'benefit' => 'Ensures efficient use of nitrogen fertilizers, promotes nodulation in legumes, and prevents leaf cupping.',
            ],
            [
                'name' => 'Silicon',
                'symbol' => 'Si',
                'description' => 'Strengthens cell walls and improves resistance to pests, diseases, and environmental stress.',
                'importance' => 'Beneficial nutrient. Reinforces plant structure, improves drought tolerance, and reduces heavy metal toxicity.',
                'benefit' => 'Increases resistance to fungal diseases and insect attack, reduces lodging in cereals, and improves heat tolerance.',
            ],
            [
                'name' => 'Chlorine',
                'symbol' => 'Cl',
                'description' => 'Regulates water balance and osmosis. Involved in photosynthetic oxygen evolution.',
                'importance' => 'Micronutrient. Maintains cell turgor, activates photosynthesis enzymes, and improves disease resistance.',
                'benefit' => 'Balances water uptake, improves photosynthetic efficiency, and suppresses certain fungal diseases.',
            ],
        ];

        foreach ($minerals as $mineral) {
            Mineral::create($mineral);
        }
    }
}
