import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import Logo from '../Components/site/Logo';
import { cn } from '../lib/cn';

/** Centred card used by the login and registration pages. */
export default function AuthLayout({ title, tagline, heading, subheading, width = 'max-w-md', children }) {
    return (
        <div className="bg-island-sky flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6">
            <Head title={title} />

            <div className="mb-7 text-center">
                <Link href="/" className="inline-flex rounded-2xl" aria-label="City Island Clicker — home">
                    <Logo />
                </Link>
                {tagline && <p className="mt-2 text-sm font-bold text-sky-800">{tagline}</p>}
            </div>

            <div
                className={cn(
                    'w-full rounded-[2rem] border-4 border-amber-300 bg-white/92 p-6 shadow-[var(--shadow-panel)] backdrop-blur-md sm:p-8',
                    width
                )}
            >
                <div className="mb-6 border-b-2 border-slate-100 pb-4">
                    <h1 className="font-fun text-2xl font-black text-slate-900 sm:text-3xl">{heading}</h1>
                    {subheading && <p className="mt-0.5 text-xs text-slate-500">{subheading}</p>}
                </div>

                {children}
            </div>

            <Link
                href="/"
                className="mt-6 inline-flex items-center gap-1.5 rounded-xl text-xs font-bold text-slate-500 transition-colors hover:text-sky-700"
            >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to the island
            </Link>
        </div>
    );
}
