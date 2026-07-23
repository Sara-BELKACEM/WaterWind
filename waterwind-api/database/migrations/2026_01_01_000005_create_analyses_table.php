<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('analyses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('crop_id')->constrained('crops');
            $table->foreignId('soil_id')->constrained('soils');
            $table->decimal('surface', 10, 2);
            $table->decimal('humidity', 5, 2);
            $table->decimal('wind_speed', 6, 2);
            $table->text('recommendation');
            $table->string('recommended_device');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('analyses');
    }
};
