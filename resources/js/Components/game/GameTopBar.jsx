import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Gem, LogOut, Volume2, VolumeX } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import Button from '../ui/Button';
import Logo from '../site/Logo';
import SyncIndicator from './SyncIndicator';
import ResourcePills from './ResourcePills';

export default function GameTopBar({ user }) {
    const soundEnabled = useGameStore((state) => state.soundEnabled);
    const toggleSound = useGameStore((state) => state.toggleSound);
    const setShopOpen = useGameStore((state) => state.setShopOpen);

    return (
        <header className="sticky top-0 z-40 border-b-2 border-sky-100 bg-white/85 px-3 py-2.5 shadow-sm backdrop-blur-md sm:px-6">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <Link href="/" className="rounded-xl" aria-label="Back to the home page">
                        <Logo compact />
                    </Link>
                    <SyncIndicator />
                </div>

                <ResourcePills onOpenShop={() => setShopOpen(true)} />

                <div className="flex items-center gap-1.5">
                    <button
                        type="button"
                        onClick={toggleSound}
                        aria-pressed={soundEnabled}
                        title={soundEnabled ? 'Mute sound' : 'Enable sound'}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200"
                    >
                        {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-slate-400" />}
                    </button>

                    <Button
                        size="xs"
                        variant="amber"
                        onClick={() => setShopOpen(true)}
                        className="hidden sm:inline-flex"
                    >
                        <Gem className="h-3.5 w-3.5 fill-cyan-400 text-cyan-600" />
                        Store
                    </Button>

                    <button
                        type="button"
                        onClick={() => router.post('/logout')}
                        title={user?.name ? `Sign out ${user.name}` : 'Sign out'}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-600"
                    >
                        <LogOut className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </header>
    );
}
