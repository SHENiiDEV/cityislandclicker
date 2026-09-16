import React from 'react';
import { Building2, Coins, Layers, Users } from 'lucide-react';
import { formatNumber } from '../../lib/format';

/** Social-proof strip sitting between the hero and the gameplay explanation. */
export default function LiveStats({ stats = {} }) {
    const items = [
        { Icon: Users, value: formatNumber(stats.active_mayors ?? 1420), label: 'Mayors online', tone: 'text-emerald-600' },
        { Icon: Coins, value: formatNumber(stats.coins_mined ?? 8450000), label: 'Coins mined today', tone: 'text-amber-600' },
        { Icon: Building2, value: formatNumber(stats.islands_built ?? 380), label: 'Islands built', tone: 'text-sky-600' },
        { Icon: Layers, value: `${stats.upgrades_available ?? 12}+`, label: 'Upgrade tiers', tone: 'text-purple-600' },
    ];

    return (
        <section aria-label="Live game statistics" className="px-4 pb-4 sm:px-6">
            <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-3 rounded-[1.75rem] border-2 border-sky-100 bg-white/75 p-4 shadow-[var(--shadow-card)] backdrop-blur-md sm:grid-cols-4 sm:gap-4 sm:p-5">
                {items.map(({ Icon, value, label, tone }) => (
                    <div key={label} className="flex items-center gap-3">
                        <Icon className={`h-5 w-5 shrink-0 ${tone}`} />
                        <div className="min-w-0">
                            <dt className="truncate text-lg font-black leading-none text-slate-900 tabular">{value}</dt>
                            <dd className="mt-1 truncate text-[11px] font-bold text-slate-500">{label}</dd>
                        </div>
                    </div>
                ))}
            </dl>
        </section>
    );
}
