<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\State;
use App\Models\LocalBody;

class District extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'state_id'
    ];

    public function state()
    {
        return $this->belongsTo(State::class);
    }

    public function localBodies()
    {
        return $this->hasMany(LocalBody::class);
    }
}