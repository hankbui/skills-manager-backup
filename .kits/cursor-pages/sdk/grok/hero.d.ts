import { type JSX, type ReactElement, type ReactNode } from "react";
export interface PageHeroProps {
    /** The photo the page opens with: a `Gallery`, or one `Image`. */
    children: ReactNode;
    /** The few words over the title, such as the store a product is sold at. */
    eyebrow?: string;
    /** The eyebrow's own small mark, such as the store's icon, as `asset:<name>`. */
    eyebrowMark?: string;
}
/**
 * The photo a product or place page opens with, and the eyebrow under it.
 * As the first block of a `Page` it stands above the page's title, so the
 * page reads photo, eyebrow, title; anywhere else it is a photo with a line
 * under it.
 *
 * @kitUnlisted Only a host whose prompt lays out consumer pages teaches it.
 */
export declare function PageHero(props: PageHeroProps): JSX.Element;
