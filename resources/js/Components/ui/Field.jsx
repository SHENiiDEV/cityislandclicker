import React, { useId } from 'react';
import { cn } from '../../lib/cn';

const CONTROL =
    'w-full rounded-xl border-2 border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-800 transition-colors placeholder:font-medium placeholder:text-slate-400 focus:border-amber-400 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400';

function Label({ htmlFor, icon, children, required }) {
    return (
        <label htmlFor={htmlFor} className="mb-1 flex items-center gap-1 text-xs font-black text-slate-700">
            {icon}
            {children}
            {required && <span className="text-rose-500">*</span>}
        </label>
    );
}

function Error({ children }) {
    if (!children) return null;
    return <p className="mt-1 text-xs font-bold text-rose-600">{children}</p>;
}

/** Labelled text input with inline validation message. */
export function TextField({ label, icon, error, hint, className, id, ...props }) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;

    return (
        <div className={className}>
            <Label htmlFor={fieldId} icon={icon} required={props.required}>
                {label}
            </Label>
            <input
                id={fieldId}
                aria-invalid={Boolean(error)}
                className={cn(CONTROL, error && 'border-rose-300 focus:border-rose-400')}
                {...props}
            />
            {hint && !error && <p className="mt-1 text-[11px] font-semibold text-slate-400">{hint}</p>}
            <Error>{error}</Error>
        </div>
    );
}

/** Labelled native select — used for the country list. */
export function SelectField({ label, icon, error, options = [], className, id, ...props }) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;

    return (
        <div className={className}>
            <Label htmlFor={fieldId} icon={icon} required={props.required}>
                {label}
            </Label>
            <select
                id={fieldId}
                aria-invalid={Boolean(error)}
                className={cn(CONTROL, error && 'border-rose-300 focus:border-rose-400')}
                {...props}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <Error>{error}</Error>
        </div>
    );
}

/** Checkbox with rich (link-friendly) label content. */
export function CheckboxField({ label, error, className, id, ...props }) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;

    return (
        <div className={className}>
            <div className="flex items-start gap-3">
                <input
                    id={fieldId}
                    type="checkbox"
                    aria-invalid={Boolean(error)}
                    className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded-md border-2 border-slate-300 text-amber-500 focus:ring-amber-400"
                    {...props}
                />
                <label htmlFor={fieldId} className="cursor-pointer text-xs font-medium text-slate-700 sm:text-sm">
                    {label}
                </label>
            </div>
            <Error>{error}</Error>
        </div>
    );
}

export function FormSection({ title, icon, children, className }) {
    return (
        <fieldset className={cn('border-t border-slate-100 pt-5 first:border-t-0 first:pt-0', className)}>
            <legend className="sr-only">{title}</legend>
            <h3 className="mb-3 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400">
                {icon}
                {title}
            </h3>
            {children}
        </fieldset>
    );
}
