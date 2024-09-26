<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\District;
use App\Models\LocalBody;

class State extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function districts()
    {
        return $this->hasMany(District::class);
    }

    public function localBodies()
    {
        return $this->hasMany(LocalBody::class);
    }
}