<?php

namespace App\Services;

use App\Enums\RecommendationStatus;
use App\Models\Crop;
use App\Models\Product;
use App\Models\Soil;

class RecommendationService
{
    private const WATERWIND_HUMIDITY_MIN = 65.0;
    private const WATERWIND_WIND_MIN = 3.0;
    private const WATERWIND_WIND_MAX = 5.0;

    private const HUMIDITY_SCORE_WEIGHT = 40;
    private const WIND_SCORE_WEIGHT = 30;
    private const SOIL_COMPAT_SCORE_WEIGHT = 30;

    private float $humidityScore = 0;
    private float $windScore = 0;
    private float $soilCompatScore = 0;

    /**
     * Generate a full agricultural recommendation report.
     *
     * Designed as a standalone service so it can be swapped for
     * an AI / ML / Weather-API implementation later.
     */
    public function generate(Crop $crop, Soil $soil, float $surface, float $humidity, float $windSpeed): array
    {
        $cropInfo = $this->buildCropInfo($crop);
        $waterRecommendation = $this->buildWaterRecommendation($crop, $soil, $surface);
        $mineralRecommendations = $this->buildMineralRecommendations($crop);
        $atmosphericConditions = $this->buildAtmosphericConditions($crop, $humidity, $windSpeed);
        $deviceRecommendation = $this->buildDeviceRecommendation($crop, $surface);
        $soilCompatibility = $this->evaluateSoilCompatibility($crop, $soil);
        $overallScore = $this->calculateOverallScore();
        $status = RecommendationStatus::fromScore($overallScore);

        return [
            'crop' => [
                'name' => $crop->name,
                'scientific_name' => $crop->scientific_name,
                'category' => $crop->category,
                'growth_season' => $crop->growth_period_days ? "{$crop->growth_period_days} days" : null,
                'water_requirement' => $crop->recommended_water . ' mm/season',
                'preferred_pH' => $crop->recommended_ph,
                'preferred_pH_range' => [
                    'min' => $crop->recommended_ph_min,
                    'max' => $crop->recommended_ph_max,
                ],
                'preferred_soil' => $crop->soils->pluck('name')->first() ?? 'Any',
                'compatible_soils' => $crop->soils->pluck('name')->toArray(),
            ],

            'soil' => [
                'name' => $soil->name,
                'texture' => $soil->soil_texture,
                'pH_range' => [
                    'min' => $soil->ph_min,
                    'max' => $soil->ph_max,
                ],
                'fertility' => $soil->fertility,
                'compatibility' => $soilCompatibility['status'],
                'compatibility_reason' => $soilCompatibility['reason'],
            ],

            'water' => [
                'estimated_daily_need' => $waterRecommendation['daily_need_liters'] . ' L/day',
                'estimated_daily_need_liters' => $waterRecommendation['daily_need_liters'],
                'water_quality' => $crop->recommended_water_type ?? 'Fresh Water',
                'recommended_pH' => $waterRecommendation['recommended_pH'],
                'irrigation_recommendation' => $waterRecommendation['irrigation'],
            ],

            'minerals' => $mineralRecommendations,

            'atmospheric' => [
                'humidity' => [
                    'value' => $humidity . '%',
                    'status' => $atmosphericConditions['humidity_status'],
                    'score' => $atmosphericConditions['humidity_score'],
                ],
                'wind' => [
                    'value' => $windSpeed . ' m/s',
                    'status' => $atmosphericConditions['wind_status'],
                    'score' => $atmosphericConditions['wind_score'],
                ],
            ],

            'device' => [
                'recommended' => $deviceRecommendation['device'],
                'reason' => $deviceRecommendation['reason'],
                'daily_output' => $deviceRecommendation['daily_output'] . ' L/day',
            ],

            'waterwind_score' => round($overallScore, 1),
            'status' => $status->value,
            'recommendation' => $this->buildRecommendationText($status, $crop, $soil, $deviceRecommendation, $atmosphericConditions),

            'warnings' => $this->collectWarnings($crop, $soil, $humidity, $windSpeed, $waterRecommendation, $deviceRecommendation),
            'suggestions' => $this->collectSuggestions($crop, $soil, $humidity, $windSpeed, $waterRecommendation),
        ];
    }

