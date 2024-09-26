<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Str;

class Agent extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'name',
        'state_id',
        'district_id',
        'local_body_id',
        'ward_no',
        'agent_code',
        'phone',
        'password',
        'is_phoneverified',
        'is_masteragent',
        'is_profileverified',
        'balance',
        'total_deposit',
        'total_withdraw',
        'total_earned',
    ];
    protected $hidden = [
        'password',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($agent) {
            $agent->agent_code = self::generateUniqueAgentCode();
        });
    }

    private static function generateUniqueAgentCode()
    {
        do {
            // Generate a random number
            $randomNumber = rand(100000, 999999);
            // Format the agent code
            $agentCode = 'AGNT-' . $randomNumber;
        } while (self::where('agent_code', $agentCode)->exists());

        return $agentCode;
    }
}
