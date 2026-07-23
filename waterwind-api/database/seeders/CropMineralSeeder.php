<?php

namespace Database\Seeders;

use App\Models\Crop;
use App\Models\Mineral;
use Illuminate\Database\Seeder;

class CropMineralSeeder extends Seeder
{
    public function run(): void
    {
        $cropMineralMap = [
            'Tomato' => [
                'Nitrogen' => ['priority' => 'high', 'reason' => 'Essential for leaf development and vegetative growth during early stages. Supports canopy formation needed for fruit shading.'],
                'Phosphorus' => ['priority' => 'medium', 'reason' => 'Promotes root development and flower formation. Critical during transplanting and early fruiting stages.'],
                'Potassium' => ['priority' => 'high', 'reason' => 'Improves fruit quality, color, and flavor. Enhances disease resistance and regulates water balance in the fruit.'],
                'Calcium' => ['priority' => 'high', 'reason' => 'Prevents blossom end rot. Strengthens cell walls and is critical for fruit cell division during rapid growth.'],
                'Magnesium' => ['priority' => 'medium', 'reason' => 'Central to chlorophyll production. Deficiency causes interveinal yellowing on older leaves, reducing photosynthesis.'],
                'Sulfur' => ['priority' => 'medium', 'reason' => 'Supports amino acid synthesis and improves the savory flavor compounds in tomatoes.'],
            ],
            'Potato' => [
                'Potassium' => ['priority' => 'high', 'reason' => 'Critical for tuber bulking and starch accumulation. Deficiency causes reduced tuber size and yield.'],
                'Phosphorus' => ['priority' => 'high', 'reason' => 'Drives tuber initiation and early root development. Essential for energy transfer during tuber filling.'],
                'Nitrogen' => ['priority' => 'medium', 'reason' => 'Supports canopy growth but excess delays tuber formation. Balance is key for optimal yield.'],
                'Calcium' => ['priority' => 'medium', 'reason' => 'Prevents internal browning and hollow heart. Strengthens tuber cell structure.'],
            ],
            'Olive' => [
                'Potassium' => ['priority' => 'high', 'reason' => 'Essential for fruit development and oil synthesis. Improves tree vigor and drought resistance in Mediterranean climates.'],
                'Boron' => ['priority' => 'high', 'reason' => 'Critical for flower retention and fruit set. Deficiency causes poor pollination and fruit drop.'],
                'Nitrogen' => ['priority' => 'medium', 'reason' => 'Supports canopy growth and photosynthesis. Excess reduces oil quality and delays ripening.'],
                'Zinc' => ['priority' => 'medium', 'reason' => 'Regulates growth hormones and prevents small leaf syndrome in olive trees.'],
            ],
            'Corn' => [
                'Nitrogen' => ['priority' => 'high', 'reason' => 'The most yield-limiting nutrient for corn. Essential for rapid vegetative growth and ear development.'],
                'Phosphorus' => ['priority' => 'high', 'reason' => 'Critical for root establishment and early season vigor. Drives energy transfer for grain filling.'],
                'Potassium' => ['priority' => 'high', 'reason' => 'Improves stalk strength, disease resistance, and grain fill. Prevents lodging and poor ear development.'],
                'Magnesium' => ['priority' => 'medium', 'reason' => 'Required for chlorophyll production in the large leaf area of corn. Deficiency reduces photosynthetic efficiency.'],
                'Zinc' => ['priority' => 'medium', 'reason' => 'Corn is highly responsive to zinc. Deficiency causes white striping on leaves and reduced yield.'],
                'Sulfur' => ['priority' => 'low', 'reason' => 'Supports protein synthesis. Deficiency shows as general yellowing similar to nitrogen deficiency.'],
            ],
            'Wheat' => [
                'Nitrogen' => ['priority' => 'high', 'reason' => 'Drives grain protein content and yield. Application timing affects both quality and quantity of harvest.'],
                'Phosphorus' => ['priority' => 'medium', 'reason' => 'Promotes root development and tillering. Important for early growth and winter survival.'],
                'Potassium' => ['priority' => 'medium', 'reason' => 'Improves straw strength, disease resistance, and grain filling. Essential for winter hardiness.'],
                'Zinc' => ['priority' => 'medium', 'reason' => 'Supports enzyme function and grain quality. Deficiency is common in calcareous soils.'],
                'Sulfur' => ['priority' => 'low', 'reason' => 'Required for gluten protein formation. Deficiency reduces grain quality and protein content.'],
            ],
            'Rice' => [
                'Nitrogen' => ['priority' => 'high', 'reason' => 'The primary driver of rice yield. Must be managed carefully in flooded conditions to minimize losses.'],
                'Phosphorus' => ['priority' => 'high', 'reason' => 'Critical for root establishment in anaerobic paddy soils. Drives early growth and grain formation.'],
                'Potassium' => ['priority' => 'medium', 'reason' => 'Improves grain quality and straw strength. Enhances resistance to lodging and disease.'],
                'Iron' => ['priority' => 'high', 'reason' => 'Rice is adapted to iron-rich flooded soils. Iron deficiency causes chlorosis in aerobic rice systems.'],
                'Zinc' => ['priority' => 'medium', 'reason' => 'Zinc deficiency is widespread in rice paddies. Causes brown spots and stunted growth.'],
                'Silicon' => ['priority' => 'high', 'reason' => 'Rice is a silicon-hungry crop. Silicon strengthens stems, improves disease resistance, and reduces lodging.'],
            ],
            'Cotton' => [
                'Nitrogen' => ['priority' => 'high', 'reason' => 'Drives vegetative growth and boll development. Must be balanced to avoid excessive vegetative growth at the expense of fiber.'],
                'Potassium' => ['priority' => 'high', 'reason' => 'Improves fiber quality, strength, and length. Enhances drought tolerance and boll opening.'],
                'Boron' => ['priority' => 'high', 'reason' => 'Critical for fiber elongation and boll retention. Deficiency causes boll abortion and short fibers.'],
                'Zinc' => ['priority' => 'medium', 'reason' => 'Supports enzymatic processes and growth regulation. Deficiency causes small, crinkled leaves.'],
                'Sulfur' => ['priority' => 'low', 'reason' => 'Supports protein synthesis and fiber development. Deficiency causes pale yellow leaves.'],
            ],
            'Sunflower' => [
                'Nitrogen' => ['priority' => 'medium', 'reason' => 'Supports vegetative growth and head development. Excess delays maturity and reduces oil content.'],
                'Phosphorus' => ['priority' => 'medium', 'reason' => 'Promotes root development and seed filling. Important for energy transfer in oil synthesis.'],
                'Potassium' => ['priority' => 'high', 'reason' => 'Enhances oil quality and content. Improves stalk strength and drought tolerance.'],
                'Boron' => ['priority' => 'medium', 'reason' => 'Critical for pollen tube growth and seed set. Deficiency causes hollow stems and poor seed fill.'],
                'Sulfur' => ['priority' => 'low', 'reason' => 'Supports oil synthesis and protein formation in seeds.'],
            ],
            'Barley' => [
                'Nitrogen' => ['priority' => 'high', 'reason' => 'Drives yield and protein content. Timing is critical for malting quality in beer production.'],
                'Phosphorus' => ['priority' => 'medium', 'reason' => 'Promotes early root growth and tillering. Important for winter barley establishment.'],
                'Potassium' => ['priority' => 'medium', 'reason' => 'Improves straw strength and disease resistance. Enhances grain filling.'],
                'Sulfur' => ['priority' => 'medium', 'reason' => 'Required for malting quality proteins. Deficiency reduces grain quality for brewing.'],
                'Zinc' => ['priority' => 'low', 'reason' => 'Supports enzyme function. Deficiency is less common but can limit yield on sandy soils.'],
            ],
            'Grapes' => [
                'Potassium' => ['priority' => 'high', 'reason' => 'Essential for sugar accumulation in berries, color development, and overall fruit quality.'],
                'Calcium' => ['priority' => 'high', 'reason' => 'Strengthens cell walls in berries and stems. Prevents berry splitting and improves post-harvest storage.'],
                'Magnesium' => ['priority' => 'medium', 'reason' => 'Required for chlorophyll in the canopy. Deficiency causes interveinal yellowing reducing photosynthesis and sugar levels.'],
                'Iron' => ['priority' => 'medium', 'reason' => 'Grapes are sensitive to iron deficiency on calcareous soils. Causes chlorosis and reduced vigor.'],
                'Boron' => ['priority' => 'low', 'reason' => 'Supports pollen germination and fruit set. Excess can be toxic to grapevines.'],
                'Zinc' => ['priority' => 'low', 'reason' => 'Regulates growth and enzyme function. Deficiency causes small, narrow leaves (little leaf).'],
            ],
        ];

        foreach ($cropMineralMap as $cropName => $minerals) {
            $crop = Crop::where('name', $cropName)->first();

            if (!$crop) {
                continue;
            }

            foreach ($minerals as $mineralName => $data) {
                $mineral = Mineral::where('name', $mineralName)->first();

                if ($mineral) {
                    $crop->minerals()->attach($mineral->id, [
                        'priority' => $data['priority'],
                        'reason' => $data['reason'],
                    ]);
                }
            }
        }
    }
}
