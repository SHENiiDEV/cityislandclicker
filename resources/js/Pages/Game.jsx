import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { useGameStore } from '../store/useGameStore';
import { useGameLoop } from '../hooks/useGameLoop';
import GameTopBar from '../Components/game/GameTopBar';
import StatStrip from '../Components/game/StatStrip';
import ComboMeter from '../Components/game/ComboMeter';
import IslandStage from '../Components/game/IslandStage';
import UpgradesPanel from '../Components/game/UpgradesPanel';
import FloatingNumbers from '../Components/game/FloatingNumbers';
import OfflineBonusModal from '../Components/game/OfflineBonusModal';
import ShopModal from '../Components/game/ShopModal';

export default function Game({ initialUser, upgrades, offlineProgress, packages }) {
    const initStore = useGameStore((state) => state.initStore);

    useEffect(() => {
        initStore(initialUser, upgrades, offlineProgress);
    }, [initStore, initialUser, upgrades, offlineProgress]);

    useGameLoop();

    return (
        <div className="bg-island-arena flex min-h-screen flex-col overflow-x-hidden">
            <Head title="Play — City Island Clicker" />

            <FloatingNumbers />
            <GameTopBar user={initialUser} />

            <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-start gap-6 p-3 sm:p-6 lg:grid-cols-12">
                <div className="flex flex-col items-center gap-3 lg:col-span-7">
                    <StatStrip />
                    <ComboMeter />
                    <IslandStage />
                </div>

                <UpgradesPanel className="w-full lg:col-span-5 lg:sticky lg:top-24" />
            </main>

            <OfflineBonusModal />
            <ShopModal packages={packages} />
        </div>
    );
}
