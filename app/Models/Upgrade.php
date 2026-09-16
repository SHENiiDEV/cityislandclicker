<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Upgrade extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'name',
        'description',
        'category',
        'base_cost',
        'cost_multiplier',
        'base_power',
        'icon',
        'tier',
        'order',
    ];

    protected $casts = [
        'base_cost' => 'double',
        'cost_multiplier' => 'double',
        'base_power' => 'double',
        'tier' => 'integer',
        'order' => 'integer',
    ];

    /**
     * Calculate cost for the given level.
     * Level 0 -> base_cost
     * Level 1 -> round(base_cost * multiplier^1)
     */
    public function getCostForLevel(int $level): float
    {
        return round($this->base_cost * pow($this->cost_multiplier, $level));
    }

    public function userUpgrades(): HasMany
    {
        return $this->hasMany(UserUpgrade::class);
    }
}
