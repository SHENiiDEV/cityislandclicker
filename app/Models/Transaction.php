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

    public function getTransactionIdAttribute(): string
    {
        return $this->order_id ?? ('TXN-'.str_pad($this->id, 8, '0', STR_PAD_LEFT));
    }

    public function getPackageNameAttribute(): string
    {
        return $this->payload['package_name'] ?? ($this->package_key ?? 'Virtual Island Top-Up');
    }

    public function getGemsCreditedAttribute(): int
    {
        return $this->gems_reward ?? 0;
    }

    public function getAmountCentsAttribute(): int
    {
        return (int) round(((float) $this->amount_fiat) * 100);
    }
}
