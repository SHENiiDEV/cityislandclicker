import {
    Anchor,
    Atom,
    Compass,
    Hammer,
    Hotel,
    Landmark,
    Pickaxe,
    Rocket,
    Sparkles,
    Trees,
    Truck,
    Wind,
    Zap,
} from 'lucide-react';

/** Maps the `icon` column from the upgrades table onto a Lucide component. */
export const UPGRADE_ICONS = {
    Anchor,
    Atom,
    Compass,
    Hammer,
    Hotel,
    Landmark,
    Pickaxe,
    Rocket,
    Sparkles,
    Trees,
    Truck,
    Wind,
    Zap,
};

export function iconFor(name) {
    return UPGRADE_ICONS[name] ?? Hammer;
}
