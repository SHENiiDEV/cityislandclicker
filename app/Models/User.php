<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'surname',
        'email',
        'password',
        'phone',
        'date_of_birth',
        'address_street',
        'address_city',
        'address_country',
        'address_postcode',
        'terms_accepted_at',
        'coins',
        'gems',
        'last_sync_at',
        'session_secret',
        'cheat_flags',
        'total_clicks',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'session_secret',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'date_of_birth' => 'date',
            'terms_accepted_at' => 'datetime',
            'coins' => 'double',
            'gems' => 'integer',
            'last_sync_at' => 'datetime',
            'cheat_flags' => 'integer',
            'total_clicks' => 'integer',
        ];
    }

    public function userUpgrades(): HasMany
    {
        return $this->hasMany(UserUpgrade::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function syncLogs(): HasMany
    {
        return $this->hasMany(SyncLog::class);
    }

    /**
     * Compute current Tap Power (1 base + sum of all click upgrades)
     */
    public function getTapPower(): float
    {
        $clickPower = 1.0;
        $userUpgrades = $this->userUpgrades()->with('upgrade')->get();

        foreach ($userUpgrades as $uu) {
            if ($uu->upgrade && $uu->upgrade->category === 'click') {
                $clickPower += $uu->level * $uu->upgrade->base_power;
            }
        }

        return $clickPower;
    }

    /**
     * Compute current Passive Income per second (sum of all passive upgrades)
     */
    public function getPassiveRate(): float
    {
        $passiveRate = 0.0;
        $userUpgrades = $this->userUpgrades()->with('upgrade')->get();

        foreach ($userUpgrades as $uu) {
            if ($uu->upgrade && $uu->upgrade->category === 'passive') {
                $passiveRate += $uu->level * $uu->upgrade->base_power;
            }
        }

        return $passiveRate;
    }

    /**
     * Ensure session secret exists
     */
    public function ensureSessionSecret(): string
    {
        if (empty($this->session_secret)) {
            $this->session_secret = Str::random(32);
            $this->save();
        }

        return $this->session_secret;
    }
}
