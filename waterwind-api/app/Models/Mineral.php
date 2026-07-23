<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Mineral extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'symbol',
        'description',
        'importance',
        'benefit',
    ];

    public function crops(): BelongsToMany
    {
        return $this->belongsToMany(Crop::class, 'crop_mineral')
            ->withPivot('priority', 'reason')
            ->withTimestamps();
    }
}
