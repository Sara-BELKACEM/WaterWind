<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MineralResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'symbol' => $this->symbol,
            'description' => $this->description,
            'importance' => $this->importance,
            'pivot' => $this->whenPivotLoaded('crop_mineral', function () {
                return [
                    'crop_id' => $this->pivot->crop_id,
                    'mineral_id' => $this->pivot->mineral_id,
                    'priority' => $this->pivot->priority,
                    'reason' => $this->pivot->reason,
                ];
            }),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
