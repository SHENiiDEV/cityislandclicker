import React from 'react';
import SiteLayout from '../Layouts/SiteLayout';
import HeroSection from '../Components/landing/HeroSection';
import LiveStats from '../Components/landing/LiveStats';
import HowItWorks from '../Components/landing/HowItWorks';
import FeatureGrid from '../Components/landing/FeatureGrid';
import CityShowcase from '../Components/landing/CityShowcase';
import NewsSection from '../Components/landing/NewsSection';
import FaqSection from '../Components/landing/FaqSection';
import CtaBanner from '../Components/landing/CtaBanner';

export default function Landing({ stats = {}, faq = [], articles = [], auth = {} }) {
    const user = auth?.user ?? null;

    return (
        <SiteLayout
            title="City Island Clicker — build your dream tropical metropolis"
            description="Tap to mine gold, raise resorts, wind farms and a spaceport, and keep earning while you are offline. A Laravel + React idle city builder."
            user={user}
        >
            {/* Soft ocean atmosphere behind the city-building story. */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute left-[-8%] top-[12%] h-64 w-64 rounded-full bg-white/35 blur-3xl" />
                <div className="absolute right-[-8%] top-[42%] h-96 w-96 rounded-full bg-amber-100/25 blur-3xl" />
                <div className="absolute bottom-[-10%] left-[20%] h-80 w-80 rounded-full bg-sky-300/15 blur-3xl" />
            </div>

            <div className="relative z-10">
                <HeroSection stats={stats} user={user} />
                <LiveStats stats={stats} />
                <HowItWorks />
                <FeatureGrid />
                <CityShowcase />
                <NewsSection articles={articles} />
                <FaqSection items={faq} />
                <CtaBanner user={user} />
            </div>
        </SiteLayout>
    );
}
