<?php

namespace App\Services;

class NewsService
{
    /**
     * @return array<int, array<string, mixed>>
     */
    public static function all(): array
    {
        return [
            [
                'id' => 1,
                'slug' => 'patch-1-2-orion-spaceport-launch',
                'title' => 'Patch 1.2: Orion Spaceport Launch & Interstellar Boosters',
                'category' => 'Patch Notes',
                'category_tone' => 'amber',
                'author' => 'Lead Game Architect',
                'read_time' => '4 min read',
                'published_at' => 'September 15, 2026',
                'summary' => 'Unlock the ultimate Tier 7 infrastructure! Deploy orbital satellites, boost all island multipliers by +250%, and enjoy 60 FPS performance optimizations.',
                'image_gradient' => 'from-indigo-600 via-purple-600 to-amber-500',
                'icon' => '🚀',
                'content' => <<<'MARKDOWN'
### Welcome to City Island v1.2

We are thrilled to announce the rollout of **Patch 1.2**, bringing our biggest endgame upgrade yet: **The Orion Spaceport**.

#### 🌌 Key Highlights & New Content

* **Tier 7 Milestone — Orion Spaceport**: Reaching 900+ island milestones unlocks the launchpad. Rockets boost overall district revenue by a staggering **+250% base multiplier**.
* **Enhanced Offline Rate Calculation**: Our server synchronization now evaluates offline progression with millisecond accuracy, ensuring you never lose a single coin while away from your browser.
* **Instant Batch Syncing**: We optimized the `POST /api/game/sync` engine to handle burst taps with sub-15ms server latency.
* **Sound Synthesizer Refresh**: Enjoy new synthesized audio cues for jackpot clicks, level-ups, and bank dividend collections.

#### 🛠️ Balancing Adjustments

1. **Central Bank**: Passive yield increased from 1,200/s to 1,500/s.
2. **Tourist Hotel**: Base cost adjusted by -10% to smooth mid-game progression.
3. **Fishing Docks**: Multipliers now scale by +15% per consecutive level.

Log in today, upgrade your launchpad, and conquer the stars!
MARKDOWN
            ],
            [
                'id' => 2,
                'slug' => 'mayors-masterclass-maximizing-passive-income',
                'title' => 'Mayor’s Masterclass: Maximize 24/7 Passive Income & Synergy Multipliers',
                'category' => 'Strategy Guide',
                'category_tone' => 'emerald',
                'author' => 'Community Strategist',
                'read_time' => '6 min read',
                'published_at' => 'September 12, 2026',
                'summary' => 'Learn the optimal upgrade priority order, bank interest compounding, and how to harvest millions in gold while offline.',
                'image_gradient' => 'from-emerald-600 via-teal-600 to-sky-500',
                'icon' => '📈',
                'content' => <<<'MARKDOWN'
### How to Become a Billionaire Mayor

In City Island Clicker, the secret to reaching the top of the global leaderboards lies in balancing **Active Tap Power** with **Passive Automated Revenue**.

#### 1. The Early Game: Scout Rush (0 - 1,000 Coins)
During your first 5 minutes:
* Focus 70% of your earnings on **Island Scouts** and **Fisherman's Harbours**.
* Keep your tap combo meter at **3x MAX** to trigger the coin rain bonus.

#### 2. The Mid Game: Green Energy & Tourism (1,000 - 50,000 Coins)
* Prioritize **Wind Farms** and **Grand Resorts**.
* Once your Grand Resort hits Level 5, it unlocks the **Tourist Boom** passive perk, increasing all district yields by +35%.

#### 3. The Endgame: Bank Compounding (50,000+ Coins)
* Invest heavily into the **Central Bank**. 
* The Central Bank calculates compound interest on your offline storage pool, allowing you to wake up to massive treasure chests every morning!
MARKDOWN
            ],
            [
                'id' => 3,
                'slug' => 'fair-play-security-anti-cheat-deep-dive',
                'title' => 'Fair Play & Anti-Cheat: How Our Engine Protects Island Economies',
                'category' => 'Dev Insights',
                'category_tone' => 'sky',
                'author' => 'Security & Anti-Fraud Team',
                'read_time' => '5 min read',
                'published_at' => 'September 08, 2026',
                'summary' => 'An inside look at our real-time verification algorithms, 18 CPS physical limits, and zero-tolerance bot mitigation.',
                'image_gradient' => 'from-sky-600 via-blue-600 to-indigo-700',
                'icon' => '🛡️',
                'content' => <<<'MARKDOWN'
### Protecting the Integrity of the Leaderboard

A thriving competitive idle game requires total trust. Here is how our backend engine maintains strict fair play:

#### ⚡ Real-Time Timestamp Synchronization
Every click batch sent to `POST /api/game/sync` is cryptographically validated against:
* Time elapsed since the previous sync payload.
* Physical maximum human click thresholds (strictly enforced at **18 Clicks Per Second**).
* Server-side rate validation preventing memory tampering.

#### 🚫 Automated Bot & Macro Mitigation
If an automated client sends synthetic clicks exceeding human cadence, the batch is automatically clamped and flagged in our `sync_logs` telemetry table. This guarantees that genuine player dedication is always rewarded fairly.
MARKDOWN
            ],
            [
                'id' => 4,
                'slug' => 'community-spotlight-top-5-tropical-metropolises',
                'title' => 'Community Island Spotlight: Top 5 Tropical Metropolises of the Month',
                'category' => 'Community',
                'category_tone' => 'rose',
                'author' => 'Community Manager',
                'read_time' => '3 min read',
                'published_at' => 'September 03, 2026',
                'summary' => 'Check out the most aesthetic island builds submitted by our community mayors during the late summer builder challenge.',
                'image_gradient' => 'from-rose-500 via-pink-600 to-amber-400',
                'icon' => '🏝️',
                'content' => <<<'MARKDOWN'
### Celebrating Our Community Mayors

Every month, the City Island team reviews player skylines and showcases the most creative, high-efficiency tropical archipelagos!

#### 🏆 August Winners

* **Mayor Alex (Level 42)**: Built a symmetrical energy paradise with 12 interconnected Wind Farms and zero carbon footprint.
* **Mayor Elena (Level 55)**: Created the "Golden Riviera", generating over 4.2 million gold per hour strictly through coastal resorts.
* **Mayor Marcus (Level 60)**: First player on server #1 to fully fund the Orion Spaceport purely with offline bank dividends!

Want your island featured in the next spotlight? Share your screenshots and tag **#CityIslandClicker**!
MARKDOWN
            ],
        ];
    }

    /**
     * @return array<string, mixed>|null
     */
    public static function findBySlug(string $slug): ?array
    {
        $all = self::all();
        foreach ($all as $article) {
            if ($article['slug'] === $slug) {
                return $article;
            }
        }

        return null;
    }
}
