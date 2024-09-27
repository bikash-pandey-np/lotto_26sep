<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EarningLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'agent_id',
        'amount',
        'remarks',
    ];
}
