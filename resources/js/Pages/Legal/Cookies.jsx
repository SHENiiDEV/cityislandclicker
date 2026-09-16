import React from 'react';
import LegalLayout from '../../Layouts/LegalLayout';

const SECTIONS = [
    {
        title: 'What Are Cookies?',
        body: 'Cookies and local storage tokens are small text files placed on your device by websites you visit. They are widely used to make websites work efficiently, persist player state, and provide security authentication.',
    },
    {
        title: 'Essential & Strictly Necessary Cookies',
        body: 'These cookies are fundamental for the operation of City Island Clicker:\n• Session & Auth Tokens: Maintain your active login status securely across page transitions.\n• CSRF Protection Tokens: Defend your account against Cross-Site Request Forgery exploits.\n• Game Offline Progression Cache: Save temporary click batches and offline progression timestamp locally in your browser storage.',
    },
    {
        title: 'Analytical & Performance Cookies',
        body: 'We may utilize aggregated, privacy-preserving performance metrics to understand game loading times, rendering frame rates (FPS), and sync latency to optimize server responsiveness.',
    },
    {
        title: 'Managing Your Cookie Preferences',
        body: 'You can configure your browser settings to block or notify you about cookies. Please note that disabling strictly necessary cookies will prevent you from logging into your account or saving your island progress.',
    },
];

export default function Cookies() {
    return (
        <LegalLayout
            title="Cookie Policy — City Island Clicker"
            emoji="🍪"
            heading="Cookie & Storage Policy"
            updatedAt="September 16, 2026"
            sections={SECTIONS}
            currentPath="/cookies"
        />
    );
}
