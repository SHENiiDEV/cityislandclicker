const SUFFIXES = [
    { value: 1e12, suffix: 'T', digits: 2 },
    { value: 1e9, suffix: 'B', digits: 2 },
    { value: 1e6, suffix: 'M', digits: 2 },
    { value: 1e3, suffix: 'K', digits: 1 },
];

/**
 * Compact number formatting used across the whole game UI.
 * 1234 -> "1.2K", 1250000 -> "1.25M"
 */
export function formatNumber(input) {
    const value = Number(input);
    if (!Number.isFinite(value)) return '0';

    const sign = value < 0 ? '-' : '';
    const abs = Math.abs(value);

    for (const { value: threshold, suffix, digits } of SUFFIXES) {
        if (abs >= threshold) {
            return sign + trimZeros((abs / threshold).toFixed(digits)) + suffix;
        }
    }

    return sign + Math.floor(abs).toLocaleString('en-US');
}

/**
 * Exact number with thousand separators — used for tooltips and totals.
 */
export function formatExact(input) {
    const value = Number(input);
    if (!Number.isFinite(value)) return '0';
    return Math.floor(value).toLocaleString('en-US');
}

/**
 * Seconds -> "2h 15m" / "15m" / "45s"
 */
export function formatDuration(totalSeconds) {
    const seconds = Math.max(0, Math.floor(Number(totalSeconds) || 0));
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m`;
    return `${seconds}s`;
}

function trimZeros(value) {
    return value.replace(/\.0+$/, '').replace(/(\.\d*[1-9])0+$/, '$1');
}
