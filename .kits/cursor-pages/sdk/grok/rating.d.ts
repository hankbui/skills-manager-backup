import type { JSX } from "react";
export interface RatingSummaryProps {
    /** The score out of 5, as the store or site lists it: `4.8`. */
    rating: number;
    /** How many ratings it is from: `212` or `"1.2k"`. */
    reviews?: number | string;
}
/**
 * The reviews' headline: the score large, then five stars filled to it over
 * the count of ratings. A score that is not a number draws nothing.
 *
 * @kitUnlisted Only a host whose prompt lays out consumer pages teaches it.
 */
export declare function RatingSummary(props: RatingSummaryProps): JSX.Element | null;
