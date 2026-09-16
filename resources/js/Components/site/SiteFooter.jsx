import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Building2, Mail, MapPin, ShieldCheck, FileText, Lock, Sparkles } from 'lucide-react';
import Logo from './Logo';

export default function SiteFooter() {
    const { company = {} } = usePage().props;

    const companyName = company.name || 'City Island Games Ltd.';
    const companyNumber = company.number || 'HE 492019';
    const companyAddress = company.address || 'Arch. Makariou III, 284, Fortuna Court, Block B, 2nd floor, 3105, Limassol, Cyprus';
    const companyEmail = company.email || 'support@cityislandclicker.com';

    return (
        <footer className="border-t-2 border-sky-100 bg-slate-900 text-slate-300">
            {/* Main Footer Content */}
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
                    
                    {/* Brand & Overview */}
                    <div className="space-y-4 lg:col-span-4">
                        <Link href="/" className="inline-block" aria-label="City Island Clicker — Home">
                            <Logo />
                        </Link>
                        <p className="text-sm leading-relaxed text-slate-400">
                            The next-generation tropical city builder & clicker game. Expand your skyline, invest in high-yield island infrastructure, and claim 24/7 automated offline earnings.
                        </p>
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                            <Sparkles className="h-4 w-4" />
                            <span>Powered by Laravel 11 · Inertia.js · React</span>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="space-y-4 lg:col-span-2 lg:col-start-6">
                        <h3 className="text-xs font-black uppercase tracking-wider text-white">Explore</h3>
                        <ul className="space-y-2.5 text-sm font-medium text-slate-400">
                            <li>
                                <Link href="/play" className="transition-colors hover:text-amber-400">
                                    Play Game
                                </Link>
                            </li>
                            <li>
                                <Link href="/news" className="transition-colors hover:text-amber-400">
                                    News & Updates
                                </Link>
                            </li>
                            <li>
                                <a href="/#how-it-works" className="transition-colors hover:text-amber-400">
                                    How To Play
                                </a>
                            </li>
                            <li>
                                <a href="/#features" className="transition-colors hover:text-amber-400">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="/#faq" className="transition-colors hover:text-amber-400">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="space-y-4 lg:col-span-2">
                        <h3 className="text-xs font-black uppercase tracking-wider text-white">Legal & Compliance</h3>
                        <ul className="space-y-2.5 text-sm font-medium text-slate-400">
                            <li>
                                <Link href="/terms" className="transition-colors hover:text-sky-400">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="transition-colors hover:text-sky-400">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/refunds" className="transition-colors hover:text-sky-400">
                                    Refund Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className="transition-colors hover:text-sky-400">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company Operator Details */}
                    <div className="space-y-4 lg:col-span-4">
                        <h3 className="text-xs font-black uppercase tracking-wider text-white">Operator Information</h3>
                        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-xs leading-relaxed text-slate-400 space-y-2.5 shadow-inner">
                            <div className="flex items-start gap-2 text-slate-300 font-bold">
                                <Building2 className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                                <div>
                                    <div>{companyName}</div>
                                    <div className="text-[11px] font-medium text-slate-400">Registration: {companyNumber}</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 shrink-0 text-sky-400 mt-0.5" />
                                <span>{companyAddress}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 shrink-0 text-emerald-400" />
                                <a href={`mailto:${companyEmail}`} className="text-slate-300 hover:text-white transition-colors underline-offset-2 hover:underline">
                                    {companyEmail}
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Payment Providers & Security Verification */}
                <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col items-center justify-between gap-6 lg:flex-row">
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-3 sm:gap-6 w-full sm:w-auto">
                        {/* Visa */}
                        <div className="flex h-12 items-center justify-center rounded-xl bg-white px-3.5 py-1 shadow-sm transition-transform hover:scale-105">
                            <img 
                                src="/images/payments/visa.png" 
                                alt="Visa" 
                                className="h-6 sm:h-7 w-auto object-contain" 
                            />
                        </div>

                        {/* Mastercard */}
                        <div className="flex h-12 items-center justify-center rounded-xl bg-white px-3.5 py-1 shadow-sm transition-transform hover:scale-105">
                            <img 
                                src="/images/payments/mastercard.png" 
                                alt="Mastercard" 
                                className="h-6 sm:h-7 w-auto object-contain" 
                            />
                        </div>

                        {/* PCI DSS Compliant */}
                        <div className="flex h-12 items-center justify-center rounded-xl bg-white px-3.5 py-1 shadow-sm transition-transform hover:scale-105">
                            <img 
                                src="/images/payments/pci-dss.png" 
                                alt="PCI DSS Compliant" 
                                className="h-7 sm:h-8 w-auto object-contain" 
                            />
                        </div>

                        {/* 256-Bit SSL */}
                        <div className="flex h-12 items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-[11px] sm:text-xs font-bold text-emerald-300">
                            <Lock className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                            <span>256-BIT SSL</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                        <ShieldCheck className="h-4 w-4 text-emerald-400" />
                        <span>Certified Secure Checkout & Anti-Fraud Protection</span>
                    </div>
                </div>

                {/* Disclaimer & Copyright */}
                <div className="mt-8 border-t border-slate-800/60 pt-6 text-center lg:text-left flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between text-xs text-slate-500">
                    <p className="max-w-3xl leading-relaxed">
                        <strong className="text-slate-400">Legal Disclaimer:</strong> City Island Clicker is an online entertainment game and casual city-building simulation. All virtual currencies (Coins and Gems) are purely digital goods for in-game progression and carry no monetary redemption value outside of the platform.
                    </p>
                    <div className="shrink-0 text-slate-400 font-medium">
                        © {new Date().getFullYear()} {companyName}. All rights reserved.
                    </div>
                </div>

            </div>
        </footer>
    );
}