    private function buildCropInfo(Crop $crop): array
    {
        return [
            'name' => $crop->name,
            'scientific_name' => $crop->scientific_name,
            'category' => $crop->category,
            'growth_season' => $crop->growth_period_days ? "{$crop->growth_period_days} days" : null,
            'water_requirement' => $crop->recommended_water . ' mm/season',
            'preferred_pH' => $crop->recommended_ph,
            'preferred_pH_range' => [
                'min' => $crop->recommended_ph_min,
                'max' => $crop->recommended_ph_max,
            ],
            'preferred_soil' => $crop->soils->pluck('name')->first() ?? 'Any',
            'compatible_soils' => $crop->soils->pluck('name')->toArray(),
        ];
    }

    private function buildWaterRecommendation(Crop $crop, Soil $soil, float $surface): array
    {
        $litersPerHa = $crop->water_requirement_liters_per_hectare ?? ($crop->recommended_water * 100);
        $surfaceHa = $surface / 10000;
        $growthDays = max($crop->growth_period_days ?? 90, 1);
        $dailyNeed = round(($litersPerHa * $surfaceHa) / $growthDays, 2);

        $phMin = $crop->recommended_ph_min ?? ($crop->recommended_ph - 0.5);
        $phMax = $crop->recommended_ph_max ?? ($crop->recommended_ph + 0.5);

        $irrigation = match (true) {
            $dailyNeed > 100 => 'Heavy irrigation required. Consider drip or sprinkler systems with atmospheric water supplementation.',
            $dailyNeed > 30 => 'Moderate irrigation recommended. WaterWind device can supplement natural rainfall.',
            default => 'Light irrigation sufficient. WaterWind device may fully cover water needs.',
        };

        return [
            'daily_need_liters' => $dailyNeed,
            'recommended_pH' => $crop->recommended_ph,
            'irrigation' => $irrigation,
        ];
    }

    private function buildMineralRecommendations(Crop $crop): array
    {
        $minerals = $crop->minerals;

        if ($minerals->isEmpty()) {
            return [];
        }

        return $minerals->map(function ($mineral) {
            return [
                'name' => $mineral->name,
                'symbol' => $mineral->symbol,
                'importance' => ucfirst($mineral->pivot->priority),
                'benefit' => $mineral->benefit ?? $mineral->importance ?? $mineral->description,
                'reason' => $mineral->pivot->reason ?? $this->defaultMineralReason($mineral->name, $mineral->pivot->priority),
            ];
        })->toArray();
    }

    private function defaultMineralReason(string $name, string $priority): string
    {
        return match ($name) {
            'Nitrogen' => 'Essential for leaf development, vegetative growth, and chlorophyll production.',
            'Phosphorus' => 'Vital for root development, flowering, and energy transfer within the plant.',
            'Potassium' => 'Improves fruit quality, disease resistance, and regulates water uptake.',
            'Calcium' => 'Strengthens cell walls and prevents physiological disorders like blossom end rot.',
            'Magnesium' => 'Central atom of chlorophyll, essential for photosynthesis and enzyme function.',
            'Sulfur' => 'Component of amino acids and proteins, aids in nitrogen fixation.',
            'Zinc' => 'Regulates growth hormones and aids in protein synthesis.',
            'Iron' => 'Essential for chlorophyll synthesis and electron transport in photosynthesis.',
            'Boron' => 'Critical for cell wall formation, reproductive development, and sugar transport.',
            'Copper' => 'Involved in photosynthesis, respiration, and lignin synthesis.',
            'Manganese' => 'Activates enzymes in photosynthesis and nitrogen metabolism.',
            'Molybdenum' => 'Required for nitrogen metabolism and enzyme function.',
            'Silicon' => 'Strengthens cell walls and improves resistance to pests and environmental stress.',
            'Chlorine' => 'Regulates water balance and osmosis in plant cells.',
            default => "Important micronutrient for {$name}-related metabolic processes.",
        };
    }

    private function buildAtmosphericConditions(Crop $crop, float $humidity, float $windSpeed): array
    {
        $this->humidityScore = $this->scoreHumidity($crop, $humidity);
        $this->windScore = $this->scoreWind($crop, $windSpeed);

        return [
            'humidity_status' => $this->humidityStatusLabel($this->humidityScore),
            'humidity_score' => round($this->humidityScore, 1),
            'wind_status' => $this->windStatusLabel($this->windScore),
            'wind_score' => round($this->windScore, 1),
        ];
    }

