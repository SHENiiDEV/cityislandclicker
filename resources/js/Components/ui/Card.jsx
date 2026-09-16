import React from 'react';
import { cn } from '../../lib/cn';

const TONES = {
    plain: 'surface-solid',
    glass: 'surface',
    sky: 'bg-gradient-to-b from-sky-50 to-white border-2 border-sky-100 shadow-[var(--shadow-card)]',
    grass: 'bg-gradient-to-b from-emerald-50 to-white border-2 border-emerald-100 shadow-[var(--shadow-card)]',
    gold: 'bg-gradient-to-b from-amber-50 to-white border-2 border-amber-100 shadow-[var(--shadow-card)]',
    violet: 'bg-gradient-to-b from-purple-50 to-white border-2 border-purple-100 shadow-[var(--shadow-card)]',
};

export default function Card({ tone = 'plain', interactive = false, className, children, ...props }) {
    return (
        <div
            className={cn(
                'rounded-3xl',
                TONES[tone] ?? TONES.plain,
                interactive &&
                    'transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
