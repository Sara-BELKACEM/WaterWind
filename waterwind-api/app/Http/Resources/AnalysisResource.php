<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnalysisResource extends JsonResource
{
    public static $wrap = null;
    public function toArray(Request $request): array
    {
        $data = $this->recommendation_data ?? [];

        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'crop_id' => $this->crop_id,
            'soil_id' => $this->soil_id,

            'surface' => $this->surface,
            'humidity' => $this->humidity,
            'wind_speed' => $this->wind_speed,

            'crop' => $this->whenLoaded('crop', fn () => [
                'id' => $this->crop->id,
                'name' => $this->crop->name,
                'scientific_name' => $this->crop->scientific_name,
                'category' => $this->crop->category,
            ]),
            'soil' => $this->whenLoaded('soil', fn () => [
                'id' => $this->soil->id,
                'name' => $this->soil->name,
                'texture' => $this->soil->soil_texture,
            ]),

            'waterwind_score' => $this->score,
            'status' => $this->status,
            'recommendation' => $this->recommendation,

            'water' => $data['water'] ?? [
                'estimated_daily_need' => $this->recommended_daily_water ? $this->recommended_daily_water . ' L/day' : null,
                'estimated_daily_need_liters' => $this->recommended_daily_water,
                'water_quality' => $this->recommended_water_type,
                'recommended_pH' => null,
                'irrigation_recommendation' => null,
            ],

            'minerals' => $data['minerals'] ?? collect($this->recommended_minerals ?? [])->map(function ($name) {
                return ['name' => $name, 'importance' => null, 'benefit' => null, 'reason' => null];
            })->toArray(),

            'atmospheric' => $data['atmospheric'] ?? [
                'humidity' => [
                    'value' => $this->humidity . '%',
                    'status' => null,
                    'score' => null,
                ],
                'wind' => [
                    'value' => $this->wind_speed . ' m/s',
                    'status' => null,
                    'score' => null,
                ],
            ],

            'device' => $data['device'] ?? [
                'recommended' => $this->recommended_device,
                'reason' => null,
                'daily_output' => null,
            ],

            'warnings' => $this->warnings ?? [],
            'suggestions' => $this->suggestions ?? [],

            'recommendation_data' => $data,

            'created_at' => $this->created_at,
        ];
    }
}
