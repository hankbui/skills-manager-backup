import { type Context, type CSSProperties, type JSX, type ReactNode } from "react";
import { type GalleryPhoto } from "./gallery.js";
import { type GrokTheme } from "./hooks.js";
import { type GrokRenderLimits } from "./render-limits.js";
/**
 * One product or place as a card or a row shows it.
 *
 * @kitUnlisted Only a host whose prompt lays out consumer pages teaches it.
 */
export interface ProductItem {
    /** Its name as the store or site lists it. */
    title: string;
    /** Its price as listed: `"$5,388"`, or a band for a place such as `"$$$"`. */
    price?: string;
    /** One short line on what sets it apart: `"Hand-turned kauri, made to order"`, `"Best value"`. */
    note?: string;
    /** Where it is sold or listed: `"The Oblist"`, `"Resy"`. */
    store?: string;
    /** The store's own small mark beside its name, as `asset:<name>`; its initial is drawn when unset. */
    storeMark?: string;
    /** Its rating out of 5, as the store lists it: `4.8`. */
    rating?: number;
    /** How many ratings that score is from: `212` or `"1.2k"`. */
    reviews?: number | string;
    /** Its photo: the `asset:<name>` the upload returned. Left out, the item shows no picture. */
    image?: string;
    /** What the photo shows, in a sentence; the title when unset. */
    alt?: string;
    /** One to three words that mark the one item the page recommends, such as `"My pick"`. */
    badge?: string;
    /** The item's own page at the store or site; the whole card or row opens it in a new tab. */
    href?: string;
}
export interface ProductCardProps extends ProductItem {
    /** The photo's height in px: give every card in a row the same one so their crops match. 240 by default. */
    imageHeight?: number;
    /**
     * Several photos of the item, swiped through in the card in place of
     * `image`; one photo is shown as `image` is, and so is the first in a
     * `CardCarousel`, where the row is what swipes.
     */
    photos?: readonly GalleryPhoto[];
    /** The words on the card's link to `href`; `View <title>` by default. */
    viewLabel?: string;
    /**
     * A half-width card for a `CardGrid`, treated as a strip tile: the photo
     * at the top, then one line each for the name beside the badge, the price
     * and note, and the store with its score. The whole card opens `href`.
     */
    compact?: boolean;
}
export interface ProductRowsProps {
    /** The items in order, one row each with a square thumbnail. */
    items: readonly ProductItem[];
}
/**
 * One product or place as a raised card, led by its photo, or by several to
 * swipe through: the photos across the top, then its name with an optional
 * badge, its price and a short note, and the store it is sold at with its
 * stars and score. With `href` the card ends in a quiet pill that names the
 * item and opens its page in a new tab. Cards that share an `imageHeight`
 * share one crop.
 *
 * @kitUnlisted Only a host whose prompt lays out consumer pages teaches it.
 */
export declare function ProductCard(props: ProductCardProps): JSX.Element;
/**
 * Products or places as a list in one raised card: a square thumbnail per
 * row, the name with an optional badge, the price and a note, and the store
 * with its stars and score. A row with `href` opens the item's page in a new
 * tab and ends in a chevron. Every thumbnail shares one crop. No items draws
 * nothing.
 *
 * @kitUnlisted Only a host whose prompt lays out consumer pages teaches it.
 */
export declare function ProductRows(props: ProductRowsProps): JSX.Element | null;
