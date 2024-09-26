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
        Schema::create('l_events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('description');
            $table->date('end_date');
            $table->date('end_date_np');
            $table->boolean('is_completed');

            $table->decimal('ticket_price')->default(0.00);
            $table->decimal('6_match')->default(0.00);
            $table->decimal('5_match')->default(0.00);
            $table->decimal('4_match')->default(0.00);
            $table->decimal('no_match')->default(0.00);

            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('l_events');
    }
};
