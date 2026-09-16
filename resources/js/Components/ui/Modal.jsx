import React, { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';

const FOCUSABLE =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Accessible modal shell: portal, backdrop, Escape to close, focus trap,
 * body scroll lock and a consistent island-styled frame.
 */
export default function Modal({
    open,
    onClose,
    title,
    description,
    icon = null,
    size = 'md',
    dismissable = true,
    children,
    className,
}) {
    const panelRef = useRef(null);
    const previouslyFocused = useRef(null);

    const handleKeyDown = useCallback(
        (event) => {
            if (event.key === 'Escape' && dismissable) {
                event.stopPropagation();
                onClose?.();
                return;
            }

            if (event.key !== 'Tab' || !panelRef.current) return;

            const nodes = Array.from(panelRef.current.querySelectorAll(FOCUSABLE)).filter(
                (node) => node.offsetParent !== null
            );
            if (nodes.length === 0) return;

            const first = nodes[0];
            const last = nodes[nodes.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        },
        [dismissable, onClose]
    );

    useEffect(() => {
        if (!open) return undefined;

        previouslyFocused.current = document.activeElement;
        const { overflow } = document.body.style;
        document.body.style.overflow = 'hidden';

        const focusTimer = window.setTimeout(() => {
            const nodes = Array.from(panelRef.current?.querySelectorAll(FOCUSABLE) ?? []);
            // Prefer a real action over the close button, so the dialog does not
            // open with a focus ring around the "X".
            const target = nodes.find((node) => !node.hasAttribute('data-modal-close')) ?? nodes[0];
            target?.focus();
        }, 60);

        return () => {
            window.clearTimeout(focusTimer);
            document.body.style.overflow = overflow;
            if (previouslyFocused.current instanceof HTMLElement) {
                previouslyFocused.current.focus();
            }
        };
    }, [open]);

    if (typeof document === 'undefined') return null;

    const maxWidth = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    }[size] ?? 'max-w-lg';

    return createPortal(
        <AnimatePresence>
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
                    onKeyDown={handleKeyDown}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        onClick={dismissable ? onClose : undefined}
                        className="absolute inset-0 bg-slate-900/55 backdrop-blur-sm"
                    />

                    <motion.div
                        ref={panelRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label={typeof title === 'string' ? title : undefined}
                        initial={{ opacity: 0, y: 32, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.97 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                        className={cn(
                            'relative w-full overflow-hidden rounded-t-3xl border-4 border-sky-200 bg-gradient-to-b from-sky-50 to-white shadow-[var(--shadow-panel)] sm:rounded-3xl',
                            maxWidth,
                            className
                        )}
                    >
                        {dismissable && (
                            <button
                                type="button"
                                onClick={onClose}
                                data-modal-close="true"
                                aria-label="Close dialog"
                                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}

                        {(title || icon) && (
                            <div className="flex items-start gap-3 px-6 pt-6 pr-16">
                                {icon}
                                <div className="min-w-0">
                                    {title && (
                                        <h2 className="font-fun text-xl font-black text-slate-900 sm:text-2xl">
                                            {title}
                                        </h2>
                                    )}
                                    {description && (
                                        <p className="mt-0.5 text-xs font-medium text-slate-500">{description}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="px-6 pb-6 pt-5">{children}</div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
