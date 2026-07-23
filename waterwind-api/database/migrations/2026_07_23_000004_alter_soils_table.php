<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('soils', function (Blueprint $table) {
            $table->string('soil_texture', 100)->nullable()->after('name');
            $table->decimal('organic_matter', 5, 2)->nullable()->after('soil_texture');
            $table->string('fertility', 50)->nullable()->after('organic_matter');
            $table->decimal('salinity', 5, 2)->nullable()->after('fertility');
            $table->decimal('ph_min', 4, 2)->nullable()->after('salinity');
            $table->decimal('ph_max', 4, 2)->nullable()->after('ph_min');
            $table->string('recommended_crops', 500)->nullable()->after('ph_max');
            $table->text('notes')->nullable()->after('recommended_crops');
        });
    }

    public function down(): void
    {
        Schema::table('soils', function (Blueprint $table) {
            $table->dropColumn([
                'soil_texture', 'organic_matter', 'fertility', 'salinity',
                'ph_min', 'ph_max', 'recommended_crops', 'notes',
            ]);
        });
    }
};
