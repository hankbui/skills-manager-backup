import { type JSX } from "react";
/** @kitUnlisted Only a host whose prompt lays out consumer pages teaches it. */
export interface GalleryPhoto {
    /** The photo: the `asset:<name>` the upload returned. */
    src: string;
    /** What the photo shows, in a sentence. */
    alt?: string;
}
export interface GalleryProps {
    /** The photos in order, the one to lead with first; up to eight. */
    photos: readonly GalleryPhoto[];
    /** The photos' height in px; every photo shares the crop. 360 by default. */
    height?: number;
}
/**
 * A product's or a place's photos as one swipeable hero: a photo across the
 * column at a time, snapping to each, with a dot per photo over its foot that
 * marks the one in view and jumps to another. One photo shows alone, with no
 * dots; no photos draws nothing.
 *
 * @kitUnlisted Only a host whose prompt lays out consumer pages teaches it.
 */
export declare function Gallery(props: GalleryProps): JSX.Element | null;
