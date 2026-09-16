import React, { useId } from 'react';
import { cn } from '../../lib/cn';

/**
 * The island artwork, shared by the game arena and the landing hero.
 * Buildings appear as soon as the matching upgrade reaches level 1, so the
 * drawing doubles as a progress indicator.
 *
 * @param {Object} buildings map of upgrade key -> level (or boolean)
 */
export default function IslandArt({ buildings = {}, className, animated = true }) {
    const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
    const id = (name) => `${name}-${uid}`;
    const has = (key) => Boolean(buildings[key]);

    return (
        <svg
            viewBox="0 0 500 360"
            role="img"
            aria-label="Your tropical island city"
            className={cn('h-auto w-full drop-shadow-[0_28px_34px_rgba(2,132,199,0.32)]', className)}
        >
            <defs>
                <linearGradient id={id('grass')} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#86efac" />
                    <stop offset="45%" stopColor="#4ade80" />
                    <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
                <linearGradient id={id('cliff')} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#d99a55" />
                    <stop offset="45%" stopColor="#a0621f" />
                    <stop offset="100%" stopColor="#5c2c0a" />
                </linearGradient>
                <linearGradient id={id('sand')} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fef9c3" />
                    <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
                <radialGradient id={id('sea')} cx="50%" cy="50%" r="50%">
                    <stop offset="55%" stopColor="#7dd3fc" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.15" />
                </radialGradient>
                <linearGradient id={id('roof')} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fb7185" />
                    <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
                <linearGradient id={id('glass')} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e0f2fe" />
                    <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
                <linearGradient id={id('tower')} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#dbeafe" />
                </linearGradient>
            </defs>

            {/* --- Ocean --- */}
            <ellipse cx="250" cy="272" rx="222" ry="72" fill={`url(#${id('sea')})`} />
            <ellipse
                cx="250"
                cy="268"
                rx="200"
                ry="60"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeDasharray="10 22"
                opacity="0.45"
                className={animated ? 'animate-drift' : undefined}
            />
            <ellipse cx="250" cy="262" rx="176" ry="50" fill="#e0f2fe" opacity="0.55" />

            {/* --- Rocky base --- */}
            <path
                d="M62,196 Q92,292 250,312 Q408,292 438,196 Q418,236 338,256 Q250,266 162,256 Q82,236 62,196 Z"
                fill={`url(#${id('cliff')})`}
            />
            <path d="M120,232 Q150,252 196,260 L188,268 Q138,258 112,240 Z" fill="#ffffff" opacity="0.12" />

            {/* --- Beach + plateau --- */}
            <ellipse cx="250" cy="191" rx="196" ry="61" fill={`url(#${id('sand')})`} />
            <ellipse cx="250" cy="183" rx="176" ry="53" fill={`url(#${id('grass')})`} />
            <ellipse cx="250" cy="176" rx="150" ry="40" fill="#ffffff" opacity="0.14" />

            {/* Grass texture */}
            <g fill="#15803d" opacity="0.22">
                <ellipse cx="150" cy="200" rx="14" ry="4" />
                <ellipse cx="330" cy="205" rx="16" ry="4" />
                <ellipse cx="248" cy="216" rx="20" ry="5" />
                <ellipse cx="196" cy="168" rx="11" ry="3" />
            </g>

            {/* Cobblestone path */}
            <path d="M206,196 Q250,172 296,200 Q250,212 206,196 Z" fill="#d97706" opacity="0.4" />

            {/* --- City hall (always visible) --- */}
            <g transform="translate(215, 92)">
                <ellipse cx="35" cy="94" rx="34" ry="7" fill="#14532d" opacity="0.25" />
                <rect x="10" y="55" width="50" height="37" rx="5" fill={`url(#${id('tower')})`} stroke="#cbd5e1" strokeWidth="2" />
                <rect x="17" y="62" width="13" height="13" rx="3" fill={`url(#${id('glass')})`} />
                <rect x="40" y="62" width="13" height="13" rx="3" fill={`url(#${id('glass')})`} />
                <rect x="29" y="80" width="12" height="12" rx="2" fill="#f59e0b" />
                <polygon points="4,56 35,19 66,56" fill={`url(#${id('roof')})`} />
                <polygon points="4,56 35,19 35,56" fill="#ffffff" opacity="0.14" />
                <circle cx="35" cy="41" r="13" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
                <path d="M35,41 L35,34 M35,41 L40,44" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
                <rect x="34" y="4" width="2.5" height="16" rx="1" fill="#94a3b8" />
                <polygon points="36,5 53,10 36,15" fill="#facc15" className={animated ? 'animate-float-reverse' : undefined} />
            </g>

            {/* --- Palm trees --- */}
            <g transform="translate(92, 138)">
                <path d="M15,48 Q21,26 29,10" stroke="#7c3f10" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                <circle cx="29" cy="8" r="14" fill="#15803d" />
                <circle cx="21" cy="13" r="10" fill="#16a34a" />
                <circle cx="37" cy="11" r="11" fill="#22c55e" />
                <circle cx="29" cy="3" r="8" fill="#4ade80" />
                <circle cx="20" cy="46" r="3" fill="#a16207" />
            </g>
            <g transform="translate(372, 146)">
                <path d="M12,42 Q7,21 1,8" stroke="#7c3f10" strokeWidth="4" strokeLinecap="round" fill="none" />
                <circle cx="1" cy="6" r="12" fill="#15803d" />
                <circle cx="9" cy="10" r="9" fill="#22c55e" />
                <circle cx="-6" cy="11" r="8" fill="#16a34a" />
            </g>
            <g transform="translate(140, 196)">
                <path d="M8,26 Q11,14 16,6" stroke="#7c3f10" strokeWidth="3" strokeLinecap="round" fill="none" />
                <circle cx="16" cy="5" r="9" fill="#16a34a" />
                <circle cx="9" cy="9" r="7" fill="#22c55e" />
            </g>

            {/* --- Fishing harbour --- */}
            {has('fishing_dock') && (
                <g transform="translate(332, 196)" className="animate-build-in">
                    <rect x="0" y="0" width="48" height="10" rx="3" fill="#a16207" />
                    <rect x="0" y="0" width="48" height="4" rx="2" fill="#d97706" />
                    <rect x="9" y="10" width="5" height="19" fill="#78350f" />
                    <rect x="31" y="10" width="5" height="19" fill="#78350f" />
                    <path d="M49,15 L64,15 L60,25 L46,25 Z" fill="#ef4444" />
                    <path d="M49,15 L64,15 L63,18 L48,18 Z" fill="#fca5a5" />
                    <rect x="54" y="2" width="2" height="13" fill="#78350f" />
                    <polygon points="56,2 66,13 56,13" fill="#ffffff" />
                </g>
            )}

            {/* --- Lumber camp --- */}
            {has('lumberjack_camp') && (
                <g transform="translate(128, 132)" className="animate-build-in">
                    <rect x="0" y="15" width="31" height="21" rx="4" fill="#b45309" />
                    <rect x="12" y="24" width="9" height="12" rx="1" fill="#78350f" />
                    <polygon points="-3,16 15,1 33,16" fill="#7c2d12" />
                    <polygon points="-3,16 15,1 15,16" fill="#ffffff" opacity="0.12" />
                    <circle cx="39" cy="31" r="4.5" fill="#92400e" stroke="#451a03" strokeWidth="1" />
                    <circle cx="45" cy="28" r="4.5" fill="#92400e" stroke="#451a03" strokeWidth="1" />
                </g>
            )}

            {/* --- Wind farm --- */}
            {has('wind_turbine') && (
                <g transform="translate(168, 112)" className="animate-build-in">
                    <rect x="10" y="15" width="5" height="44" rx="2.5" fill="#e2e8f0" />
                    <rect x="10" y="15" width="2" height="44" fill="#ffffff" />
                    <circle cx="12.5" cy="15" r="4.5" fill="#64748b" />
                    <g
                        className={animated ? 'animate-spin' : undefined}
                        style={animated ? { transformOrigin: '12.5px 15px', animationDuration: '3.2s' } : undefined}
                    >
                        <line x1="12.5" y1="15" x2="12.5" y2="-2" stroke="#f8fafc" strokeWidth="3.5" strokeLinecap="round" />
                        <line x1="12.5" y1="15" x2="27" y2="23" stroke="#f8fafc" strokeWidth="3.5" strokeLinecap="round" />
                        <line x1="12.5" y1="15" x2="-2" y2="23" stroke="#f8fafc" strokeWidth="3.5" strokeLinecap="round" />
                    </g>
                </g>
            )}

            {/* --- Grand resort --- */}
            {has('tourist_hotel') && (
                <g transform="translate(283, 104)" className="animate-build-in">
                    <rect x="0" y="15" width="38" height="49" rx="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
                    <rect x="0" y="15" width="10" height="49" rx="4" fill="#ffffff" opacity="0.18" />
                    <g fill="#fef08a">
                        <rect x="5" y="21" width="7" height="7" rx="1.5" />
                        <rect x="15.5" y="21" width="7" height="7" rx="1.5" />
                        <rect x="15.5" y="33" width="7" height="7" rx="1.5" />
                        <rect x="26" y="33" width="7" height="7" rx="1.5" />
                        <rect x="5" y="45" width="7" height="7" rx="1.5" />
                        <rect x="26" y="45" width="7" height="7" rx="1.5" />
                    </g>
                    <g fill="#ffffff" opacity="0.85">
                        <rect x="26" y="21" width="7" height="7" rx="1.5" />
                        <rect x="5" y="33" width="7" height="7" rx="1.5" />
                        <rect x="15.5" y="45" width="7" height="7" rx="1.5" />
                    </g>
                    <rect x="3" y="9" width="32" height="7" rx="3" fill="#06b6d4" />
                    <rect x="3" y="9" width="32" height="3" rx="1.5" fill="#67e8f9" />
                </g>
            )}

            {/* --- Central bank --- */}
            {has('island_bank') && (
                <g transform="translate(168, 164)" className="animate-build-in">
                    <rect x="0" y="8" width="36" height="25" rx="3" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
                    <g stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round">
                        <line x1="7" y1="10" x2="7" y2="31" />
                        <line x1="18" y1="10" x2="18" y2="31" />
                        <line x1="29" y1="10" x2="29" y2="31" />
                    </g>
                    <polygon points="-3,9 18,-3 39,9" fill="#f59e0b" />
                    <polygon points="-3,9 18,-3 18,9" fill="#fcd34d" />
                    <circle cx="18" cy="3" r="2.8" fill="#ffffff" />
                </g>
            )}

            {/* --- Spaceport --- */}
            {has('spaceport_orion') && (
                <g transform="translate(322, 66)" className="animate-build-in">
                    <g stroke="#e11d48" strokeWidth="2.2" strokeLinecap="round">
                        <line x1="10" y1="10" x2="10" y2="62" />
                        <line x1="19" y1="10" x2="19" y2="62" />
                        <line x1="10" y1="22" x2="19" y2="22" />
                        <line x1="10" y1="38" x2="19" y2="38" />
                        <line x1="10" y1="54" x2="19" y2="54" />
                    </g>
                    <path d="M26,22 Q30,10 33,4 Q36,10 40,22 L40,47 L26,47 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
                    <circle cx="33" cy="26" r="3.6" fill={`url(#${id('glass')})`} />
                    <polygon points="26,41 21,50 26,50" fill="#e11d48" />
                    <polygon points="40,41 45,50 40,50" fill="#e11d48" />
                    <polygon
                        points="28,48 33,60 38,48"
                        fill="#f59e0b"
                        className={animated ? 'animate-pulse' : undefined}
                    />
                </g>
            )}

            {/* --- Island scouts --- */}
            {has('island_scout') && (
                <g transform="translate(206, 214)" className="animate-build-in">
                    <circle cx="8" cy="4" r="4" fill="#fcd34d" />
                    <rect x="5" y="8" width="6" height="10" rx="3" fill="#0ea5e9" />
                    <circle cx="24" cy="6" r="3.5" fill="#fcd34d" />
                    <rect x="21" y="9.5" width="6" height="9" rx="3" fill="#f43f5e" />
                </g>
            )}

            {/* --- Birds --- */}
            <g stroke="#475569" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55" className={animated ? 'animate-float-slow' : undefined}>
                <path d="M78,58 q7,-7 14,0" />
                <path d="M96,48 q6,-6 12,0" />
            </g>
        </svg>
    );
}
