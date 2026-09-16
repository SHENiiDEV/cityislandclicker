import React, { useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

export default function FaqSection({ items = [] }) {
    const [openIndex, setOpenIndex] = useState(0);
    const baseId = useId().replace(/[^a-zA-Z0-9]/g, '');

    if (items.length === 0) return null;

    return (
        <section id="faq" className="scroll-mt-24 px-4 py-16 sm:px-6 md:py-24">
            <div className="mx-auto max-w-4xl">
                <SectionHeading
                    eyebrow="FAQ"
                    eyebrowTone="gold"
                    title="Questions mayors ask before the first tap"
                    className="mb-12"
                />

                <div className="space-y-3">
                    {items.map((item, index) => {
                        const isOpen = openIndex === index;
                        const buttonId = `${baseId}-faq-${index}`;
                        const panelId = `${baseId}-faq-panel-${index}`;

                        return (
                            <div
                                key={item.q}
                                className="overflow-hidden rounded-2xl border-2 border-sky-100 bg-white shadow-sm transition-colors hover:border-sky-200"
                            >
                                <h3>
                                    <button
                                        id={buttonId}
                                        type="button"
                                        aria-expanded={isOpen}
                                        aria-controls={panelId}
                                        onClick={() => setOpenIndex(isOpen ? null : index)}
                                        className="flex w-full items-center justify-between gap-4 p-5 text-left text-base font-black text-slate-800 transition-colors hover:text-sky-600"
                                    >
                                        <span className="flex items-center gap-2.5">
                                            <HelpCircle className="h-5 w-5 shrink-0 text-amber-500" />
                                            {item.q}
                                        </span>
                                        <ChevronDown
                                            className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${
                                                isOpen ? 'rotate-180 text-sky-600' : ''
                                            }`}
                                        />
                                    </button>
                                </h3>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            id={panelId}
                                            role="region"
                                            aria-labelledby={buttonId}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.22, ease: 'easeOut' }}
                                            className="overflow-hidden"
                                        >
                                            <p className="border-t border-slate-100 px-5 pb-5 pt-3 text-sm leading-relaxed text-slate-600">
                                                {item.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
