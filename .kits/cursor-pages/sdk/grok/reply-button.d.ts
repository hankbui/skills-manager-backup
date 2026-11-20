import type { JSX } from "react";
import { type ButtonVariant } from "./controls.js";
export interface ReplyButtonProps {
    /** The option as the button shows it; also the reply when `reply` is absent or blank. */
    label: string;
    /** The text the reply is filled in with, when it should say more than the label. */
    reply?: string;
    /** Same as `Button`'s: `primary` for the one option a row leads with. */
    variant?: ButtonVariant;
}
/**
 * NOT AVAILABLE unless your instructions name `ReplyButton`. It works only
 * on a host that delivers replies, and the desktop and phone apps do not:
 * there it renders disabled, its label read but nothing happening when it is
 * pressed, and `WriteCanvas` refuses a page that imports it. To offer the
 * viewer something to ask for, write it as text (a `Callout` such as "Ask me
 * for your morning brief"); where your instructions teach routine or
 * connector action buttons, use a `Button` whose `onClick` runs that action.
 *
 * Where it is available: pressing it opens the viewer's messenger with the
 * reply filled in, for the viewer to send. It shows disabled when the text it
 * would send runs past 300 characters.
 *
 * @kitUnlisted Only a host that delivers replies teaches it, in its own prompt.
 */
export declare function ReplyButton({ label, reply, variant }: ReplyButtonProps): JSX.Element | null;
