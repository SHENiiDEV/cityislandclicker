import React from 'react';
import LegalLayout from '../../Layouts/LegalLayout';

const SECTIONS = [
    {
        title: 'Digital Goods & Immediate Delivery',
        body: 'City Island Clicker provides intangible, digital gameplay goods (Coins, Gems, Boosters, and Upgrades). When you initiate and complete a top-up transaction, the digital goods are delivered instantaneously to your player account.',
    },
    {
        title: 'Statutory Right of Withdrawal & Waiver',
        body: 'Under applicable consumer protection laws (including EU Consumer Rights Directive), you acknowledge and express your consent that the supply of digital content begins immediately upon purchase completion, and you hereby explicitly waive your 14-day statutory right of withdrawal once the digital goods have been credited to your balance.',
    },
    {
        title: 'Refund Eligibility Conditions',
        body: 'Refunds may be evaluated on a case-by-case basis strictly under the following exceptional circumstances:\n• Duplicate Charges: A technical error caused multiple billing events for a single checkout request.\n• Uncredited Goods: Funds were deducted from your payment card, but the corresponding gems or coins failed to credit to your account within 24 hours due to verified technical failure.\n• Unauthorized Transactions: Fraudulent card usage proven by official bank documentation submitted within 48 hours.',
    },
    {
        title: 'Chargebacks & Dispute Policy',
        body: 'Initiating an unverified chargeback or payment dispute through your card issuer without prior contact with our customer support team will result in automatic freezing of your game account and rollback of all associated island progress.',
    },
    {
        title: 'How to Request a Refund',
        body: 'To request an investigation into a payment issue, contact our billing department at support@cityislandclicker.com with your transaction reference number, account email, date of payment, and description of the issue. Requests are reviewed within 3 business days.',
    },
];

export default function Refunds() {
    return (
        <LegalLayout
            title="Refund Policy — City Island Clicker"
            emoji="💳"
            heading="Refund & Cancellation Policy"
            updatedAt="September 16, 2026"
            sections={SECTIONS}
            currentPath="/refunds"
        />
    );
}
