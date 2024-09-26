<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'slug', 'description', 'end_date', 'end_date_np', 'is_completed',
        'ticket_price', '6_match', '5_match', '4_match', 'no_match'
    ];
}
