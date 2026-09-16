/**
 * Central place for every tunable gameplay constant.
 * Keeping them here means balance tweaks never require hunting through components.
 */

export const COMBO = {
    /** Taps must land within this window to keep the streak alive (ms). */
    windowMs: 850,
    /** Streak thresholds, highest first. */
    tiers: [
        { taps: 30, multiplier: 3, label: 'Volcanic' },
        { taps: 15, multiplier: 2, label: 'Blazing' },
        { taps: 5, multiplier: 1.5, label: 'Warmed up' },
    ],
    /** Streak length that fills the meter completely. */
    maxTaps: 30,
    /** Meter only appears once the player is on a roll. */
    visibleFrom: 3,
};

export const CRIT = {
    chance: 0.12,
    multiplier: 2.5,
    /** Combos at or above this multiplier always crit. */
    guaranteedFromMultiplier: 2,
};

export const SYNC = {
    /** How often the pending batch is pushed to Laravel (ms). */
    intervalMs: 15000,
    /** Minimum idle time before an empty batch is worth sending (s). */
    minElapsedSeconds: 10,
    endpoint: '/api/game/sync',
    claimOfflineEndpoint: '/api/game/claim-offline',
};

export const OFFLINE = {
    doubleCostGems: 10,
};

export const PARTICLES = {
    /** Hard cap so a long autoclick session never floods the DOM. */
    max: 24,
    lifetimeMs: 850,
};

export const BUY_MULTIPLIERS = [1, 10, 'max'];

/**
 * Resolve the active combo tier for a streak length.
 */
export function comboTierFor(taps) {
    return COMBO.tiers.find((tier) => taps >= tier.taps) ?? null;
}

export function comboMultiplierFor(taps) {
    return comboTierFor(taps)?.multiplier ?? 1;
}
