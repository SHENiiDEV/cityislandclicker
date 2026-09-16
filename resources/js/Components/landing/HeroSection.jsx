import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowUpRight, Check, LogIn, Play, Sparkles, UserPlus } from 'lucide-react';
import { formatNumber } from '../../lib/format';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function HeroSection({ stats = {}, user = null }) {
    const activeMayors = formatNumber(stats.active_mayors ?? 1420);

    return (
        <section className="relative isolate flex min-h-[660px] items-center overflow-hidden px-4 py-16 sm:px-6 md:min-h-[720px] md:py-24">
            <div className="absolute inset-0 -z-10" aria-hidden="true">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover object-center"
                    poster="https://images.unsplash.com/photo-1614030424754-24d0eac36a15?q=80&w=1600&auto=format&fit=crop"
                >
                    <source src="/landing_hero.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/68 to-slate-950/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/78 via-transparent to-slate-950/30" />
            </div>

            <div className="mx-auto w-full max-w-7xl">
                <div className="relative z-10 max-w-2xl">
                    <div className="mb-6 flex flex-wrap items-center gap-2.5">
                        <Badge tone="gold" className="border border-amber-400/40 bg-amber-500/20 text-amber-200 shadow-sm backdrop-blur-md">
                            <Sparkles className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                            A tiny island, a giant plan
                        </Badge>
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-950/45 px-3 py-1 text-[11px] font-black uppercase tracking-[0.13em] text-emerald-200 shadow-sm backdrop-blur">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgb(34_197_94_/_0.16)]" />
                            {activeMayors} building now
                        </span>
                    </div>

                    <h1 className="font-fun max-w-xl text-balance text-3xl font-black leading-[1.08] tracking-tight text-white drop-shadow-md sm:text-5xl lg:text-[4.2rem]">
                        One empty island.
                        <span className="mt-1 block text-amber-300">Endless little victories.</span>
                    </h1>

                    <p className="mt-4 max-w-xl text-sm font-semibold leading-relaxed text-slate-100 drop-shadow-sm sm:mt-6 sm:text-lg">
                        Turn sunlit sand into a city that never stops moving. Tap for your first coins, place a district,
                        then watch the skyline pay you back — even while you are away.
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
                        {user ? (
                            <Button as={Link} href="/play" size="xl" variant="amber" className="w-full sm:w-auto shadow-[0_12px_26px_-12px_rgb(180_83_9_/_0.8)]">
                                <Play className="h-5 w-5 fill-current" />
                                Continue building
                            </Button>
                        ) : (
                            <>
                                <Button as={Link} href="/register" size="xl" variant="amber" className="w-full sm:w-auto shadow-[0_12px_26px_-12px_rgb(180_83_9_/_0.8)]">
                                    <UserPlus className="h-5 w-5" />
                                    Start my island (Register)
                                </Button>
                                <Button as={Link} href="/login" size="lg" variant="outline" className="w-full sm:w-auto border-white/35 bg-white/15 text-white shadow-sm backdrop-blur hover:border-white/60 hover:bg-white/25 hover:text-white">
                                    <LogIn className="h-4 w-4" />
                                    Log in to play
                                </Button>
                            </>
                        )}
                    </div>

                    <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold text-slate-100 sm:mt-8 sm:text-sm">
                        <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-300" /> Free to start</li>
                        <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-300" /> Works on mobile & desktop</li>
                        <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-300" /> 24/7 offline earnings</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
