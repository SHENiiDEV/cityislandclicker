import React from 'react';
import { cn } from '../../lib/cn';

const TONES = {
    sky: 'bg-sky-100 text-sky-700 border-sky-200',
    gold: 'bg-amber-100 text-amber-800 border-amber-200',
    grass: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    violet: 'bg-purple-100 text-purple-700 border-purple-200',
    slate: 'bg-slate-100 text-slate-600 border-slate-200',
    solidGold:
        'bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 border-white shadow-sm',
};

export default function Badge({ tone = 'sky', className, children, ...props }) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-wider',
                TONES[tone] ?? TONES.sky,
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}
