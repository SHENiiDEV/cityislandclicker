import { create } from 'zustand';
import axios from 'axios';
import { soundManager } from '../utils/sound';
import { formatNumber } from '../lib/format';
import { COMBO, CRIT, OFFLINE, PARTICLES, SYNC, comboMultiplierFor } from '../game/config';

/** Re-exported for convenience: most components need the store and the formatter together. */
export { formatNumber };

/** Combo timeout lives outside the store — it is a side effect, not UI state. */
let comboTimeoutId = null;

const costForLevel = (upgrade, level) =>
    Math.round(upgrade.base_cost * Math.pow(upgrade.cost_multiplier, level));

/** Tap power and passive rate are always derived from the upgrade list, never tracked separately. */
function derivePowers(upgrades) {
    let tapPower = 1;
    let passiveRate = 0;

    for (const upgrade of upgrades) {
        const contribution = upgrade.level * upgrade.base_power;
        if (upgrade.category === 'click') {
            tapPower += contribution;
        } else {
            passiveRate += contribution;
        }
    }

    return { tapPower, passiveRate };
}

/** How many levels of `upgrade` the player can afford with `coins`. */
export function affordableLevels(upgrade, coins, limit = 1000) {
    let budget = coins;
    let level = upgrade.level;
    let count = 0;

    while (count < limit) {
        const price = costForLevel(upgrade, level);
        if (price > budget) break;
        budget -= price;
        level += 1;
        count += 1;
    }

    return count;
}

/** Total price of buying `count` sequential levels. */
export function bulkCost(upgrade, count) {
    let total = 0;
    for (let i = 0; i < count; i += 1) {
        total += costForLevel(upgrade, upgrade.level + i);
    }
    return total;
}

