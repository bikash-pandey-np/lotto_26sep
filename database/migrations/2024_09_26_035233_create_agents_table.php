<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('agents', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->unsignedBigInteger('state_id')->nullable();
            $table->unsignedBigInteger('district_id')->nullable();
            $table->unsignedBigInteger('local_body_id')->nullable();
            $table->string('ward_no')->nullable();
            $table->string('agent_code')->unique();
            $table->string('phone')->unique();
            $table->string('password');
            $table->boolean('is_phoneverified')->default(false);
            $table->boolean('is_masteragent')->default(false);
            $table->boolean('is_profileverified')->default(false);
            $table->decimal('balance', 10, 2)->default(0);
            $table->decimal('total_deposit', 10, 2)->default(0);
            $table->decimal('total_withdraw', 10, 2)->default(0);
            $table->decimal('total_earned', 10, 2)->default(0);
            $table->timestamps();

            $table->foreign('state_id')->references('id')->on('states');
            $table->foreign('district_id')->references('id')->on('districts');
            $table->foreign('local_body_id')->references('id')->on('local_bodies');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agents');
    }
};
