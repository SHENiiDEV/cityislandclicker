import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, Calendar, Clock, Newspaper, Sparkles, User } from 'lucide-react';
import SiteLayout from '../../Layouts/SiteLayout';
import Badge from '../../Components/ui/Badge';

export default function NewsIndex({ articles = [] }) {
    const { auth = {} } = usePage().props;
    const user = auth?.user ?? null;

    return (
        <SiteLayout
            title="News & Updates — City Island Clicker"
            description="Discover the latest patch notes, strategy guides, community spotlights, and game update chronicles."
            user={user}
        >
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
                    <Badge tone="gold" className="border-2">
                        <Sparkles className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                        Official Dev Blog & Chronicles
                    </Badge>
                    <h1 className="font-fun text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
                        Island News & Patch Notes
                    </h1>
                    <p className="text-base text-slate-600 font-medium">
                        Stay updated with our latest game mechanics, economy balancing, anti-cheat upgrades, and high-yield mayor guides.
                    </p>
                </div>

                {/* Featured / Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {articles.map((article) => (
                        <article
                            key={article.id}
                            className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border-2 border-sky-100 bg-white/90 p-6 sm:p-8 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-amber-300"
                        >
                            <div>
                                {/* Card Header Banner */}
                                <div className={`h-36 w-full rounded-2xl bg-gradient-to-r ${article.image_gradient} flex items-center justify-between p-6 text-white shadow-inner mb-6 relative overflow-hidden`}>
                                    <div className="text-4xl sm:text-5xl transform group-hover:scale-110 transition-transform duration-300">
                                        {article.icon}
                                    </div>
                                    <Badge tone="gold" className="bg-white/20 border-white/30 text-white font-black backdrop-blur-md">
                                        {article.category}
                                    </Badge>
                                </div>

                                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-3">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3.5 w-3.5" />
                                        {article.published_at}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3.5 w-3.5" />
                                        {article.read_time}
                                    </span>
                                </div>

                                <h2 className="font-fun text-xl sm:text-2xl font-black text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                                    <Link href={`/news/${article.slug}`}>
                                        {article.title}
                                    </Link>
                                </h2>

                                <p className="mt-3 text-sm text-slate-600 font-medium leading-relaxed">
                                    {article.summary}
                                </p>
                            </div>

                            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                                    <User className="h-3.5 w-3.5 text-slate-400" />
                                    {article.author}
                                </span>

                                <Link
                                    href={`/news/${article.slug}`}
                                    className="inline-flex items-center gap-1.5 text-xs font-black text-amber-600 group-hover:translate-x-1 transition-transform"
                                >
                                    Read Article <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </SiteLayout>
    );
}
