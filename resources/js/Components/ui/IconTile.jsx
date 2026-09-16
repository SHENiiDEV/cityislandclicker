import React from 'react';
import { cn } from '../../lib/cn';

const TONES = {
    sky: 'bg-sky-50 text-sky-600 border-sky-200',
    gold: 'bg-amber-50 text-amber-600 border-amber-200',
    grass: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    violet: 'bg-purple-50 text-purple-600 border-purple-200',
    gem: 'bg-cyan-50 text-cyan-600 border-cyan-200',
};

const SIZES = {
    sm: 'w-9 h-9 rounded-xl',
    md: 'w-12 h-12 rounded-2xl',
    lg: 'w-14 h-14 rounded-2xl',
};

export default function IconTile({ tone = 'sky', size = 'md', className, children }) {
    return (
        <div
            className={cn(
                'flex shrink-0 items-center justify-center border-2',
                TONES[tone] ?? TONES.sky,
                SIZES[size] ?? SIZES.md,
                className
            )}
        >
            {children}
        </div>
    );
}
