<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\LEvent;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        LEvent::create([
            'title' => 'Sample Event 1',
            'slug' => 'sample-event-1',
            'description' => 'This is a description for Sample Event 1.',
            'end_date' => '2024-12-31',
            'end_date_np' => '2024-12-31',
            'is_completed' => false,
            'ticket_price' => 100.00,
            '6_match' => 10.00,
            '5_match' => 5.00,
            '4_match' => 2.00,
            'no_match' => 0.00,
        ]);

        LEvent::create([
            'title' => 'Sample Event 2',
            'slug' => 'sample-event-2',
            'description' => 'This is a description for Sample Event 2.',
            'end_date' => '2025-01-15',
            'end_date_np' => '2025-01-15',
            'is_completed' => false,
            'ticket_price' => 150.00,
            '6_match' => 15.00,
            '5_match' => 7.00,
            '4_match' => 3.00,
            'no_match' => 1.00,
        ]);
    }
}
