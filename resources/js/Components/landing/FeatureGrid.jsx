import React from 'react';
import { Gem, ShieldCheck, Smartphone, Zap } from 'lucide-react';
import Card from '../ui/Card';
import IconTile from '../ui/IconTile';
import SectionHeading from '../ui/SectionHeading';

const FEATURES = [
    {
        Icon: Zap,
        tone: 'sky',
        title: 'Instant 60 FPS response',
        body: 'Zustand state plus a requestAnimationFrame loop means coins tick up smoothly, even during a frantic tapping streak.',
    },
    {
        Icon: ShieldCheck,
        tone: 'grass',
        title: 'Server-side fair play',
        body: 'Laravel validates click rates and purchase order integrity on every batch, so the leaderboard stays honest.',
    },
    {
        Icon: Gem,
        tone: 'gold',
        title: 'Seamless top-ups',
        body: 'Gem packs credit instantly through idempotent webhook verification — no waiting, no duplicate charges.',
    },
    {
        Icon: Smartphone,
        tone: 'violet',
        title: 'Built for thumbs',
        body: 'Touch-first hit areas, spring physics and flying coin numbers feel right on phones, tablets and desktops alike.',
    },
];

export default function FeatureGrid() {
    return (
        <section id="features" className="scroll-mt-24 px-4 py-16 sm:px-6 md:py-24">
            <div className="mx-auto max-w-7xl">
                <SectionHeading
                    eyebrow="Under the hood"
                    eyebrowTone="grass"
                    title="Fast to play, hard to cheat"
                    description="A React front end you can feel and a Laravel back end that keeps the economy balanced."
                    className="mb-14"
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {FEATURES.map((feature) => (
                        <Card key={feature.title} interactive className="p-6">
                            <IconTile tone={feature.tone} className="mb-4">
                                <feature.Icon className="h-6 w-6" />
                            </IconTile>
                            <h3 className="mb-1.5 text-base font-black text-slate-900">{feature.title}</h3>
                            <p className="text-xs leading-relaxed text-slate-500">{feature.body}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
