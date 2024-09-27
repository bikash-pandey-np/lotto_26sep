<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\LEvent;
class Ticket extends Model
{
    use HasFactory;
    protected $fillable = [
        'event_id',
        'agent_id',
        'ticket_no',
        'fullname',
        'phone_no',
        'state_id',
        'district_id',
        'local_body_id',
        'ward',
        'number1',
        'number2',
        'number3',
        'number4',
        'number5',
        'number6',
        'is_winner',
        'amount',
        'has_expired'
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            do {
                $ticketNo = 'TCK-' . str_pad(mt_rand(0, 999999), 6, '0', STR_PAD_LEFT);
            } while (static::where('ticket_no', $ticketNo)->exists());
            
            $model->ticket_no = $ticketNo;
        });
    }

    public function event()
    {
        return $this->belongsTo(LEvent::class);
    }
}
