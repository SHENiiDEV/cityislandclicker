import React from 'react';
import { Coins, MousePointerClick, TrendingUp, Zap } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { formatNumber } from '../../lib/format';

const CELL = 'flex flex-col items-center rounded-2xl border-2 px-2 py-2.5 text-center';

/** Compact read-out of the numbers that drive every decision in the game. */
export default function StatStrip() {
    const tapPower = useGameStore((state) => state.tapPower);
    const passiveRate = useGameStore((state) => state.passiveRate);
    const totalClicks = useGameStore((state) => state.totalClicks);
    const sessionEarned = useGameStore((state) => state.sessionEarned);

    const items = [
        { Icon: Zap, label: 'Per tap', value: formatNumber(tapPower), tone: 'border-amber-200 bg-amber-50 text-amber-700' },
        { Icon: TrendingUp, label: 'Per second', value: formatNumber(passiveRate), tone: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
        { Icon: MousePointerClick, label: 'Total taps', value: formatNumber(totalClicks), tone: 'border-sky-200 bg-sky-50 text-sky-700' },
        { Icon: Coins, label: 'This session', value: formatNumber(sessionEarned), tone: 'border-purple-200 bg-purple-50 text-purple-700' },
    ];

    return (
        <div className="grid w-full max-w-xl grid-cols-2 gap-2 sm:grid-cols-4">
            {items.map(({ Icon, label, value, tone }) => (
                <div key={label} className={`${CELL} ${tone}`}>
                    <Icon className="mb-1 h-4 w-4" />
                    <span className="text-base font-black leading-none text-slate-900 tabular">{value}</span>
                    <span className="mt-1 text-[10px] font-extrabold uppercase tracking-wider opacity-80">
                        {label}
                    </span>
                </div>
            ))}
        </div>
    );
}
