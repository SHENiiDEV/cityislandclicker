import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';
import { SYNC } from '../game/config';

/**
 * Drives passive income with requestAnimationFrame and keeps the Laravel
 * backend in sync: on an interval, and once more when the tab goes away.
 */
export function useGameLoop() {
    const tick = useGameStore((state) => state.tick);
    const syncBatch = useGameStore((state) => state.syncBatch);
    const lastFrameRef = useRef(0);
    const frameRef = useRef(null);

    // Passive income ticker
    useEffect(() => {
        lastFrameRef.current = performance.now();

        const step = (now) => {
            const delta = Math.min(1, (now - lastFrameRef.current) / 1000);
            lastFrameRef.current = now;
            tick(delta);
            frameRef.current = requestAnimationFrame(step);
        };

        frameRef.current = requestAnimationFrame(step);
        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [tick]);

    // Periodic batch sync
    useEffect(() => {
        const intervalId = setInterval(syncBatch, SYNC.intervalMs);
        return () => clearInterval(intervalId);
    }, [syncBatch]);

    // Final flush when the tab closes or is hidden
    useEffect(() => {
        const flush = () => {
            const state = useGameStore.getState();
            if (!state.hasPendingChanges()) return;

            const payload = JSON.stringify(state.buildSyncPayload());

            if (navigator.sendBeacon) {
                navigator.sendBeacon(SYNC.endpoint, new Blob([payload], { type: 'application/json' }));
                return;
            }

            fetch(SYNC.endpoint, {
                method: 'POST',
                body: payload,
                headers: { 'Content-Type': 'application/json' },
                keepalive: true,
            }).catch(() => {});
        };

        const onVisibilityChange = () => {
            if (document.visibilityState === 'hidden') flush();
        };

        window.addEventListener('beforeunload', flush);
        window.addEventListener('pagehide', flush);
        document.addEventListener('visibilitychange', onVisibilityChange);

        return () => {
            window.removeEventListener('beforeunload', flush);
            window.removeEventListener('pagehide', flush);
            document.removeEventListener('visibilitychange', onVisibilityChange);
        };
    }, []);
}
