<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('crop_soil', function (Blueprint $table) {
            $table->id();
            $table->foreignId('crop_id')->constrained('crops')->onDelete('cascade');
            $table->foreignId('soil_id')->constrained('soils')->onDelete('cascade');
            $table->timestamps();
            $table->unique(['crop_id', 'soil_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('crop_soil');
    }
};
