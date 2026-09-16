<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SyncLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'ip_address',
        'cps',
        'earned_clicks',
        'earned_passive',
        'is_flagged',
        'flag_reason',
    ];

    protected $casts = [
        'cps' => 'double',
        'earned_clicks' => 'double',
        'earned_passive' => 'double',
        'is_flagged' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