    private function scoreHumidity(Crop $crop, float $humidity): float
    {
        $humMin = $crop->humidity_min ?? 40;
        $humMax = $crop->humidity_max ?? 80;
        $idealCenter = ($humMin + $humMax) / 2;

        if ($humidity >= $humMin && $humidity <= $humMax) {
            $distanceFromCenter = abs($humidity - $idealCenter) / (($humMax - $humMin) / 2);
            return 100 - ($distanceFromCenter * 15);
        }

        if ($humidity >= self::WATERWIND_HUMIDITY_MIN) {
            $overshoot = abs($humidity - $humMax) / 20;
            return max(60, 85 - ($overshoot * 30));
        }

        $undershoot = (self::WATERWIND_HUMIDITY_MIN - $humidity) / self::WATERWIND_HUMIDITY_MIN;
        return max(0, 60 * (1 - $undershoot));
    }

    private function scoreWind(Crop $crop, float $windSpeed): float
    {
        $windMin = $crop->wind_min ?? self::WATERWIND_WIND_MIN;
        $windMax = $crop->wind_max ?? self::WATERWIND_WIND_MAX;

        if ($windSpeed >= $windMin && $windSpeed <= $windMax) {
            $idealCenter = ($windMin + $windMax) / 2;
            $distanceFromCenter = abs($windSpeed - $idealCenter) / (($windMax - $windMin) / 2);
            return 100 - ($distanceFromCenter * 10);
        }

        $isInWaterWindRange = $windSpeed >= self::WATERWIND_WIND_MIN && $windSpeed <= self::WATERWIND_WIND_MAX;

        if ($isInWaterWindRange) {
            if ($windSpeed > $windMax) {
                $overshoot = ($windSpeed - $windMax) / 3;
                return max(50, 80 - ($overshoot * 20));
            }
            return max(50, 80);
        }

        $deviation = min(
            abs($windSpeed - self::WATERWIND_WIND_MIN),
            abs($windSpeed - self::WATERWIND_WIND_MAX)
        );
        return max(0, 70 - ($deviation * 15));
    }

    private function humidityStatusLabel(float $score): string
    {
        return match (true) {
            $score >= 90 => 'Excellent',
            $score >= 75 => 'Good',
            $score >= 50 => 'Average',
            default => 'Poor',
        };
    }

    private function windStatusLabel(float $score): string
    {
        return match (true) {
            $score >= 90 => 'Excellent',
            $score >= 60 => 'Good',
            default => 'Poor',
        };
    }

    private function evaluateSoilCompatibility(Crop $crop, Soil $soil): array
    {
        $compatibleSoilIds = $crop->soils->pluck('id')->toArray();
        $isCompatible = in_array($soil->id, $compatibleSoilIds);

        if ($isCompatible) {
            $this->soilCompatScore = 100;
            return [
                'status' => 'Compatible',
                'reason' => "The selected soil ({$soil->name}) is listed as compatible with {$crop->name}.",
            ];
        }

        $phMin = $crop->recommended_ph_min ?? ($crop->recommended_ph - 0.5);
        $phMax = $crop->recommended_ph_max ?? ($crop->recommended_ph + 0.5);
        $soilPhMin = $soil->ph_min ?? 5.5;
        $soilPhMax = $soil->ph_max ?? 7.5;
        $rangesOverlap = $phMin <= $soilPhMax && $phMax >= $soilPhMin;

        if ($rangesOverlap) {
            $this->soilCompatScore = 60;
            $compatibleNames = $crop->soils->pluck('name')->implode(', ');
            return [
                'status' => 'Partially Compatible',
                'reason' => "The soil ({$soil->name}) is not in the preferred list but pH ranges overlap. Recommended soils: {$compatibleNames}.",
            ];
        }

        $this->soilCompatScore = 20;
        $compatibleNames = $crop->soils->pluck('name')->implode(', ');
        return [
            'status' => 'Incompatible',
            'reason' => "The soil ({$soil->name}) is not compatible with {$crop->name}. The pH range is outside the crop's preferred range. Recommended soils: {$compatibleNames}.",
        ];
    }

    private function buildDeviceRecommendation(Crop $crop, float $surface): array
    {
        $proProduct = Product::where('name', 'WaterWind Pro')->first();
        $microProduct = Product::where('name', 'WaterWind Micro')->first();

        if ($surface >= 500) {
            return [
                'device' => 'WaterWind Pro',
                'reason' => "Surface area ({$surface} m²) exceeds 500 m². WaterWind Pro is recommended for large-scale operations.",
                'daily_output' => $proProduct?->daily_water_output ?? 300,
            ];
        }

        return [
            'device' => 'WaterWind Micro',
            'reason' => "Surface area ({$surface} m²) is suitable for WaterWind Micro, ideal for small to medium plots.",
            'daily_output' => $microProduct?->daily_water_output ?? 50,
        ];
    }

