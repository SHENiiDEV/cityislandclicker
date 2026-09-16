import React from 'react';
import { Link } from '@inertiajs/react';
import { Play } from 'lucide-react';
import Button from '../ui/Button';

export default function CtaBanner({ user = null }) {
    return (
        <section className="px-4 py-16 sm:px-6">
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 p-8 text-center text-white shadow-[var(--shadow-panel)] sm:p-12">
                <div
                    className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-2xl"
                    aria-hidden="true"
                />
                <div
                    className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-amber-300/25 blur-3xl"
                    aria-hidden="true"
                />

                <div className="relative space-y-6">
                    <h2 className="font-fun text-balance text-3xl font-black sm:text-4xl">
                        Ready to rule your island empire?
                    </h2>
                    <p className="mx-auto max-w-xl text-sm font-medium text-sky-100 sm:text-base">
                        Loads in seconds, runs in the browser, saves to the cloud. Your first district is
                        only a few taps away.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button as={Link} href={user ? '/play' : '/register'} size="xl" variant="amber">
                            <Play className="h-6 w-6 fill-current" />
                            {user ? 'Back to my island' : 'Create account & play'}
                        </Button>

                        {!user && (
                            <Button as={Link} href="/login" size="lg" variant="glass">
                                Existing mayor? Log in
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
