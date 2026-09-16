import React from 'react';
import LegalLayout from '../../Layouts/LegalLayout';

const SECTIONS = [
    {
        title: 'Information We Collect',
        body: 'When you create an account, we collect registration details required for identification and compliance, including: your full name, email address, phone number, date of birth, and physical address (street, city, country, postcode). During gameplay, we automatically record game session timestamps, upgrade acquisitions, synchronized batch click data, IP addresses, and device identifiers.',
    },
    {
        title: 'Legal Basis & Purpose of Processing (GDPR Compliance)',
        body: 'We process personal data under the General Data Protection Regulation (GDPR) based on:\n• Performance of Contract: To deliver game mechanics, save state, and process in-game purchases.\n• Legal Compliance: To verify user eligibility, exclude sanctioned jurisdictions, and prevent financial fraud.\n• Legitimate Interests: To detect bot macros and unauthorized automation via our anti-cheat engine.',
    },
    {
        title: 'Payment Data & PCI Security',
        body: 'Payment transactions for virtual top-ups are routed directly through PCI DSS Level 1 certified payment service providers. We do not store or process primary account numbers (PAN) or sensitive cardholder authentication data on our servers.',
    },
    {
        title: 'Data Retention & Storage',
        body: 'Your account data is stored securely in encrypted databases. We retain game progression and account information for as long as your account remains active or as required by statutory accounting and tax retention regulations.',
    },
    {
        title: 'Data Subject Rights',
        body: 'Under European data protection laws, you possess the right to:\n• Access and receive a copy of your personal data.\n• Request rectification of inaccurate information.\n• Request the erasure ("Right to be Forgotten") of your account.\n• Object to or restrict specific processing operations.\nTo exercise these rights, email our Data Protection Officer at privacy@cityislandclicker.com.',
    },
    {
        title: 'Third-Party Disclosures',
        body: 'We do not sell, rent, or monetize your personal data. Data is shared strictly with infrastructure providers (hosting, payment processors, anti-fraud services) operating under standard data processing agreements.',
    },
];

export default function Privacy() {
    return (
        <LegalLayout
            title="Privacy Policy — City Island Clicker"
            emoji="🔒"
            heading="Privacy & Data Protection Policy"
            updatedAt="September 16, 2026"
            sections={SECTIONS}
            currentPath="/privacy"
        />
    );
}
