import React from 'react';
import { cn } from '../../lib/cn';

const TONES = {
    gold: 'from-yellow-300 via-amber-400 to-orange-500',
    grass: 'from-emerald-300 via-emerald-400 to-emerald-600',
    sky: 'from-sky-300 via-sky-400 to-blue-500',
    fire: 'from-yellow-300 via-orange-400 to-red-500',
};

export default function ProgressBar({ value = 0, tone = 'gold', className, trackClassName, label }) {
    const percent = Math.max(0, Math.min(100, value));

    return (
        <div
            role="progressbar"
            aria-valuenow={Math.round(percent)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={label}
            className={cn('h-1.5 w-full overflow-hidden rounded-full bg-slate-200/70', trackClassName, className)}
        >
            <div
                className={cn('h-full rounded-full bg-gradient-to-r transition-[width] duration-200', TONES[tone] ?? TONES.gold)}
                style={{ width: `${percent}%` }}
            />
        </div>
    );
}
