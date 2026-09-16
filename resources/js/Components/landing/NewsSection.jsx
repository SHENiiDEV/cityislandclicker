import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar, Clock, Newspaper, Sparkles } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function NewsSection({ articles = [] }) {
    if (!articles || articles.length === 0) {
        return null;
    }

    return (
        <section id="news" className="relative px-4 py-16 sm:px-6 md:py-24">
            <div className="mx-auto max-w-7xl">
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-3 max-w-2xl">
                        <Badge tone="gold" className="border-2">
                            <Sparkles className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                            Dev Chronicles & Patch Notes
                        </Badge>
                        <h2 className="font-fun text-3xl font-black text-slate-900 sm:text-4xl">
                            Latest Island News & Strategy
                        </h2>
                        <p className="text-base text-slate-600 font-medium">
                            Read the latest announcements, balance updates, and masterclass strategy guides from the City Island developers.
                        </p>
                    </div>

                    <Button as={Link} href="/news" variant="outline" size="md" className="shrink-0 bg-white/70">
                        <Newspaper className="h-4 w-4" />
                        View All Articles
                    </Button>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {articles.slice(0, 3).map((article) => (
                        <article
                            key={article.id}
                            className="group flex flex-col justify-between rounded-[2rem] border-2 border-sky-100 bg-white/90 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-amber-300"
                        >
                            <div>
                                <div className={`h-28 w-full rounded-2xl bg-gradient-to-r ${article.image_gradient} flex items-center justify-between px-5 text-white shadow-inner mb-5`}>
                                    <span className="text-3xl transform group-hover:scale-110 transition-transform">
                                        {article.icon}
                                    </span>
                                    <Badge tone="gold" className="bg-white/20 border-white/30 text-white font-black text-[10px]">
                                        {article.category}
                                    </Badge>
                                </div>

                                <div className="flex items-center gap-3 text-xs font-bold text-slate-400 mb-2.5">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {article.published_at}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {article.read_time}
                                    </span>
                                </div>

                                <h3 className="font-fun text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                                    <Link href={`/news/${article.slug}`}>
                                        {article.title}
                                    </Link>
                                </h3>

                                <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium line-clamp-3 leading-relaxed">
                                    {article.summary}
                                </p>
                            </div>

                            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-[11px] font-bold text-slate-500">
                                    {article.author}
                                </span>
                                <Link
                                    href={`/news/${article.slug}`}
                                    className="inline-flex items-center gap-1 text-xs font-black text-amber-600 group-hover:translate-x-1 transition-transform"
                                >
                                    Read <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
}
