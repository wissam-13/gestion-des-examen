<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeacherConstraint extends Model
{
    protected $fillable = [
        'teacher_id',
        'contraint_date',
        'start_time',
        'end_time',
        'reason',
        'is_unavailable'
    ];
}
