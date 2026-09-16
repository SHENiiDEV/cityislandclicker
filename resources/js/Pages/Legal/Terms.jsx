import React from 'react';
import LegalLayout from '../../Layouts/LegalLayout';

const SECTIONS = [
    {
        title: 'Agreement to Terms',
        body: 'By registering an account, accessing, or playing City Island Clicker, you enter into a legally binding agreement with the operating entity and agree to comply with these Terms of Service. If you do not agree to all terms, you must immediately discontinue use of the game.',
    },
    {
        title: 'Eligibility & Sanctioned Jurisdictions',
        body: 'You must be at least 18 years of age (or the legal age of majority in your jurisdiction) to make purchases on this platform. In strict compliance with international sanctions, anti-money laundering (AML) laws, and payment network guidelines, registration and account top-ups are strictly prohibited for residents of restricted jurisdictions including: Sudan, Dem. Rep. of the Congo, Iran, Mali, Myanmar (Burma), North Korea, South Sudan, Syria, Yemen, Afghanistan, Belarus, Central African Republic, Cuba, Haiti, Iraq, Russia, Somalia, Venezuela, and Zimbabwe.',
    },
    {
        title: 'Virtual Goods & Digital Currency',
        body: 'All virtual currency (Coins, Gems) and digital infrastructure items purchased or earned in the game constitute a limited, non-exclusive, non-transferable, and revocable license to access digital game features. Virtual assets carry no real-world monetary value, cannot be redeemed for fiat currency or tangible goods, and cannot be traded outside the official game platform.',
    },
    {
        title: 'Payment Processing & PCI DSS Compliance',
        body: 'All card payments (Visa, Mastercard) are processed through certified, PCI DSS Level 1 compliant payment gateways with 256-bit SSL encryption. We do not store raw card numbers or CVV codes on our servers. By initiating a purchase, you authorize our processing partners to charge the designated payment method.',
    },
    {
        title: 'Anti-Cheat, Bot Macro Restrictions & Fair Play',
        body: 'We deploy algorithmic anti-cheat mechanisms and server-side rate limits (capped at physical limits of 18 taps/sec). The use of automated scripts, third-party macro bots, packet tampering, or exploiting software bugs is strictly prohibited. Violations will result in immediate and permanent account termination without compensation.',
    },
    {
        title: 'Account Security & Responsibilities',
        body: 'You are solely responsible for maintaining the confidentiality of your account credentials. Any activity conducted through your authenticated account is presumed to be authorized by you.',
    },
    {
        title: 'Limitation of Liability & Service Availability',
        body: 'The service is provided on an "as-is" and "as-available" basis. We do not warrant uninterrupted or error-free gameplay and shall not be held liable for temporary server downtime, maintenance, or data loss caused by network disruptions.',
    },
    {
        title: 'Governing Law & Dispute Resolution',
        body: 'These Terms are governed by and construed in accordance with the laws of Cyprus and applicable European Union regulations. Any disputes arising from these Terms shall be resolved in the competent courts of Limassol, Cyprus.',
    },
];

export default function Terms() {
    return (
        <LegalLayout
            title="Terms & Conditions — City Island Clicker"
            emoji="📜"
            heading="Terms of Service & Conditions"
            updatedAt="September 16, 2026"
            sections={SECTIONS}
            currentPath="/terms"
        />
    );
}
