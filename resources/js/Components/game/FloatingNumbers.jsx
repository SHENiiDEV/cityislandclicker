import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { formatNumber } from '../../lib/format';
import { PARTICLES } from '../../game/config';

/** Coin numbers that fly off the island on every tap. */
export default function FloatingNumbers() {
    const particles = useGameStore((state) => state.floatingParticles);
    const removeParticle = useGameStore((state) => state.removeParticle);

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
            <AnimatePresence>
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        initial={{ opacity: 1, scale: particle.isCrit ? 1.35 : 1, x: particle.x, y: particle.y }}
                        animate={{
                            opacity: 0,
                            scale: particle.isCrit ? 1.75 : 1.1,
                            x: particle.x + (Math.random() * 48 - 24),
                            y: particle.y - (particle.isCrit ? 140 : 110),
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: PARTICLES.lifetimeMs / 1000, ease: 'easeOut' }}
                        onAnimationComplete={() => removeParticle(particle.id)}
                        style={{ transform: 'translate(-50%, -50%)' }}
                        className={
                            particle.isCrit
                                ? 'absolute flex items-center gap-1 text-3xl font-black tracking-tight text-amber-200 [text-shadow:0_3px_8px_rgba(180,83,9,0.95)]'
                                : 'absolute text-2xl font-black tracking-tight text-yellow-300 [text-shadow:0_2px_6px_rgba(161,98,7,0.9)]'
                        }
                    >
                        +{formatNumber(particle.amount)}
                        {particle.isCrit && (
                            <span className="rounded-full bg-rose-900/70 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-[0.2em] text-rose-200">
                                crit
                            </span>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
