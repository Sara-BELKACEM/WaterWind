<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Crop extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'scientific_name',
        'category',
        'recommended_ph',
        'recommended_ph_min',
        'recommended_ph_max',
        'recommended_water',
        'recommended_water_type',
        'irrigation_frequency',
        'water_requirement_liters_per_hectare',
        'growth_period_days',
        'temperature_min',
        'temperature_max',
        'humidity_min',
        'humidity_max',
        'wind_min',
        'wind_max',
        'recommended_device',
        'notes',
    ];

    protected $casts = [
        'recommended_water' => 'float',
        'recommended_ph' => 'float',
        'recommended_ph_min' => 'float',
        'recommended_ph_max' => 'float',
        'water_requirement_liters_per_hectare' => 'float',
        'temperature_min' => 'float',
        'temperature_max' => 'float',
        'humidity_min' => 'float',
        'humidity_max' => 'float',
        'wind_min' => 'float',
        'wind_max' => 'float',
        'growth_period_days' => 'integer',
    ];

    public function soils(): BelongsToMany
    {
        return $this->belongsToMany(Soil::class, 'crop_soil');
    }

    public function minerals(): BelongsToMany
    {
        return $this->belongsToMany(Mineral::class, 'crop_mineral')
            ->withPivot('priority', 'reason')
            ->withTimestamps();
    }

    public function analyses(): HasMany
    {
        return $this->hasMany(Analysis::class);
    }
}