export const useGameStore = create((set, get) => ({
    // --- Balances (derived values are recomputed on every upgrade change) ---
    coins: 0,
    gems: 0,
    tapPower: 1,
    passiveRate: 0,
    totalClicks: 0,
    sessionEarned: 0,

    upgrades: [],
    floatingParticles: [],

    // --- Batched synchronisation ---
    pendingClicks: 0,
    pendingPurchases: [],
    lastSyncTime: Date.now(),
    isSyncing: false,
    syncStatus: 'idle', // idle | syncing | saved | error

    // --- Combo ---
    comboCount: 0,
    comboMultiplier: 1,
    comboExpiresAt: 0,

    // --- UI ---
    offlineBonus: null,
    isShopOpen: false,
    soundEnabled: true,
    buyMultiplier: 1, // 1 | 10 | 'max'

    setShopOpen: (open) => set({ isShopOpen: open }),
    setBuyMultiplier: (value) => set({ buyMultiplier: value }),

    toggleSound: () => set({ soundEnabled: soundManager.toggle() }),

    /** Hydrate from the Inertia props handed over by GameController. */
    initStore: (initialUser = {}, initialUpgrades = [], offlineProgress = null) => {
        const upgrades = initialUpgrades ?? [];
        const derived = derivePowers(upgrades);

        set({
            coins: Number(initialUser.coins ?? 0),
            gems: Number(initialUser.gems ?? 0),
            totalClicks: Number(initialUser.total_clicks ?? 0),
            tapPower: Number(initialUser.tap_power ?? derived.tapPower),
            passiveRate: Number(initialUser.passive_rate ?? derived.passiveRate),
            upgrades,
            sessionEarned: 0,
            offlineBonus: offlineProgress?.has_bonus ? offlineProgress : null,
            lastSyncTime: Date.now(),
            pendingClicks: 0,
            pendingPurchases: [],
            comboCount: 0,
            comboMultiplier: 1,
            comboExpiresAt: 0,
        });
    },

    /** A tap on the island: combo, crit roll, coins, particle, sound. */
    tap: (point = null) => {
        const state = get();

        const comboCount = state.comboCount + 1;
        const comboMultiplier = comboMultiplierFor(comboCount);

        if (comboTimeoutId) clearTimeout(comboTimeoutId);
        comboTimeoutId = setTimeout(() => {
            set({ comboCount: 0, comboMultiplier: 1, comboExpiresAt: 0 });
        }, COMBO.windowMs);

        const isCrit =
            comboMultiplier >= CRIT.guaranteedFromMultiplier || Math.random() < CRIT.chance;
        const coinsGained = state.tapPower * comboMultiplier * (isCrit ? CRIT.multiplier : 1);

        if (isCrit) {
            soundManager.playCrit();
        } else {
            soundManager.playTap(1 + Math.min(comboCount * 0.02, 0.4));
        }

        const particle = {
            id: `${Date.now()}-${Math.random()}`,
            x: (point?.x ?? window.innerWidth / 2) + (Math.random() * 44 - 22),
            y: (point?.y ?? window.innerHeight / 2) + (Math.random() * 24 - 12),
            amount: coinsGained,
            isCrit,
        };

        set((prev) => ({
            coins: prev.coins + coinsGained,
            sessionEarned: prev.sessionEarned + coinsGained,
            totalClicks: prev.totalClicks + 1,
            pendingClicks: prev.pendingClicks + 1,
            comboCount,
            comboMultiplier,
            comboExpiresAt: Date.now() + COMBO.windowMs,
            floatingParticles: [...prev.floatingParticles.slice(-(PARTICLES.max - 1)), particle],
        }));
    },

    removeParticle: (id) =>
        set((prev) => ({
            floatingParticles: prev.floatingParticles.filter((particle) => particle.id !== id),
        })),

    /**
     * Optimistically buy one or more levels; the batch is reconciled server-side
     * on the next sync, which stays authoritative.
     */
    buyUpgrade: (upgradeKey, requestedCount = 1) => {
        const state = get();
        const index = state.upgrades.findIndex((item) => item.key === upgradeKey);
        if (index === -1) return;

        const upgrade = state.upgrades[index];
        const maxCount = affordableLevels(upgrade, state.coins);
        const count =
            requestedCount === 'max' ? maxCount : Math.min(Number(requestedCount) || 1, maxCount);

        if (count < 1) {
            soundManager.playError();
            return;
        }

        const spent = bulkCost(upgrade, count);
        const newLevel = upgrade.level + count;

        const upgrades = [...state.upgrades];
        upgrades[index] = {
            ...upgrade,
            level: newLevel,
            next_cost: costForLevel(upgrade, newLevel),
            current_total_power: newLevel * upgrade.base_power,
        };

        const pendingPurchases = [...state.pendingPurchases];
        const queued = pendingPurchases.findIndex((item) => item.upgrade_key === upgradeKey);
        if (queued >= 0) {
            pendingPurchases[queued] = {
                ...pendingPurchases[queued],
                count: pendingPurchases[queued].count + count,
            };
        } else {
            pendingPurchases.push({ upgrade_key: upgradeKey, count });
        }

        soundManager.playUpgrade();

        set({
            coins: state.coins - spent,
            upgrades,
            pendingPurchases,
            ...derivePowers(upgrades),
        });
    },

    /** Passive income, driven by requestAnimationFrame for a smooth counter. */
    tick: (deltaSeconds) => {
        const { passiveRate } = get();
        if (passiveRate <= 0) return;

        const gained = passiveRate * deltaSeconds;
        set((prev) => ({
            coins: prev.coins + gained,
            sessionEarned: prev.sessionEarned + gained,
        }));
    },

    /** Build the payload used both by the interval sync and the page-hide beacon. */
    buildSyncPayload: () => {
        const state = get();
        return {
            clicks: state.pendingClicks,
            elapsed_seconds: Math.max(1, (Date.now() - state.lastSyncTime) / 1000),
            purchases: state.pendingPurchases,
            client_coins: state.coins,
        };
    },

    hasPendingChanges: () => {
        const state = get();
        return state.pendingClicks > 0 || state.pendingPurchases.length > 0;
    },

    syncBatch: async () => {
        const state = get();
        if (state.isSyncing) return;

        const payload = get().buildSyncPayload();
        if (!get().hasPendingChanges() && payload.elapsed_seconds < SYNC.minElapsedSeconds) {
            return;
        }

        set({ isSyncing: true, syncStatus: 'syncing' });

        try {
            const { data } = await axios.post(SYNC.endpoint, payload);

            if (!data?.success) {
                set({ isSyncing: false, syncStatus: 'error' });
                return;
            }

            set({
                pendingClicks: 0,
                pendingPurchases: [],
                lastSyncTime: Date.now(),
                isSyncing: false,
                syncStatus: 'saved',
                coins: Math.max(get().coins, Number(data.coins ?? 0)),
                gems: Number(data.gems ?? get().gems),
                tapPower: Number(data.tap_power ?? get().tapPower),
                passiveRate: Number(data.passive_rate ?? get().passiveRate),
            });

            setTimeout(() => {
                if (get().syncStatus === 'saved') set({ syncStatus: 'idle' });
            }, 2000);
        } catch (error) {
            console.error('Game sync failed', error);
            set({ isSyncing: false, syncStatus: 'error' });
        }
    },

    claimOfflineBonus: async (doubleWithGems = false) => {
        if (!get().offlineBonus) return;

        try {
            const { data } = await axios.post(SYNC.claimOfflineEndpoint, {
                double_with_gems: doubleWithGems,
            });

            if (!data?.success) {
                set({ syncStatus: 'error' });
                return;
            }

            soundManager.playCoin();
            set({
                coins: Number(data.new_coins),
                gems: Number(data.new_gems),
                offlineBonus: null,
            });
        } catch (error) {
            console.error('Offline bonus claim failed', error);
            set({ syncStatus: 'error' });
        }
    },

    canDoubleOffline: () => get().gems >= OFFLINE.doubleCostGems,

    dismissOfflineModal: () => set({ offlineBonus: null }),

    topupSuccess: (gemsAdded = 0, coinsAdded = 0) => {
        soundManager.playCoin();
        set((prev) => ({
            gems: prev.gems + Number(gemsAdded),
            coins: prev.coins + Number(coinsAdded),
        }));
    },
}));
