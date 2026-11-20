import type { JSX } from "react";
export interface WatchCardProps {
    /** The offer, in the bot's voice: `"Not ready? I can watch these."`. */
    title: string;
    /** What watching does, in a line: `"I'll text you when one drops in price."`. */
    detail?: string;
    /** The button's word. `"Watch"` by default. */
    label?: string;
    /** The text the button fills the reply with: `"Watch these four lamps and text me when one drops"`. */
    reply: string;
}
/**
 * NOT AVAILABLE unless your instructions name `WatchCard`. Its button is a
 * `ReplyButton`, which works only on a host that delivers replies; the
 * desktop and phone apps do not, so there the button renders disabled and
 * `WriteCanvas` refuses a page that imports it. Make the offer in text
 * instead (a `Callout` such as "Want me to keep an eye on these? Just ask.").
 *
 * Where it is available: the offer to keep an eye on something for the
 * reader, as a raised card with a bell, the offer and what watching does,
 * and a Watch button that opens the reader's messenger with `reply` filled
 * in, for them to send.
 *
 * @kitUnlisted Only a host whose prompt lays out consumer pages teaches it.
 */
export declare function WatchCard(props: WatchCardProps): JSX.Element;
