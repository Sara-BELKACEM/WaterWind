<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SoilResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'soil_texture' => $this->soil_texture,
            'water_retention' => $this->water_retention,
            'drainage' => $this->drainage,
            'organic_matter' => $this->organic_matter,
            'fertility' => $this->fertility,
            'salinity' => $this->salinity,
            'ph_min' => $this->ph_min,
            'ph_max' => $this->ph_max,
            'recommended_crops' => $this->recommended_crops,
            'description' => $this->description,
            'notes' => $this->notes,
            'crops' => CropResource::collection($this->whenLoaded('crops')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
