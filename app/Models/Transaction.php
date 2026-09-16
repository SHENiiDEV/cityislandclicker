<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_id',
        'package_key',
        'amount_fiat',
        'currency',
        'gems_reward',
        'status',
        'payment_gateway',
        'payload',
        'paid_at',
    ];

    protected $casts = [
        'amount_fiat' => 'decimal:2',
        'gems_reward' => 'integer',
        'payload' => 'array',
        'paid_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
