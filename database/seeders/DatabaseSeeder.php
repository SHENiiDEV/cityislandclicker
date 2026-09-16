<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UpgradeSeeder::class,
        ]);

        User::firstOrCreate(
            ['email' => 'mayor@cityisland.local'],
            [
                'name' => 'Мэр Острова',
                'password' => Hash::make('password123'),
                'coins' => 100,
                'gems' => 50,
                'last_sync_at' => now(),
                'session_secret' => Str::random(32),
                'cheat_flags' => 0,
                'total_clicks' => 0,
            ]
        );
    }
}
