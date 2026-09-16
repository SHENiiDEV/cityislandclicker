import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Zap } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { COMBO, comboTierFor } from '../../game/config';
import ProgressBar from '../ui/ProgressBar';

/** Streak meter — only shows up once the player is actually on a roll. */
export default function ComboMeter() {
    const comboCount = useGameStore((state) => state.comboCount);
    const comboMultiplier = useGameStore((state) => state.comboMultiplier);

    const visible = comboCount >= COMBO.visibleFrom;
    const tier = comboTierFor(comboCount);
    const percent = Math.min(100, (comboCount / COMBO.maxTaps) * 100);

    return (
        <div className="h-[76px] w-full max-w-sm">
            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.94 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                        className="rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-0.5 shadow-[0_14px_30px_-14px_rgba(234,88,12,0.9)]"
                    >
                        <div className="rounded-[14px] bg-slate-900/92 px-4 py-2.5 text-white">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5">
                                    <Flame
                                        className={
                                            comboMultiplier >= 2
                                                ? 'h-5 w-5 animate-bounce text-rose-400'
                                                : 'h-5 w-5 text-amber-400'
                                        }
                                    />
                                    <div className="leading-tight">
                                        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-300">
                                            {tier?.label ?? 'Combo'} streak
                                        </div>
                                        <div className="text-xs font-bold text-slate-300 tabular">
                                            {comboCount} taps in a row
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="text-right leading-none">
                                        <span className="text-lg font-black text-amber-300 tabular">
                                            {comboMultiplier}x
                                        </span>
                                        <span className="mt-0.5 block text-[10px] font-bold text-amber-200/80">
                                            multiplier
                                        </span>
                                    </div>
                                    <Zap className="h-5 w-5 animate-pulse fill-yellow-400 text-yellow-400" />
                                </div>
                            </div>

                            <ProgressBar
                                value={percent}
                                tone="fire"
                                label="Combo progress"
                                trackClassName="bg-slate-950/60 mt-2"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
