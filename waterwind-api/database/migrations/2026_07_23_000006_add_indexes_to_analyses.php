<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('analyses', function (Blueprint $table) {
            $table->index('score');
            $table->index('status');
            $table->index('recommended_device');
            $table->index('created_at');
            $table->index('user_id');
        });

        Schema::table('crops', function (Blueprint $table) {
            $table->index('category');
            $table->index('recommended_device');
        });

        Schema::table('soils', function (Blueprint $table) {
            $table->index('fertility');
            $table->index('soil_texture');
        });
    }

    public function down(): void
    {
        Schema::table('analyses', function (Blueprint $table) {
            $table->dropIndex(['score']);
            $table->dropIndex(['status']);
            $table->dropIndex(['recommended_device']);
            $table->dropIndex(['created_at']);
            $table->dropIndex(['user_id']);
        });

        Schema::table('crops', function (Blueprint $table) {
            $table->dropIndex(['category']);
            $table->dropIndex(['recommended_device']);
        });

        Schema::table('soils', function (Blueprint $table) {
            $table->dropIndex(['fertility']);
            $table->dropIndex(['soil_texture']);
        });
    }
};
