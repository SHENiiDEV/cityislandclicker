import React from 'react';
import { Cloud, CloudOff, RefreshCw } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

const STATES = {
    syncing: { Icon: RefreshCw, className: 'text-sky-500 animate-spin', label: 'Saving progress…' },
    saved: { Icon: Cloud, className: 'text-emerald-500', label: 'Progress saved' },
    error: { Icon: CloudOff, className: 'text-rose-500', label: 'Connection issue — retrying' },
    idle: { Icon: Cloud, className: 'text-slate-400', label: 'Synchronised' },
};

export default function SyncIndicator() {
    const syncStatus = useGameStore((state) => state.syncStatus);
    const { Icon, className, label } = STATES[syncStatus] ?? STATES.idle;

    return (
        <span title={label} className="flex items-center" role="status" aria-label={label}>
            <Icon className={`h-4 w-4 ${className}`} />
        </span>
    );
}
