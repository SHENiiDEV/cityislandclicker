import React, { forwardRef } from 'react';
import { cn } from '../../lib/cn';

const VARIANTS = {
    amber: 'btn-3d btn-3d-amber text-amber-950',
    green: 'btn-3d btn-3d-green text-emerald-950',
    blue: 'btn-3d btn-3d-blue text-white',
    purple: 'btn-3d btn-3d-purple text-white',
    slate: 'btn-3d btn-3d-slate text-slate-800',
    outline:
        'bg-white/85 hover:bg-white text-slate-700 border-2 border-slate-200 hover:border-sky-300 shadow-sm transition-colors',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-white/70 transition-colors',
    glass:
        'bg-white/20 hover:bg-white/30 text-white border border-white/35 backdrop-blur-sm transition-colors',
};

const SIZES = {
    xs: 'h-8 px-3 text-xs rounded-xl gap-1.5',
    sm: 'h-10 px-4 text-sm rounded-xl gap-2',
    md: 'h-12 px-5 text-sm rounded-2xl gap-2',
    lg: 'h-14 px-7 text-base rounded-2xl gap-2.5',
    xl: 'h-16 px-9 text-lg rounded-2xl gap-3',
    icon: 'h-10 w-10 rounded-xl',
};

/**
 * The single button used everywhere: landing, auth, game HUD and modals.
 * `as` lets it render as an Inertia <Link> or a plain anchor without losing styling.
 */
const Button = forwardRef(function Button(
    { as: Component = 'button', variant = 'amber', size = 'md', block = false, className, children, ...props },
    ref
) {
    const isDisabled = props.disabled;

    return (
        <Component
            ref={ref}
            className={cn(
                'inline-flex items-center justify-center font-black tracking-tight select-none whitespace-nowrap',
                SIZES[size] ?? SIZES.md,
                isDisabled ? 'btn-3d btn-3d-muted text-slate-400' : VARIANTS[variant] ?? VARIANTS.amber,
                block && 'w-full',
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
});

export default Button;
