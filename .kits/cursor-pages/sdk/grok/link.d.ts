import type { JSX } from "react";
/** @kitUnlisted Only a host whose prompt lays out consumer pages teaches it. */
export type LinkButtonVariant = "button" | "text";
export interface LinkButtonProps {
    /** One or two words, as the design writes them: `"View"`, `"Manage"`, `"Read more"`, `"See all"`. */
    label: string;
    /** Where it goes; it opens in a new tab. */
    href: string;
    /**
     * `button`, the default, is a full-width quiet pill, for "View" under a
     * product or two side by side in a `Grid`; `text` is the words in the
     * link color, for "Read more" under a paragraph or "See all" at a
     * section's foot.
     */
    variant?: LinkButtonVariant;
}
/**
 * A link to the store's, the site's or the booking's own page, its words
 * ending in an arrow: a quiet pill, or the words alone in the link color.
 * Opens in a new tab. No label or no address draws nothing.
 *
 * @kitUnlisted Only a host whose prompt lays out consumer pages teaches it.
 */
export declare function LinkButton(props: LinkButtonProps): JSX.Element | null;
export interface TextLinkProps {
    /** The linked words, short: `"The Oblist"`, `"Add bags"`. */
    children: string;
    /** Where it goes; it opens in a new tab. */
    href: string;
}
/**
 * Linked words inside a line, in the link color and ending in an arrow,
 * such as a `Properties` value ("Sold by" The Oblist) or a line under a
 * hero. Opens in a new tab. Without an address it is the words alone.
 *
 * @kitUnlisted Only a host whose prompt lays out consumer pages teaches it.
 */
export declare function TextLink({ children, href }: TextLinkProps): JSX.Element;
