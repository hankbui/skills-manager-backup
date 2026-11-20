import { type JSX, type ReactNode } from "react";
export interface CardCarouselProps {
    /** The cards in order, the one you recommend first: three to six `ProductCard`s. */
    children: ReactNode;
    /** What the cards are, for a screen reader: `"Bedside lamps"`, `"Places for Saturday"`. */
    label?: string;
}
/**
 * A handful of rich cards to swipe through. On a phone they sit in one row
 * that snaps to each card, the next one peeking in from the edge; on a wider
 * frame they wrap in rows that come out even: three across, four as two by
 * two, five or six three a row. Every card in a row takes the
 * tallest one's height. The row takes focus, so arrow keys scroll it, and a
 * screen reader hears each card as a numbered slide. No cards draws nothing.
 *
 * @kitUnlisted Only a host whose prompt lays out consumer pages teaches it.
 */
export declare function CardCarousel(props: CardCarouselProps): JSX.Element | null;
export interface CardGridProps {
    /** The cards in order: six or more `ProductCard`s with `compact`. */
    children: ReactNode;
    /** What the cards are, for a screen reader: `"Lamps under $500"`. */
    label?: string;
}
/**
 * Many cards seen at once: two a row on a phone, three or four on a wider
 * frame, scrolling down with the page. Every card in a row takes the tallest
 * one's height and the gaps are even. Made for `ProductCard`s with `compact`,
 * which stay readable at half a phone's width. No cards draws nothing.
 *
 * @kitUnlisted Only a host whose prompt lays out consumer pages teaches it.
 */
export declare function CardGrid(props: CardGridProps): JSX.Element | null;
