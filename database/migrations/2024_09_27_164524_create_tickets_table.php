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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('ticket_no')->unique();
            $table->foreignId('event_id')->constrained('l_events');
            $table->foreignId('agent_id')->constrained('agents');
            $table->string('fullname');
            $table->string('phone_no');
            $table->foreignId('state_id')->constrained('states');
            $table->foreignId('district_id')->constrained('districts');
            $table->foreignId('local_body_id')->constrained('local_bodies');
            $table->string('ward');
            $table->decimal('amount', 10, 2);
            $table->unsignedTinyInteger('number1');
            $table->unsignedTinyInteger('number2');
            $table->unsignedTinyInteger('number3');
            $table->unsignedTinyInteger('number4');
            $table->unsignedTinyInteger('number5');
            $table->unsignedTinyInteger('number6');
            $table->boolean('is_winner')->default(false);
            $table->boolean('has_expired')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
