import type { JSX } from "react";
export interface PageMetaProps {
    /** What the page holds and when, in a few words: `"4 picks · Oct 26"`. */
    children: string;
}
/**
 * The line under a consumer page's title that says what it holds and when,
 * such as "4 picks · Oct 26", in the quiet ink. It takes the place of the
 * summary paragraph, so the page under it opens on its first item.
 *
 * @kitUnlisted Only a host whose prompt lays out consumer pages teaches it.
 */
export declare function PageMeta(props: PageMetaProps): JSX.Element;
export interface FootnoteProps {
    /** Who found this and when, and what may change: `"Found by Grok Bot for Emerson on Oct 26. Prices can change."`. */
    children: string;
}
/**
 * The closing line of a consumer page: a centred line in the quietest ink
 * that says who found what is on it and when, and what may have changed since.
 *
 * @kitUnlisted Only a host whose prompt lays out consumer pages teaches it.
 */
export declare function Footnote(props: FootnoteProps): JSX.Element;
