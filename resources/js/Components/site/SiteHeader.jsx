import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { LogIn, Menu, Play, UserPlus, X } from 'lucide-react';
import Button from '../ui/Button';
import Logo from './Logo';

const NAV_LINKS = [
    { href: '/news', label: 'News & Updates', isRoute: true },
    { href: '/#how-it-works', label: 'How to play' },
    { href: '/#features', label: 'Features' },
    { href: '/#city', label: 'Your city' },
    { href: '/#faq', label: 'FAQ' },
];

export default function SiteHeader({ user = null, showNav = true }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 border-b border-sky-100/80 bg-white/75 shadow-[0_8px_22px_-20px_rgb(15_23_42_/_0.45)] backdrop-blur-xl">
            <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
                <Link href="/" className="rounded-2xl" aria-label="City Island Clicker — home">
                    <Logo />
                </Link>

                {showNav && (
                    <nav className="hidden items-center gap-8 text-sm font-bold text-slate-600 md:flex">
                        {NAV_LINKS.map((link) => (
                            link.isRoute ? (
                                <Link key={link.href} href={link.href} className="transition-colors hover:text-sky-600">
                                    {link.label}
                                </Link>
                            ) : (
                                <a key={link.href} href={link.href} className="transition-colors hover:text-sky-600">
                                    {link.label}
                                </a>
                            )
                        ))}
                    </nav>
                )}

                <div className="flex items-center gap-2">
                    {user ? (
                        <Button as={Link} href="/play" size="sm" variant="amber">
                            <Play className="h-4 w-4 fill-current" />
                            Resume as {user.name}
                        </Button>
                    ) : (
                        <>
                            <Button as={Link} href="/login" size="sm" variant="ghost" className="hidden sm:inline-flex">
                                <LogIn className="h-4 w-4" />
                                Log in
                            </Button>
                            <Button as={Link} href="/register" size="sm" variant="green">
                                <UserPlus className="h-4 w-4" />
                                Register
                            </Button>
                        </>
                    )}

                    {showNav && (
                        <button
                            type="button"
                            onClick={() => setMenuOpen((open) => !open)}
                            aria-expanded={menuOpen}
                            aria-label="Toggle navigation"
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200 md:hidden"
                        >
                            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    )}
                </div>
            </div>

            {showNav && menuOpen && (
                <nav className="border-t-2 border-sky-100 bg-white/95 px-4 py-3 md:hidden">
                    <ul className="flex flex-col">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                {link.isRoute ? (
                                    <Link
                                        href={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="block rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-700"
                                    >
                                        {link.label}
                                    </Link>
                                ) : (
                                    <a
                                        href={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="block rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-700"
                                    >
                                        {link.label}
                                    </a>
                                )}
                            </li>
                        ))}
                        <li>
                            <Link
                                href="/login"
                                className="block rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-700 sm:hidden"
                            >
                                Log in
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}
