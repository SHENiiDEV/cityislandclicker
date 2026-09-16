/**
 * Tiny Web Audio synthesiser — every game sound is generated on the fly,
 * so the bundle ships with zero audio assets.
 */

let context = null;
let masterGain = null;

function audio() {
    if (typeof window === 'undefined') return null;

    if (!context) {
        const Ctor = window.AudioContext || window.webkitAudioContext;
        if (!Ctor) return null;

        context = new Ctor();
        masterGain = context.createGain();
        masterGain.gain.value = 0.9;
        masterGain.connect(context.destination);
    }

    // Browsers suspend the context until the first user gesture.
    if (context.state === 'suspended') context.resume();

    return context;
}

/**
 * Play a single enveloped tone.
 *
 * @param {Object} options
 * @param {number} options.freq       start frequency in Hz
 * @param {number} [options.endFreq]  optional glide target
 * @param {string} [options.type]     oscillator waveform
 * @param {number} [options.gain]     peak gain
 * @param {number} [options.duration] seconds
 * @param {number} [options.delay]    seconds from now
 */
function tone({ freq, endFreq, type = 'sine', gain = 0.2, duration = 0.2, delay = 0 }) {
    const ctx = audio();
    if (!ctx) return;

    const startAt = ctx.currentTime + delay;
    const oscillator = ctx.createOscillator();
    const envelope = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, startAt);
    if (endFreq) {
        oscillator.frequency.exponentialRampToValueAtTime(Math.max(endFreq, 1), startAt + duration);
    }

    envelope.gain.setValueAtTime(gain, startAt);
    envelope.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

    oscillator.connect(envelope);
    envelope.connect(masterGain);

    oscillator.start(startAt);
    oscillator.stop(startAt + duration + 0.02);
}

function chord(notes, options = {}) {
    notes.forEach((freq, index) => tone({ freq, delay: index * (options.stagger ?? 0.05), ...options }));
}

export const soundManager = {
    enabled: true,

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    },

    /** Crisp mallet tap; pitch rises slightly with the combo streak. */
    playTap(pitchMultiplier = 1) {
        if (!this.enabled) return;
        const freq = (440 + Math.random() * 80) * pitchMultiplier;
        tone({ freq, endFreq: freq * 0.4, type: 'triangle', gain: 0.22, duration: 0.08 });
    },

    /** Bright three-note sparkle for critical taps. */
    playCrit() {
        if (!this.enabled) return;
        chord([600, 900, 1200], { type: 'sine', gain: 0.18, duration: 0.12, stagger: 0.03 });
    },

    /** Coin pickup / bonus collected. */
    playCoin() {
        if (!this.enabled) return;
        chord([987.77, 1318.51], { type: 'sine', gain: 0.16, duration: 0.25, stagger: 0.06 });
    },

    /** Triumphant arpeggio when a building levels up. */
    playUpgrade() {
        if (!this.enabled) return;
        chord([523.25, 659.25, 783.99, 1046.5], { type: 'triangle', gain: 0.2, duration: 0.28, stagger: 0.05 });
    },

    /** Low buzz when the player cannot afford something. */
    playError() {
        if (!this.enabled) return;
        tone({ freq: 160, endFreq: 110, type: 'sawtooth', gain: 0.14, duration: 0.15 });
    },
};
