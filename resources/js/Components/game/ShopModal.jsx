import React, { useState } from 'react';
import axios from 'axios';
import confetti from 'canvas-confetti';
import { Check, Coins, Crown, Gem, Landmark, Loader2, Rocket, ShieldCheck, Sparkles } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { formatNumber } from '../../lib/format';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import IconTile from '../ui/IconTile';

const PACKAGE_ICONS = { Sparkles, Landmark, Crown, Rocket };

export default function ShopModal({ packages = [] }) {
    const isShopOpen = useGameStore((state) => state.isShopOpen);
    const setShopOpen = useGameStore((state) => state.setShopOpen);
    const topupSuccess = useGameStore((state) => state.topupSuccess);

    const [processingKey, setProcessingKey] = useState(null);
    const [error, setError] = useState(null);
    const [receipt, setReceipt] = useState(null);

    const close = () => {
        setShopOpen(false);
        setReceipt(null);
        setError(null);
    };

    const handleBuy = async (pkg) => {
        setProcessingKey(pkg.key);
        setError(null);

        try {
            const checkout = await axios.post('/api/payment/checkout', { package_key: pkg.key });
            if (!checkout.data?.success) {
                setError('We could not start the checkout. Please try again.');
                return;
            }

            const orderId = checkout.data.order_id;

            // Sandbox gateway round-trip.
            await new Promise((resolve) => setTimeout(resolve, 1200));

            const payment = await axios.post('/api/payment/simulate-success', {
                order_id: orderId,
                payer_status: 'VERIFIED',
                payment_source: 'SANDBOX_CARD_4242',
            });

            if (!payment.data?.success) {
                setError('The payment was declined by the sandbox gateway.');
                return;
            }

            confetti({ particleCount: 90, spread: 72, origin: { y: 0.6 } });
            topupSuccess(pkg.gems, pkg.bonus_coins);
            setReceipt({ orderId, pkg });
        } catch (exception) {
            console.error('Top-up failed', exception);
            setError('Something went wrong while processing the payment.');
        } finally {
            setProcessingKey(null);
        }
    };

    return (
        <Modal
            open={isShopOpen}
            onClose={close}
            size="lg"
            title="Mayor's gem store"
            description="Instant crediting via the seamless wallet API"
            icon={
                <IconTile tone="gem" size="lg">
                    <Gem className="h-7 w-7 fill-cyan-300 text-cyan-600" />
                </IconTile>
            }
        >
            {receipt ? (
                <div className="py-6 text-center">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <Check className="h-8 w-8" />
                    </div>
                    <h3 className="font-fun text-xl font-black text-slate-900">Payment completed</h3>
                    <p className="mt-1 text-sm text-slate-600">
                        Credited{' '}
                        <span className="font-black text-cyan-600">+{receipt.pkg.gems} gems</span> and{' '}
                        <span className="font-black text-amber-600">
                            +{formatNumber(receipt.pkg.bonus_coins)} coins
                        </span>
                        .
                    </p>
                    <p className="mt-2 font-mono text-xs text-slate-400">Order {receipt.orderId}</p>

                    <Button variant="green" size="md" className="mt-6" onClick={close}>
                        Back to the island
                    </Button>
                </div>
            ) : (
                <>
                    {error && (
                        <p className="mb-3 rounded-xl border-2 border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700">
                            {error}
                        </p>
                    )}

                    <div className="custom-scrollbar grid max-h-[60vh] grid-cols-1 gap-3.5 overflow-y-auto pr-1 sm:grid-cols-2">
                        {packages.map((pkg) => {
                            const Icon = PACKAGE_ICONS[pkg.icon] ?? Sparkles;
                            const busy = processingKey === pkg.key;

                            return (
                                <div
                                    key={pkg.key}
                                    className="relative flex flex-col justify-between rounded-2xl border-2 border-sky-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md"
                                >
                                    {pkg.badge && (
                                        <Badge tone="solidGold" className="absolute -top-2.5 right-3 px-2 py-0.5 text-[10px]">
                                            {pkg.badge}
                                        </Badge>
                                    )}

                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <IconTile tone="gold" size="sm">
                                                <Icon className="h-5 w-5" />
                                            </IconTile>
                                            <h4 className="text-sm font-black text-slate-800">{pkg.name}</h4>
                                        </div>

                                        <p className="mb-3 text-xs text-slate-500">{pkg.description}</p>

                                        <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-2">
                                            <span className="flex items-center gap-1 text-sm font-black text-cyan-600">
                                                <Gem className="h-4 w-4 fill-cyan-300" />+{pkg.gems}
                                            </span>
                                            <span className="text-slate-300">|</span>
                                            <span className="flex items-center gap-1 text-sm font-black text-amber-600">
                                                <Coins className="h-4 w-4 fill-amber-400" />+
                                                {formatNumber(pkg.bonus_coins)}
                                            </span>
                                        </div>
                                    </div>

                                    <Button
                                        block
                                        size="sm"
                                        variant="amber"
                                        disabled={Boolean(processingKey)}
                                        onClick={() => handleBuy(pkg)}
                                    >
                                        {busy ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Processing…
                                            </>
                                        ) : (
                                            <>Buy for ${pkg.price}</>
                                        )}
                                    </Button>
                                </div>
                            );
                        })}
                    </div>

                    <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-400">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                        Sandbox payments — no real card is ever charged.
                    </p>
                </>
            )}
        </Modal>
    );
}
