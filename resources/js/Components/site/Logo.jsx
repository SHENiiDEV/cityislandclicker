import React from 'react';
import { cn } from '../../lib/cn';

/** Wordmark used in the landing header, the game top bar and the auth pages. */
export default function Logo({ compact = false, className }) {
    return (
        <span className={cn('group flex items-center gap-2.5', className)}>
            <span
                className={cn(
                    'flex items-center justify-center rounded-2xl border-2 border-amber-500 bg-gradient-to-tr from-amber-400 to-yellow-300 shadow-md transition-transform group-hover:scale-105',
                    compact ? 'h-9 w-9 text-lg' : 'h-11 w-11 text-xl'
                )}
                aria-hidden="true"
            >
                🏝️
            </span>
            <span
                className={cn(
                    'font-fun font-black tracking-tight text-slate-900',
                    compact ? 'hidden text-lg md:inline' : 'text-xl sm:text-2xl'
                )}
            >
                City Island <span className="text-amber-500">Clicker</span>
            </span>
        </span>
    );
}
