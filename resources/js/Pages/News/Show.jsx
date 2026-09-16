import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Calendar, Clock, Sparkles, User, Share2 } from 'lucide-react';
import SiteLayout from '../../Layouts/SiteLayout';
import Badge from '../../Components/ui/Badge';
import Button from '../../Components/ui/Button';

export default function NewsShow({ article = {}, relatedArticles = [] }) {
    const { auth = {} } = usePage().props;
    const user = auth?.user ?? null;

    return (
        <SiteLayout
            title={`${article.title} — City Island News`}
            description={article.summary}
            user={user}
        >
            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
                
                {/* Back button */}
                <div className="mb-6">
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-sky-600 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to all news
                    </Link>
                </div>

                {/* Main Article Container */}
                <article className="rounded-[2.5rem] border-2 border-sky-100 bg-white/95 p-6 sm:p-12 shadow-xl backdrop-blur-md">
                    
                    {/* Header Banner */}
                    <div className={`h-48 sm:h-64 w-full rounded-3xl bg-gradient-to-r ${article.image_gradient} flex flex-col justify-between p-6 sm:p-8 text-white shadow-inner mb-8 relative overflow-hidden`}>
                        <div className="flex items-center justify-between">
                            <Badge tone="gold" className="bg-white/20 border-white/30 text-white font-black backdrop-blur-md">
                                {article.category}
                            </Badge>
                            <span className="text-4xl sm:text-6xl">{article.icon}</span>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-bold text-white/90 backdrop-blur-xs bg-black/20 w-fit px-3 py-1.5 rounded-xl">
                            <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {article.published_at}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {article.read_time}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <User className="h-3.5 w-3.5" />
                                {article.author}
                            </span>
                        </div>
                    </div>

                    <h1 className="font-fun text-2xl sm:text-4xl font-black text-slate-900 leading-tight mb-6">
                        {article.title}
                    </h1>

                    <div className="rounded-2xl border-l-4 border-amber-400 bg-amber-50/60 p-4 sm:p-5 text-sm font-medium text-slate-700 leading-relaxed mb-8">
                        {article.summary}
                    </div>

                    {/* Markdown / Body rendering */}
                    <div className="prose prose-slate max-w-none space-y-6 text-sm sm:text-base leading-relaxed text-slate-700">
                        {article.content?.split('\n\n').map((block, idx) => {
                            if (block.startsWith('### ')) {
                                return (
                                    <h3 key={idx} className="font-fun text-xl sm:text-2xl font-black text-slate-900 mt-6 mb-2">
                                        {block.replace('### ', '')}
                                    </h3>
                                );
                            }
                            if (block.startsWith('#### ')) {
                                return (
                                    <h4 key={idx} className="text-lg font-black text-slate-800 mt-5 mb-2">
                                        {block.replace('#### ', '')}
                                    </h4>
                                );
                            }
                            if (block.startsWith('* ') || block.startsWith('1. ')) {
                                return (
                                    <div key={idx} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 space-y-2 font-medium">
                                        {block.split('\n').map((line, lIdx) => (
                                            <p key={lIdx} className="text-slate-700">
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                );
                            }
                            return <p key={idx} className="text-slate-600 leading-relaxed">{block}</p>;
                        })}
                    </div>

                    {/* CTA Banner inside Article */}
                    <div className="mt-12 rounded-3xl bg-gradient-to-r from-amber-400 to-orange-500 p-6 sm:p-8 text-amber-950 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
                        <div>
                            <h3 className="font-fun text-xl sm:text-2xl font-black text-slate-950">
                                Ready to build your island?
                            </h3>
                            <p className="text-xs sm:text-sm font-bold text-amber-900 mt-1">
                                Jump into City Island Clicker and try the latest features today!
                            </p>
                        </div>
                        <Button as={Link} href="/play" size="lg" variant="navy" className="shrink-0 bg-slate-950 text-white hover:bg-slate-900 shadow-xl">
                            Play Now
                        </Button>
                    </div>

                </article>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <div className="mt-14">
                        <h2 className="font-fun text-2xl font-black text-slate-900 mb-6">
                            More Articles & Updates
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedArticles.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={`/news/${rel.slug}`}
                                    className="group flex flex-col justify-between rounded-3xl border border-sky-100 bg-white/90 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div>
                                        <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
                                            <span>{rel.category}</span>
                                            <span>{rel.read_time}</span>
                                        </div>
                                        <h3 className="font-fun text-base font-black text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                                            {rel.title}
                                        </h3>
                                    </div>
                                    <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-600">
                                        Read more <ArrowRight className="h-3.5 w-3.5" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </SiteLayout>
    );
}
