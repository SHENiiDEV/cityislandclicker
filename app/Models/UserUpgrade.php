<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserUpgrade extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'upgrade_id',
        'level',
    ];

    protected $casts = [
        'level' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function upgrade(): BelongsTo
    {
        return $this->belongsTo(Upgrade::class);
    }

    /**
     * Total power output for current level
     */
    public function getTotalPowerAttribute(): float
    {
        return $this->level * ($this->upgrade ? $this->upgrade->base_power : 0);
    }
}
