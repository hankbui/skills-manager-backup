import { type JSX, type ReactNode } from "react";
export type FloatingEdge = "top" | "bottom";
export type FloatingAlign = "start" | "center" | "end";
export interface FloatingProps {
    /**
     * The edge of the screen it keeps to: `bottom`, the default, for a
     * `BackToTop` or an action; `top` for a row of filters that must stay in
     * reach while the page scrolls under it.
     */
    edge?: FloatingEdge;
    /** Where along that edge: `end`, the default, is the trailing corner; `center`; `start`. */
    align?: FloatingAlign;
    /**
     * Draws the row as a bar on the page's raised surface, for a row of
     * several controls; off, the default, for one control that is its own
     * surface, such as a `Button`.
     */
    bar?: boolean;
    /** The controls that float: a `BackToTop`, a `Button`, a `Segmented`. */
    children?: ReactNode;
}
/**
 * Controls that stay on screen while the page scrolls, pinned to one edge of
 * the part of the screen the viewer can see, where the page is read: a
 * published Page, the web viewer, the desktop app, and the phone, where the
 * page's frame is as tall as its content and the app around it scrolls. It
 * stands outside the page's flow, so put it last in the `Page`, after the
 * sections. One `Floating` per edge. Only use `bar` with a control that is
 * always shown: a `BackToTop` alone is hidden at the top of the page, which
 * would leave an empty bar.
 *
 * @kitNote Last in the `Page`. Pins to the visible screen where the page is read, including the phone, where a hand-written `position: fixed` or `sticky` does not reach the screen. `bar` only with controls that are always shown.
 */
export declare function Floating({ edge, align, bar, children, }: FloatingProps): JSX.Element;
export interface BackToTopProps {
    /** The words on the button; "Back to top" when absent. */
    label?: string;
}
/**
 * A button that returns the viewer to the top of the page, shown once they
 * have scrolled a screen or so down and hidden at the top. Put it in a
 * `Floating` at the bottom edge, where it stays within reach.
 */
export declare function BackToTop({ label }: BackToTopProps): JSX.Element | null;
