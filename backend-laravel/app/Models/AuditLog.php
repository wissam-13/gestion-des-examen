<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    protected $fillable = [
        'entity',
        'entity_id',
        'action',
        'Performed_by_admin',
        'Performed_by_planer',
        'performed_at',
        'details'
    ];
}