    private function calculateOverallScore(): float
    {
        $atmosphericScore = ($this->humidityScore * self::HUMIDITY_SCORE_WEIGHT
            + $this->windScore * self::WIND_SCORE_WEIGHT)
            / (self::HUMIDITY_SCORE_WEIGHT + self::WIND_SCORE_WEIGHT);

        $overall = ($atmosphericScore * 0.6) + ($this->soilCompatScore * 0.4);

        return max(0, min(100, $overall));
    }

    private function buildRecommendationText(
        RecommendationStatus $status,
        Crop $crop,
        Soil $soil,
        array $deviceRecommendation,
        array $atmosphericConditions
    ): string {
        $messages = [];

        $messages[] = "{$status->value} conditions for atmospheric water generation.";

        $messages[] = "{$crop->name} is being analyzed on {$soil->name} soil.";

        $messages[] = "Device: {$deviceRecommendation['device']} - {$deviceRecommendation['reason']}";

        $messages[] = "Humidity: {$atmosphericConditions['humidity_status']} ({$atmosphericConditions['humidity_score']}/100).";
        $messages[] = "Wind: {$atmosphericConditions['wind_status']} ({$atmosphericConditions['wind_score']}/100).";

        return implode(' ', $messages);
    }

    private function collectWarnings(Crop $crop, Soil $soil, float $humidity, float $windSpeed, array $waterRecommendation, array $deviceRecommendation): array
    {
        $warnings = [];

        $compatibleSoilIds = $crop->soils->pluck('id')->toArray();
        if (!in_array($soil->id, $compatibleSoilIds)) {
            $compatibleNames = $crop->soils->pluck('name')->implode(', ');
            $warnings[] = "Soil '{$soil->name}' is not in the recommended soil list for {$crop->name}. Use: {$compatibleNames}.";
        }

        if ($humidity < self::WATERWIND_HUMIDITY_MIN) {
            $warnings[] = "Humidity ({$humidity}%) is below the WaterWind optimal threshold of " . self::WATERWIND_HUMIDITY_MIN . "%. Water generation efficiency may be reduced.";
        }

        if ($windSpeed < self::WATERWIND_WIND_MIN || $windSpeed > self::WATERWIND_WIND_MAX) {
            $warnings[] = "Wind speed ({$windSpeed} m/s) is outside the WaterWind optimal range of " . self::WATERWIND_WIND_MIN . '–' . self::WATERWIND_WIND_MAX . ' m/s.';
        }

        if ($waterRecommendation['daily_need_liters'] > $deviceRecommendation['daily_output']) {
            $warnings[] = "Daily water requirement ({$waterRecommendation['daily_need_liters']} L) exceeds device capacity ({$deviceRecommendation['daily_output']} L/day). Consider multiple devices or alternative sources.";
        }

        return $warnings;
    }

    private function collectSuggestions(Crop $crop, Soil $soil, float $humidity, float $windSpeed, array $waterRecommendation): array
    {
        $suggestions = [];

        if ($humidity < self::WATERWIND_HUMIDITY_MIN) {
            $suggestions[] = "Consider misting systems or shade nets to increase local humidity above " . self::WATERWIND_HUMIDITY_MIN . '%.';
        }

        $windMin = $crop->wind_min ?? self::WATERWIND_WIND_MIN;
        $windMax = $crop->wind_max ?? self::WATERWIND_WIND_MAX;
        if ($windSpeed > $windMax) {
            $suggestions[] = "Install windbreaks or shelterbelts to reduce wind speed below {$windMax} m/s.";
        }

        $phMin = $crop->recommended_ph_min ?? ($crop->recommended_ph - 0.5);
        $phMax = $crop->recommended_ph_max ?? ($crop->recommended_ph + 0.5);
        $soilPhMin = $soil->ph_min ?? 5.5;
        $soilPhMax = $soil->ph_max ?? 7.5;
        if (!($phMin <= $soilPhMax && $phMax >= $soilPhMin)) {
            $suggestions[] = "Adjust soil pH to be within {$phMin}–{$phMax} using lime (raise) or sulfur (lower).";
        }

        $minerals = $crop->minerals->where('pivot.priority', 'high');
        if ($minerals->isNotEmpty()) {
            $names = $minerals->pluck('name')->implode(', ');
            $suggestions[] = "Ensure adequate supply of high-priority minerals: {$names}.";
        }

        $suggestions[] = "Monitor crop health regularly and adjust irrigation based on actual evapotranspiration data.";

        return $suggestions;
    }
}
