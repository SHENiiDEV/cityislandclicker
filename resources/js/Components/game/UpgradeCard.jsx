import React from 'react';
import { Coins, TrendingUp } from 'lucide-react';
import { formatNumber } from '../../lib/format';
import { cn } from '../../lib/cn';
import IconTile from '../ui/IconTile';
import ProgressBar from '../ui/ProgressBar';
import { iconFor } from './upgradeIcons';

export default function UpgradeCard({ upgrade, coins, count, price, onBuy }) {
    const Icon = iconFor(upgrade.icon);
    const isClick = upgrade.category === 'click';
    const affordable = count > 0 && coins >= price;
    const progress = price > 0 ? (coins / price) * 100 : 0;

    return (
        <div
            className={cn(
                'group relative flex items-center justify-between gap-3 rounded-2xl border-2 p-3.5 transition-all',
                affordable
                    ? 'border-sky-100 bg-white shadow-sm hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md'
                    : 'border-slate-100 bg-slate-50/70'
            )}
        >
            <div className="flex min-w-0 items-center gap-3">
                <IconTile tone={isClick ? 'gold' : 'grass'}>
                    <Icon className="h-6 w-6" />
                </IconTile>

                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <h4 className="truncate text-sm font-black text-slate-800 sm:text-base">
                            {upgrade.name}
                        </h4>
                        <span
                            className={cn(
                                'shrink-0 rounded-full px-2 py-0.5 text-[11px] font-black tabular',
                                upgrade.level > 0 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'
                            )}
                        >
                            {upgrade.level}
                        </span>
                    </div>

                    <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{upgrade.description}</p>

                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span
                            className={cn(
                                'flex items-center gap-1 text-xs font-bold',
                                isClick ? 'text-amber-600' : 'text-emerald-600'
                            )}
                        >
                            <TrendingUp className="h-3.5 w-3.5" />
                            +{formatNumber(upgrade.base_power)} {isClick ? '/tap' : '/sec'}
                        </span>
                        {upgrade.level > 0 && (
                            <span className="text-xs text-slate-400">
                                total +{formatNumber(upgrade.current_total_power)}
                            </span>
                        )}
                    </div>

                    {!affordable && (
                        <ProgressBar
                            value={progress}
                            tone={isClick ? 'gold' : 'grass'}
                            label={`Progress towards ${upgrade.name}`}
                            className="mt-2 max-w-[220px]"
                        />
                    )}
                </div>
            </div>

            <button
                type="button"
                disabled={!affordable}
                onClick={() => onBuy(upgrade.key)}
                aria-label={`Buy ${count || 1} level of ${upgrade.name} for ${formatNumber(price)} coins`}
                className={cn(
                    'btn-3d flex shrink-0 flex-col items-center justify-center gap-0.5 rounded-xl px-3.5 py-2.5 text-xs font-black sm:text-sm',
                    affordable
                        ? isClick
                            ? 'btn-3d-amber text-amber-950'
                            : 'btn-3d-green text-emerald-950'
                        : 'btn-3d-muted text-slate-400'
                )}
            >
                <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-85">
                    Buy{count > 1 ? ` ×${count}` : ''}
                </span>
                <span className="flex items-center gap-1 tabular">
                    <Coins className="h-3.5 w-3.5 fill-current" />
                    {formatNumber(price)}
                </span>
            </button>
        </div>
    );
}
