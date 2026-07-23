<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Remove old column first
        Schema::table('crops', function (Blueprint $table) {
            $table->dropColumn('essential_minerals');
        });

        Schema::table('crops', function (Blueprint $table) {
            $table->string('scientific_name', 255)->nullable()->after('name');
            $table->string('category', 100)->nullable()->after('scientific_name');
            $table->decimal('recommended_ph_min', 4, 2)->nullable()->after('category');
            $table->decimal('recommended_ph_max', 4, 2)->nullable()->after('recommended_ph_min');
            $table->string('recommended_water_type', 100)->nullable()->after('recommended_ph_max');
            $table->string('irrigation_frequency', 255)->nullable()->after('recommended_water_type');
            $table->decimal('water_requirement_liters_per_hectare', 10, 2)->nullable()->after('irrigation_frequency');
            $table->integer('growth_period_days')->nullable()->after('water_requirement_liters_per_hectare');
            $table->decimal('temperature_min', 5, 2)->nullable()->after('growth_period_days');
            $table->decimal('temperature_max', 5, 2)->nullable()->after('temperature_min');
            $table->decimal('humidity_min', 5, 2)->nullable()->after('temperature_max');
            $table->decimal('humidity_max', 5, 2)->nullable()->after('humidity_min');
            $table->decimal('wind_min', 5, 2)->nullable()->after('humidity_max');
            $table->decimal('wind_max', 5, 2)->nullable()->after('wind_min');
            $table->text('notes')->nullable()->after('recommended_device');
        });
    }

    public function down(): void
    {
        Schema::table('crops', function (Blueprint $table) {
            $table->dropColumn([
                'scientific_name', 'category', 'recommended_ph_min', 'recommended_ph_max',
                'recommended_water_type', 'irrigation_frequency', 'water_requirement_liters_per_hectare',
                'growth_period_days', 'temperature_min', 'temperature_max',
                'humidity_min', 'humidity_max', 'wind_min', 'wind_max', 'notes',
            ]);
        });

        Schema::table('crops', function (Blueprint $table) {
            $table->string('essential_minerals', 500)->nullable()->after('recommended_ph');
        });
    }
};
