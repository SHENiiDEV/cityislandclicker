<?php

namespace Database\Seeders;

use App\Models\Upgrade;
use Illuminate\Database\Seeder;

class UpgradeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $upgrades = [
            // Click Upgrades (Tools & Boosts)
            [
                'key' => 'wooden_shovel',
                'name' => 'Wooden Shovel',
                'description' => 'Simple coastal tool for collecting sea shells and shoreline gold.',
                'category' => 'click',
                'base_cost' => 15,
                'cost_multiplier' => 1.15,
                'base_power' => 1,
                'icon' => 'Hammer',
                'tier' => 1,
                'order' => 1,
            ],
            [
                'key' => 'golden_trowel',
                'name' => 'Master Trowel',
                'description' => 'Crafted masonry tool for building sturdy beachfront pavements.',
                'category' => 'click',
                'base_cost' => 120,
                'cost_multiplier' => 1.18,
                'base_power' => 4,
                'icon' => 'Sparkles',
                'tier' => 1,
                'order' => 2,
            ],
            [
                'key' => 'electric_jackhammer',
                'name' => 'Electric Jackhammer',
                'description' => 'High-impact power drill to crack open gold-bearing reef deposits.',
                'category' => 'click',
                'base_cost' => 1100,
                'cost_multiplier' => 1.20,
                'base_power' => 18,
                'icon' => 'Zap',
                'tier' => 2,
                'order' => 3,
            ],
            [
                'key' => 'excavator_prime',
                'name' => 'Excavator Prime',
                'description' => 'Heavy earthmover turning island sand into mountains of gold.',
                'category' => 'click',
                'base_cost' => 12000,
                'cost_multiplier' => 1.22,
                'base_power' => 85,
                'icon' => 'Truck',
                'tier' => 2,
                'order' => 4,
            ],
            [
                'key' => 'quantum_disruptor',
                'name' => 'Quantum Extractor',
                'description' => 'Nanotechnology synthesizing riches directly from maritime breezes.',
                'category' => 'click',
                'base_cost' => 150000,
                'cost_multiplier' => 1.25,
                'base_power' => 450,
                'icon' => 'Atom',
                'tier' => 3,
                'order' => 5,
            ],

            // Passive Upgrades (Buildings & City Infrastructure)
            [
                'key' => 'island_scout',
                'name' => 'Island Scout',
                'description' => 'Friendly beachcombers foraging forgotten coins left by tourists.',
                'category' => 'passive',
                'base_cost' => 50,
                'cost_multiplier' => 1.15,
                'base_power' => 1,
                'icon' => 'Compass',
                'tier' => 1,
                'order' => 6,
            ],
            [
                'key' => 'lumberjack_camp',
                'name' => 'Lumberjack Camp',
                'description' => 'Harvests tropical timber for the construction of new districts.',
                'category' => 'passive',
                'base_cost' => 280,
                'cost_multiplier' => 1.15,
                'base_power' => 5,
                'icon' => 'Trees',
                'tier' => 1,
                'order' => 7,
            ],
            [
                'key' => 'fishing_dock',
                'name' => 'Fisherman\'s Harbor',
                'description' => 'Fresh seafood trade and deep-sea pearls filling the city treasury.',
                'category' => 'passive',
                'base_cost' => 1200,
                'cost_multiplier' => 1.16,
                'base_power' => 22,
                'icon' => 'Anchor',
                'tier' => 1,
                'order' => 8,
            ],
            [
                'key' => 'wind_turbine',
                'name' => 'Breeze Wind Farm',
                'description' => 'Clean oceanic energy powering the metropolis 24 hours a day.',
                'category' => 'passive',
                'base_cost' => 6500,
                'cost_multiplier' => 1.16,
                'base_power' => 90,
                'icon' => 'Wind',
                'tier' => 2,
                'order' => 9,
            ],
            [
                'key' => 'tourist_hotel',
                'name' => 'Grand Lagoon Resort',
                'description' => '5-star luxury beachfront suites with rooftop infinity pools.',
                'category' => 'passive',
                'base_cost' => 35000,
                'cost_multiplier' => 1.17,
                'base_power' => 380,
                'icon' => 'Hotel',
                'tier' => 2,
                'order' => 10,
            ],
            [
                'key' => 'island_bank',
                'name' => 'Archipelago Central Bank',
                'description' => 'Commercial investments generating an unstoppable torrent of coins.',
                'category' => 'passive',
                'base_cost' => 200000,
                'cost_multiplier' => 1.18,
                'base_power' => 1650,
                'icon' => 'Landmark',
                'tier' => 3,
                'order' => 11,
            ],
            [
                'key' => 'spaceport_orion',
                'name' => 'Orion Spaceport',
                'description' => 'Orbital space tourism and asteroid mining for galactic riches.',
                'category' => 'passive',
                'base_cost' => 1500000,
                'cost_multiplier' => 1.20,
                'base_power' => 8200,
                'icon' => 'Rocket',
                'tier' => 3,
                'order' => 12,
            ],
        ];

        foreach ($upgrades as $data) {
            Upgrade::updateOrCreate(['key' => $data['key']], $data);
        }
    }
}
