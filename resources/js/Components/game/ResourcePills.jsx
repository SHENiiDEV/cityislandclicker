import React from 'react';
import { Coins, Gem, Plus, TrendingUp } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { formatNumber, formatExact } from '../../lib/format';

/** Coin and gem balances — the most-watched numbers on the screen. */
export default function ResourcePills({ onOpenShop }) {
    const coins = useGameStore((state) => state.coins);
    const gems = useGameStore((state) => state.gems);
    const passiveRate = useGameStore((state) => state.passiveRate);

    return (
        <div className="flex items-center gap-2 sm:gap-3">
            <div
                title={`${formatExact(coins)} coins`}
                className="flex items-center gap-2 rounded-2xl border-2 border-amber-200 bg-amber-50 px-3 py-1.5 shadow-sm"
            >
                <Coins className="h-5 w-5 shrink-0 fill-amber-400 text-amber-600" />
                <div className="leading-tight">
                    <div className="text-sm font-black text-amber-900 tabular sm:text-base">
                        {formatNumber(coins)}
                    </div>
                    <div className="flex items-center gap-0.5 text-[10px] font-extrabold leading-none text-amber-700">
                        <TrendingUp className="h-2.5 w-2.5" />
                        +{formatNumber(passiveRate)}/s
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border-2 border-cyan-200 bg-cyan-50 py-1.5 pl-3 pr-1.5 shadow-sm">
                <Gem className="h-5 w-5 shrink-0 fill-cyan-300 text-cyan-600" />
                <span className="text-sm font-black text-cyan-900 tabular sm:text-base">
                    {formatNumber(gems)}
                </span>
                <button
                    type="button"
                    onClick={onOpenShop}
                    aria-label="Buy more gems"
                    className="ml-0.5 flex h-6 w-6 items-center justify-center rounded-lg bg-cyan-500 text-white shadow-sm transition-transform hover:bg-cyan-600 active:scale-95"
                >
                    <Plus className="h-3.5 w-3.5 stroke-[3]" />
                </button>
            </div>
        </div>
    );
}
