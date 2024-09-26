<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\District;
use App\Models\State;

class LocalBody extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'state_id', 'district_id', 'ward_count'
    ];

    public function state(){
        return $this->belongsTo(State::class);
    }

    public function district() {
        return $this->belongsTo(District::class);
        
    }
}