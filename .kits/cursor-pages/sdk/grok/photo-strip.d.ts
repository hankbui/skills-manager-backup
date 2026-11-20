import type { JSX } from "react";
/** @kitUnlisted Only a host whose prompt lays out consumer pages teaches it. */
export interface PhotoStripItem {
    /** Its photo: the `asset:<name>` the upload returned. */
    image: string;
    /** What the photo shows, in a sentence; the title when unset. */
    alt?: string;
    /** Its name; left out, the tile is the photo alone. */
    title?: string;
    /** Its price as listed. */
    price?: string;
    /** One to three words on what sets it apart. */
    note?: string;
    /** Where it is sold or listed. */
    store?: string;
    /** The store's own small mark, as `asset:<name>`. */
    storeMark?: string;
    /** Its rating out of 5, as the store lists it. */
    rating?: number;
    /** How many ratings that score is from. */
    reviews?: number | string;
    /** The item's own page or the photo's source; the tile opens it in a new tab. */
    href?: string;
}
export interface PhotoStripProps {
    /** The tiles in order. */
    items: readonly PhotoStripItem[];
    /** Each tile's width in px. 150 by default. */
    tileWidth?: number;
    /** Each photo's height in px; every tile shares the crop. The tile's width by default. */
    imageHeight?: number;
}
/**
 * A row of photo tiles that scrolls sideways, fading at the edge with more
 * beyond: products as raised cards with a name, price, note and store line
 * under each photo, or a place's photos alone when the tiles have no title.
 * A product tile with `href` ends in a pill that names it and opens its page
 * in a new tab; a photo tile with `href` opens it on a tap. No tiles draws
 * nothing.
 *
 * @kitUnlisted Only a host whose prompt lays out consumer pages teaches it.
 */
export declare function PhotoStrip(props: PhotoStripProps): JSX.Element | null;
