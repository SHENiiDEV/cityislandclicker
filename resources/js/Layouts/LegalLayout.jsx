import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Building2, Mail, MapPin, ShieldCheck, ArrowLeft } from 'lucide-react';
import SiteLayout from './SiteLayout';

const LEGAL_TABS = [
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/refunds', label: 'Refund Policy' },
    { href: '/cookies', label: 'Cookie Policy' },
];

/** Shared frame for all legal and compliance documents. */
export default function LegalLayout({ title, emoji, heading, updatedAt, sections = [], currentPath = '/terms' }) {
    const { company = {} } = usePage().props;

    const companyName = company.name || 'City Island Games Ltd.';
    const companyNumber = company.number || 'HE 492019';
    const companyAddress = company.address || 'Arch. Makariou III, 284, Fortuna Court, Block B, 2nd floor, 3105, Limassol, Cyprus';
    const companyEmail = company.email || 'support@cityislandclicker.com';

    return (
        <SiteLayout title={title} showNav={true}>
            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
                
                {/* Back to Home & Legal Navigation */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-sky-600 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>

                    {/* Legal Tabs */}
                    <nav className="flex flex-wrap gap-2">
                        {LEGAL_TABS.map((tab) => {
                            const active = currentPath === tab.href;
                            return (
                                <Link
                                    key={tab.href}
                                    href={tab.href}
                                    className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                                        active
                                            ? 'bg-amber-400 text-amber-950 shadow-sm'
                                            : 'bg-white/80 text-slate-600 hover:bg-white hover:text-slate-900 border border-sky-100'
                                    }`}
                                >
                                    {tab.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Main Article Document */}
                <article className="rounded-[2.5rem] border-2 border-sky-100 bg-white/95 p-6 shadow-xl backdrop-blur-md sm:p-12">
                    <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                        <div className="flex items-center gap-4">
                            <span
                                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-amber-500 bg-amber-400 text-2xl shadow-sm"
                                aria-hidden="true"
                            >
                                {emoji}
                            </span>
                            <div>
                                <h1 className="font-fun text-2xl font-black text-slate-900 sm:text-3xl">{heading}</h1>
                                <p className="text-xs font-medium text-slate-500 mt-1">Official Document · Last updated: {updatedAt}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 border border-emerald-200">
                            <ShieldCheck className="h-4 w-4 text-emerald-600" />
                            <span>Verified Compliance</span>
                        </div>
                    </header>

                    {/* Content Sections */}
                    <div className="space-y-8 text-sm leading-relaxed text-slate-600">
                        {sections.map((section, index) => (
                            <section key={section.title} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 sm:p-6 transition-all hover:border-sky-100 hover:bg-slate-50">
                                <h2 className="mb-2.5 text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-200 text-xs font-black text-amber-900">
                                        {index + 1}
                                    </span>
                                    {section.title}
                                </h2>
                                <div className="text-slate-600 leading-relaxed font-normal whitespace-pre-line">
                                    {section.body}
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* Official Operator Block */}
                    <div className="mt-10 rounded-2xl border-2 border-amber-200 bg-amber-50/50 p-6">
                        <h3 className="text-xs font-black uppercase tracking-wider text-amber-900 mb-3 flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-amber-600" />
                            Contracting Entity & Data Controller
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                            <div>
                                <p className="font-bold text-slate-900">{companyName}</p>
                                <p className="text-slate-500">Registration: {companyNumber}</p>
                            </div>
                            <div>
                                <p className="text-slate-600">{companyAddress}</p>
                                <p className="mt-1">
                                    Contact:{' '}
                                    <a href={`mailto:${companyEmail}`} className="font-bold text-sky-700 hover:underline">
                                        {companyEmail}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Document Footer */}
                    <footer className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-6 text-xs font-bold text-slate-600">
                        <span>Have questions about our terms?</span>
                        <div className="flex items-center gap-3">
                            <a href={`mailto:${companyEmail}`} className="text-sky-600 hover:underline">
                                Contact Legal Support
                            </a>
                            <span>•</span>
                            <Link href="/register" className="text-amber-600 hover:underline">
                                Play City Island
                            </Link>
                        </div>
                    </footer>
                </article>
            </div>
        </SiteLayout>
    );
}
