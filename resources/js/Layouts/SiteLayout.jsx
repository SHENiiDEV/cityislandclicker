import React from 'react';
import { Head } from '@inertiajs/react';
import SiteHeader from '../Components/site/SiteHeader';
import SiteFooter from '../Components/site/SiteFooter';

/** Shared chrome for every public page: landing, auth and legal. */
export default function SiteLayout({ title, description, user = null, showNav = true, children }) {
    return (
        <div className="bg-island-sky flex min-h-screen flex-col overflow-x-hidden text-slate-800 selection:bg-amber-400 selection:text-amber-950">
            <Head>
                <title>{title}</title>
                {description && <meta name="description" content={description} />}
            </Head>

            <SiteHeader user={user} showNav={showNav} />

            <main className="flex-1">{children}</main>

            <SiteFooter />
        </div>
    );
}
