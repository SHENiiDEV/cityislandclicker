import React from 'react';
import { Building2, Coins, MousePointerClick } from 'lucide-react';
import Card from '../ui/Card';
import IconTile from '../ui/IconTile';
import SectionHeading from '../ui/SectionHeading';

const STEPS = [
    {
        number: 1,
        Icon: MousePointerClick,
        tone: 'sky',
        title: 'Tap & mine gold',
        body: 'Every tap on the island produces coins. Upgrade from a wooden shovel to a quantum extractor, keep a streak alive and trigger critical hits worth 2.5×.',
    },
    {
        number: 2,
        Icon: Building2,
        tone: 'grass',
        title: 'Raise city districts',
        body: 'Buy harbours, wind farms, resorts and bank vaults. Each one appears on your island and pays out passive income every single second.',
    },
    {
        number: 3,
        Icon: Coins,
        tone: 'violet',
        title: 'Collect while away',
        body: 'Close the tab and get on with your day — the city keeps working. Come back to a pile of idle earnings, and double it with gems if you like.',
    },
];

const TONE_BADGE = {
    sky: 'bg-sky-500',
    grass: 'bg-emerald-500',
    violet: 'bg-purple-500',
};

export default function HowItWorks() {
    return (
        <section
            id="how-it-works"
            className="scroll-mt-24 border-y-2 border-sky-100 bg-white/70 px-4 py-16 backdrop-blur-md sm:px-6 md:py-24"
        >
            <div className="mx-auto max-w-7xl">
                <SectionHeading
                    eyebrow="Gameplay loop"
                    eyebrowTone="sky"
                    title="Three steps from sandbar to skyline"
                    description="No downloads, no tutorials to sit through — the loop is obvious in ten seconds and deep enough for weeks."
                    className="mb-14"
                />

                <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {STEPS.map((step) => (
                        <li key={step.number}>
                            <Card tone={step.tone} interactive className="h-full p-6">
                                <div className="mb-4 flex items-center gap-3">
                                    <IconTile tone={step.tone}>
                                        <step.Icon className="h-6 w-6" />
                                    </IconTile>
                                    <span
                                        className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-black text-white ${TONE_BADGE[step.tone]}`}
                                    >
                                        {step.number}
                                    </span>
                                </div>

                                <h3 className="mb-2 text-xl font-black text-slate-900">{step.title}</h3>
                                <p className="text-sm leading-relaxed text-slate-600">{step.body}</p>
                            </Card>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
