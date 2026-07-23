<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Soil extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'soil_texture',
        'water_retention',
        'drainage',
        'organic_matter',
        'fertility',
        'salinity',
        'ph_min',
        'ph_max',
        'recommended_crops',
        'description',
        'notes',
    ];

    protected $casts = [
        'water_retention' => 'float',
        'drainage' => 'float',
        'organic_matter' => 'float',
        'salinity' => 'float',
        'ph_min' => 'float',
        'ph_max' => 'float',
    ];

    public function crops(): BelongsToMany
    {
        return $this->belongsToMany(Crop::class, 'crop_soil');
    }

    public function analyses(): HasMany
    {
        return $this->hasMany(Analysis::class);
    }
}
