<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Analysis extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'crop_id',
        'soil_id',
        'surface',
        'humidity',
        'wind_speed',
        'score',
        'status',
        'recommendation',
        'recommendation_data',
        'recommended_device',
        'warnings',
        'suggestions',
        'recommended_minerals',
        'recommended_daily_water',
        'recommended_water_type',
    ];

    protected $casts = [
        'recommendation_data' => 'array',
        'warnings' => 'array',
        'suggestions' => 'array',
        'recommended_minerals' => 'array',
        'score' => 'float',
        'surface' => 'float',
        'humidity' => 'float',
        'wind_speed' => 'float',
        'recommended_daily_water' => 'float',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function crop(): BelongsTo
    {
        return $this->belongsTo(Crop::class);
    }

    public function soil(): BelongsTo
    {
        return $this->belongsTo(Soil::class);
    }
}
