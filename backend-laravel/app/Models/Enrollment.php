<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    protected $fillable = [
        'user_id',
        'group_id',
        'date_joined'
    ];

    // get the students details
    public function students(){
        return $this->hasMany(User::class,'user_id','id');
    }
}
