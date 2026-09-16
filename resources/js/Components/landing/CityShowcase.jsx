import React from 'react';
import { Coins, TrendingUp } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import IconTile from '../ui/IconTile';
import SectionHeading from '../ui/SectionHeading';
import { iconFor } from '../game/upgradeIcons';
import { formatNumber } from '../../lib/format';

/** Mirrors the tiers seeded in database/seeders/UpgradeSeeder.php. */
const DISTRICTS = [
    { icon: 'Compass', name: 'Island scouts', tier: 1, income: 1, cost: 50, blurb: 'Beachcombers picking up coins tourists leave behind.' },
    { icon: 'Trees', name: 'Lumberjack camp', tier: 1, income: 5, cost: 280, blurb: 'Tropical timber for every new district you plan.' },
    { icon: 'Anchor', name: "Fisherman's harbour", tier: 1, income: 22, cost: 1200, blurb: 'Seafood trade and deep-sea pearls for the treasury.' },
    { icon: 'Wind', name: 'Breeze wind farm', tier: 2, income: 90, cost: 6500, blurb: 'Clean ocean energy that never clocks off.' },
    { icon: 'Hotel', name: 'Grand lagoon resort', tier: 2, income: 380, cost: 35000, blurb: 'Five-star suites with rooftop infinity pools.' },
    { icon: 'Landmark', name: 'Archipelago bank', tier: 3, income: 1650, cost: 200000, blurb: 'Investments that turn coins into a torrent.' },
    { icon: 'Rocket', name: 'Orion spaceport', tier: 3, income: 8200, cost: 1500000, blurb: 'Orbital tourism and asteroid mining. Yes, really.' },
];

const TIER_TONE = { 1: 'grass', 2: 'sky', 3: 'violet' };

export default function CityShowcase() {
    return (
        <section
            id="city"
            className="scroll-mt-24 border-y-2 border-sky-100 bg-white/70 px-4 py-16 backdrop-blur-md sm:px-6 md:py-24"
        >
            <div className="mx-auto max-w-7xl">
                <SectionHeading
                    eyebrow="Your city"
                    eyebrowTone="violet"
                    title="Every district you unlock shows up on the island"
                    description="Buildings are not just a line in a menu — buy one and it is drawn into your skyline immediately."
                    className="mb-14"
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {DISTRICTS.map((district) => {
                        const Icon = iconFor(district.icon);
                        const tone = TIER_TONE[district.tier];

                        return (
                            <Card key={district.name} interactive className="flex items-start gap-4 p-5">
                                <IconTile tone={tone} size="lg">
                                    <Icon className="h-6 w-6" />
                                </IconTile>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="truncate text-sm font-black text-slate-900">
                                            {district.name}
                                        </h3>
                                        <Badge tone={tone} className="shrink-0 px-2 py-0.5 text-[10px]">
                                            Tier {district.tier}
                                        </Badge>
                                    </div>

                                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{district.blurb}</p>

                                    <div className="mt-2.5 flex items-center gap-3 text-xs font-bold">
                                        <span className="flex items-center gap-1 text-emerald-600">
                                            <TrendingUp className="h-3.5 w-3.5" />+{formatNumber(district.income)}/sec
                                        </span>
                                        <span className="flex items-center gap-1 text-amber-600">
                                            <Coins className="h-3.5 w-3.5 fill-amber-400" />
                                            {formatNumber(district.cost)}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
