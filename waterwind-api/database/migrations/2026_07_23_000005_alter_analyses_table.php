<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('analyses', function (Blueprint $table) {
            $table->decimal('score', 5, 2)->nullable()->after('recommendation_data');
            $table->string('status', 50)->nullable()->after('score');
            $table->json('warnings')->nullable()->after('status');
            $table->json('suggestions')->nullable()->after('warnings');
            $table->json('recommended_minerals')->nullable()->after('suggestions');
            $table->decimal('recommended_daily_water', 10, 2)->nullable()->after('recommended_minerals');
            $table->string('recommended_water_type', 100)->nullable()->after('recommended_daily_water');
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete()->after('crop_id');
        });
    }

    public function down(): void
    {
        Schema::table('analyses', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn([
                'score', 'status', 'warnings', 'suggestions',
                'recommended_minerals', 'recommended_daily_water',
                'recommended_water_type', 'user_id',
            ]);
        });
    }
};
