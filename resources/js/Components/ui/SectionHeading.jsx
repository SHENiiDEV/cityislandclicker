import React from 'react';
import Badge from './Badge';
import { cn } from '../../lib/cn';

export default function SectionHeading({ eyebrow, eyebrowTone = 'sky', title, description, align = 'center', className }) {
    const centered = align === 'center';

    return (
        <div
            className={cn(
                'max-w-3xl space-y-3',
                centered ? 'mx-auto text-center' : 'text-left',
                className
            )}
        >
            {eyebrow && <Badge tone={eyebrowTone}>{eyebrow}</Badge>}

            <h2 className="font-fun text-balance text-3xl font-black text-slate-900 sm:text-4xl">{title}</h2>

            {description && (
                <p className="text-pretty text-base font-medium leading-relaxed text-slate-600">{description}</p>
            )}
        </div>
    );
}
