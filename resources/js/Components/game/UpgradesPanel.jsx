import React, { useMemo, useState } from 'react';
import { Pickaxe, Trees } from 'lucide-react';
import { useGameStore, affordableLevels, bulkCost } from '../../store/useGameStore';
import { BUY_MULTIPLIERS } from '../../game/config';
import { cn } from '../../lib/cn';
import UpgradeCard from './UpgradeCard';

const TABS = [
    { key: 'passive', label: 'City buildings', Icon: Trees, active: 'bg-emerald-500 text-white' },
    { key: 'click', label: 'Mayor tools', Icon: Pickaxe, active: 'bg-amber-500 text-white' },
];

export default function UpgradesPanel({ className }) {
    const [tab, setTab] = useState('passive');

    const upgrades = useGameStore((state) => state.upgrades);
    const coins = useGameStore((state) => state.coins);
    const buyUpgrade = useGameStore((state) => state.buyUpgrade);
    const buyMultiplier = useGameStore((state) => state.buyMultiplier);
    const setBuyMultiplier = useGameStore((state) => state.setBuyMultiplier);

    const visible = useMemo(
        () => upgrades.filter((upgrade) => upgrade.category === tab),
        [upgrades, tab]
    );

    /** Resolve how many levels the current multiplier actually buys, and what it costs. */
    const priceFor = (upgrade) => {
        const affordable = affordableLevels(upgrade, coins);
        const count =
            buyMultiplier === 'max' ? affordable : Math.min(buyMultiplier, Math.max(affordable, 1));
        const safeCount = Math.max(count, 1);
        return { count: buyMultiplier === 'max' ? affordable : count, price: bulkCost(upgrade, safeCount) };
    };

    return (
        <section
            aria-label="Upgrades"
            className={cn('surface flex flex-col rounded-3xl p-4 sm:p-5', className)}
        >
            <div className="mb-3 flex gap-1.5 rounded-2xl bg-sky-100/70 p-1.5">
                {TABS.map(({ key, label, Icon, active }) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => setTab(key)}
                        aria-pressed={tab === key}
                        className={cn(
                            'flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-black transition-all sm:text-sm',
                            tab === key ? `${active} shadow-md` : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
                        )}
                    >
                        <Icon className="h-4 w-4" />
                        {label}
                    </button>
                ))}
            </div>

            <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Buy amount
                </span>
                <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
                    {BUY_MULTIPLIERS.map((value) => (
                        <button
                            key={String(value)}
                            type="button"
                            onClick={() => setBuyMultiplier(value)}
                            aria-pressed={buyMultiplier === value}
                            className={cn(
                                'min-w-[44px] rounded-lg px-2.5 py-1 text-xs font-black transition-colors',
                                buyMultiplier === value
                                    ? 'bg-slate-900 text-white shadow-sm'
                                    : 'text-slate-500 hover:text-slate-900'
                            )}
                        >
                            {value === 'max' ? 'Max' : `×${value}`}
                        </button>
                    ))}
                </div>
            </div>

            <div className="custom-scrollbar max-h-[520px] space-y-3 overflow-y-auto pr-1.5">
                {visible.map((upgrade) => {
                    const { count, price } = priceFor(upgrade);
                    return (
                        <UpgradeCard
                            key={upgrade.key}
                            upgrade={upgrade}
                            coins={coins}
                            count={count}
                            price={price}
                            onBuy={(key) => buyUpgrade(key, buyMultiplier)}
                        />
                    );
                })}

                {visible.length === 0 && (
                    <p className="py-10 text-center text-sm font-bold text-slate-400">
                        Nothing to build here yet.
                    </p>
                )}
            </div>
        </section>
    );
}
