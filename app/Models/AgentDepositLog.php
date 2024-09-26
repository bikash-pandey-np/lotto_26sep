<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Models\Agent;

class AgentDepositLog extends Model
{
    use HasFactory;
    protected $fillable = [
        'amount',
        'identifier',
        'type',
        'transfered_from',
        'transfered_to',
        'datetime',
    ];
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($agent) {
            $agent->identifier = self::generateUniqueAgentCode();
        });
    }

    private static function generateUniqueAgentCode()
    {
        do {
            // Generate a random number
            $randomNumber = rand(1000000000, 9999999999);
            // Format the agent code
            $agentCode = $randomNumber;
        } while (self::where('identifier', $agentCode)->exists());

        return $agentCode;
    }

    public function transferedFrom()
    {
        return $this->belongsTo(Agent::class, 'transfered_from');
    }

    public function transferedTo()
    {
        return $this->belongsTo(Agent::class, 'transfered_to');
    }
}
