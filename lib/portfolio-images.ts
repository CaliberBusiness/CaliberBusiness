import fs from 'node:fs';
import path from 'node:path';

import {
    IT_FLAGS,
    LEDGER,
    LEDGER_ITEMS,
    PORTFOLIO_FEATURED,
    PORTFOLIO_GROUPS,
    PORTFOLIO_IMAGE_DIR,
    isEnabled,
    type LedgerItem,
    type PortfolioItem,
} from './it-solutions';

/**
 * SERVER ONLY. Resolves the portfolio against the real filesystem.
 *
 * The "no placeholder boxes, ever" rule is enforced here rather than by a
 * nullable field someone has to remember to unset: a Caliber card exists only
 * if its screenshot exists in /public. Dropping a .webp into the folder is the
 * whole publishing step, and no code path renders a card without one.
 *
 * The ledger ("Built by our IT lead") has no images at all, so nothing there
 * can go missing and nothing is filtered on disk -- only on its flag.
 *
 * Shared by ITPortfolio (what to render) and ITHero (whether "See the work"
 * has anywhere to go). One source of truth is the point: the hero used to key
 * its CTA off the showWork flag alone, which produced a dead #work anchor
 * whenever the flag was on but no screenshots had landed yet.
 *
 * Resolves at build time, since /it-solutions is statically generated. A newly
 * added screenshot appears on the next build, which is also when it would be
 * deployed.
 */

const publicDir = path.join(process.cwd(), 'public', PORTFOLIO_IMAGE_DIR);

function imageExists(file: string): boolean {
    try {
        return fs.statSync(path.join(publicDir, file)).isFile();
    } catch {
        // ENOENT, or the directory is absent entirely — either way, no card.
        return false;
    }
}

/** Public URL for a filename already confirmed to exist. */
export function portfolioImageSrc(file: string): string {
    return `/${PORTFOLIO_IMAGE_DIR}/${file}`;
}

export interface ResolvedPortfolioItem extends PortfolioItem {
    readonly src: string;
}

export interface ResolvedPortfolioGroup {
    readonly key: string;
    readonly label: string;
    readonly items: readonly ResolvedPortfolioItem[];
}

export interface ResolvedPortfolio {
    readonly featured: (typeof PORTFOLIO_FEATURED & { readonly src: string }) | null;
    readonly groups: readonly ResolvedPortfolioGroup[];
    readonly ledger: readonly LedgerItem[];
    readonly hasContent: boolean;
}

export function resolvePortfolio(): ResolvedPortfolio {
    const featured = imageExists(PORTFOLIO_FEATURED.image)
        ? { ...PORTFOLIO_FEATURED, src: portfolioImageSrc(PORTFOLIO_FEATURED.image) }
        : null;

    const groups = PORTFOLIO_GROUPS
        .filter((group) => isEnabled(group.requiresFlag))
        .map((group) => ({
            key: group.key,
            label: group.label,
            items: group.items
                .filter((item) => imageExists(item.image))
                .map((item) => ({ ...item, src: portfolioImageSrc(item.image) })),
        }))
        .filter((group) => group.items.length > 0);

    // Links only — nothing to check on disk, so the flag is the only gate.
    const ledger = isEnabled(LEDGER.requiresFlag, IT_FLAGS) ? LEDGER_ITEMS : [];

    return {
        featured,
        groups,
        ledger,
        hasContent: featured !== null || groups.length > 0 || ledger.length > 0,
    };
}
