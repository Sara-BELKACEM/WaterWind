<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('minerals', function (Blueprint $table) {
            $table->text('benefit')->nullable()->after('importance');
        });

        Schema::table('crop_mineral', function (Blueprint $table) {
            $table->text('reason')->nullable()->after('priority');
        });
    }

    public function down(): void
    {
        Schema::table('minerals', function (Blueprint $table) {
            $table->dropColumn('benefit');
        });

        Schema::table('crop_mineral', function (Blueprint $table) {
            $table->dropColumn('reason');
        });
    }
};
