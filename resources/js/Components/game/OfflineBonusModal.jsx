import React from 'react';
import { Clock, Coins, Gem, Sparkles } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { formatNumber, formatDuration } from '../../lib/format';
import { OFFLINE } from '../../game/config';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

/** Shown once per session when the city earned coins while the player was away. */
export default function OfflineBonusModal() {
    const offlineBonus = useGameStore((state) => state.offlineBonus);
    const gems = useGameStore((state) => state.gems);
    const claimOfflineBonus = useGameStore((state) => state.claimOfflineBonus);
    const dismissOfflineModal = useGameStore((state) => state.dismissOfflineModal);

    const open = Boolean(offlineBonus?.has_bonus);
    const canDouble = gems >= OFFLINE.doubleCostGems;

    return (
        <Modal
            open={open}
            onClose={dismissOfflineModal}
            size="sm"
            title="Welcome back, Mayor!"
            description="Your citizens kept the economy running while you were away."
            icon={
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-amber-300 bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 shadow-md">
                    <Sparkles className="h-6 w-6" />
                </span>
            }
        >
            <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/80 p-4 text-center">
                <div className="mb-2 flex items-center justify-between text-xs font-bold text-amber-900">
                    <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-amber-600" />
                        Time away
                    </span>
                    <span className="rounded-full bg-amber-200/80 px-2 py-0.5 tabular">
                        {formatDuration(offlineBonus?.offline_seconds)}
                    </span>
                </div>

                <div className="flex items-center justify-center gap-2 py-1 text-3xl font-black text-amber-600 tabular">
                    <Coins className="h-8 w-8 fill-amber-500 text-amber-600" />
                    +{formatNumber(offlineBonus?.offline_coins)}
                </div>
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700">
                    Earned while away
                </div>
            </div>

            <div className="mt-5 space-y-3">
                <Button
                    block
                    size="lg"
                    variant="purple"
                    disabled={!canDouble}
                    onClick={() => claimOfflineBonus(true)}
                >
                    <Sparkles className="h-5 w-5 text-amber-300" />
                    Double it (+{formatNumber((offlineBonus?.offline_coins ?? 0) * 2)})
                    <span className="flex items-center gap-1 rounded-full bg-black/25 px-2 py-0.5 text-xs">
                        <Gem className="h-3.5 w-3.5 text-cyan-300" />
                        {OFFLINE.doubleCostGems}
                    </span>
                </Button>

                <Button block size="md" variant="green" onClick={() => claimOfflineBonus(false)}>
                    Collect ×1
                </Button>

                {!canDouble && (
                    <p className="text-center text-xs font-semibold text-slate-400">
                        You need {OFFLINE.doubleCostGems} gems to double the payout.
                    </p>
                )}
            </div>
        </Modal>
    );
}
