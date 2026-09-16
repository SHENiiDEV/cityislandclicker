import React, { useCallback, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick, Sun, Zap } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { formatNumber } from '../../lib/format';
import IslandArt from './IslandArt';

/** The tappable island: pointer, touch and keyboard all produce the same tap. */
export default function IslandStage() {
    const tap = useGameStore((state) => state.tap);
    const tapPower = useGameStore((state) => state.tapPower);
    const comboMultiplier = useGameStore((state) => state.comboMultiplier);
    const upgrades = useGameStore((state) => state.upgrades);

    const [pressed, setPressed] = useState(false);
    const releaseTimer = useRef(null);

    const buildings = useMemo(
        () => Object.fromEntries(upgrades.map((upgrade) => [upgrade.key, upgrade.level])),
        [upgrades]
    );

    const unlockedCount = useMemo(
        () => upgrades.filter((upgrade) => upgrade.category === 'passive' && upgrade.level > 0).length,
        [upgrades]
    );

    const registerTap = useCallback(
        (point) => {
            setPressed(true);
            if (releaseTimer.current) clearTimeout(releaseTimer.current);
            releaseTimer.current = setTimeout(() => setPressed(false), 110);
            tap(point);
        },
        [tap]
    );

    const handlePointerDown = (event) => {
        // Only primary pointer / touch, and never the browser's synthetic click.
        if (event.button !== undefined && event.button !== 0) return;
        registerTap({ x: event.clientX, y: event.clientY });
    };

    const handleKeyDown = (event) => {
        if (event.key !== ' ' && event.key !== 'Enter') return;
        event.preventDefault();
        const rect = event.currentTarget.getBoundingClientRect();
        registerTap({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    };

    return (
        <div className="relative flex w-full max-w-xl flex-col items-center py-2 select-none">
            {/* Ambient sun */}
            <div
                className="pointer-events-none absolute -left-10 -top-14 hidden animate-spin text-amber-300/35 sm:block"
                style={{ animationDuration: '40s' }}
                aria-hidden="true"
            >
                <Sun className="h-32 w-32" />
            </div>

            {/* Weather cloud */}
            <div className="pointer-events-none absolute -right-2 top-0 hidden items-center gap-1.5 rounded-full bg-white/80 px-5 py-2 text-xs font-bold text-sky-700 shadow-sm backdrop-blur-xs animate-float-slow sm:flex">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
                Sunny · +28°C · {unlockedCount} districts
            </div>

            <motion.div
                role="button"
                tabIndex={0}
                aria-label={`Tap the island to earn ${formatNumber(tapPower * comboMultiplier)} coins`}
                onPointerDown={handlePointerDown}
                onKeyDown={handleKeyDown}
                onContextMenu={(event) => event.preventDefault()}
                whileHover={{ scale: 1.015 }}
                animate={{ y: pressed ? 10 : [0, -9, 0], scale: pressed ? 0.955 : 1 }}
                transition={{
                    y: pressed
                        ? { duration: 0.09 }
                        : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
                    scale: { type: 'spring', stiffness: 520, damping: 20 },
                }}
                className="group relative flex cursor-pointer touch-none flex-col items-center rounded-[3rem] outline-none"
            >
                <IslandArt buildings={buildings} className="w-[19rem] sm:w-[24rem] md:w-[27rem]" />

                <div className="pointer-events-none absolute bottom-2 flex items-center gap-2 rounded-full border-2 border-amber-200 bg-gradient-to-r from-amber-500 to-yellow-400 px-5 py-2 text-sm font-black text-amber-950 shadow-[0_8px_18px_-6px_rgba(245,158,11,0.9)] transition-transform group-hover:scale-105">
                    <Zap className="h-4 w-4 fill-amber-950 text-amber-950" />
                    TAP! +{formatNumber(tapPower * comboMultiplier)}
                </div>
            </motion.div>

            <p className="mt-3 flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <MousePointerClick className="h-3.5 w-3.5" />
                Click, tap or press Space — buildings appear on the island as you buy them.
            </p>
        </div>
    );
}
