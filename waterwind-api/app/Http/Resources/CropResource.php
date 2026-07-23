<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CropResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'scientific_name' => $this->scientific_name,
            'category' => $this->category,
            'recommended_ph' => $this->recommended_ph,
            'recommended_ph_min' => $this->recommended_ph_min,
            'recommended_ph_max' => $this->recommended_ph_max,
            'recommended_water' => $this->recommended_water,
            'recommended_water_type' => $this->recommended_water_type,
            'irrigation_frequency' => $this->irrigation_frequency,
            'water_requirement_liters_per_hectare' => $this->water_requirement_liters_per_hectare,
            'growth_period_days' => $this->growth_period_days,
            'temperature_min' => $this->temperature_min,
            'temperature_max' => $this->temperature_max,
            'humidity_min' => $this->humidity_min,
            'humidity_max' => $this->humidity_max,
            'wind_min' => $this->wind_min,
            'wind_max' => $this->wind_max,
            'recommended_device' => $this->recommended_device,
            'notes' => $this->notes,
            'soils' => SoilResource::collection($this->whenLoaded('soils')),
            'minerals' => MineralResource::collection($this->whenLoaded('minerals')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
