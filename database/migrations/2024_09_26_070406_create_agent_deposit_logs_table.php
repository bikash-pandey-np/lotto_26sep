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
        Schema::create('agent_deposit_logs', function (Blueprint $table) {
            $table->id();
            $table->string('amount');
            $table->string('identifier')->unique();
            $table->string('type')->default('agent')
                ->comment('masteragent');
            $table->unsignedBigInteger('transfered_from')->nullable();
            $table->unsignedBigInteger('transfered_to')->nullable();
            $table->timestamp('datetime');
            $table->foreign('transfered_from')->references('id')->on('agents');
            $table->foreign('transfered_to')->references('id')->on('agents');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agent_deposit_logs');
    }
};
