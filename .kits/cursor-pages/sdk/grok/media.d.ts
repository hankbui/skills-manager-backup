import { type JSX } from "react";
export interface VideoProps {
    /**
     * `asset:<name>`: a clip uploaded beside the page (the asset tool returns
     * this exact string); MP4 or WebM. Any other URL, a web address included,
     * is never fetched and shows the `alt` text in its place.
     */
    src: string;
    /** What the clip shows, in a sentence: read aloud, and shown in the clip's place until it loads or when it is missing. */
    alt: string;
    /**
     * A still shown before the clip plays: `asset:<name>` of a picture
     * uploaded beside the page. It also stands in for the clip while the
     * clip's bytes are awaited, and its own proportions shape the box.
     */
    poster?: string;
    /** A line under the clip, in the subtext style. */
    caption?: string;
    /**
     * Start playing on its own, silent, as soon as the clip arrives (default
     * `true`); `false` waits for the viewer to press play. Sound is never
     * automatic: a clip that should be heard is `autoplay={false}`, and the
     * viewer unmutes or presses play.
     */
    autoplay?: boolean;
    /** Start over when the clip ends. Defaults to `autoplay`: a silent loop for a motion, one pass for a clip the viewer starts. */
    loop?: boolean;
    /** Show the browser's play, seek and volume controls (default `true`). */
    controls?: boolean;
    /** How the clip fills a box of a set `height`: `contain` keeps all of it (default), `cover` fills the box and crops. */
    fit?: "contain" | "cover";
    /** The clip's width: a CSS width (`320`, `"50%"`). Unset, it spans the column and never exceeds it. */
    width?: number | string;
    /** A fixed height in px; unset, the clip keeps its own proportions. */
    height?: number;
    /**
     * The clip's own proportions, as `width / height` (`1.5`, `"1200/800"`,
     * `"16 / 9"`), so its box is the right shape before it loads and the page
     * does not shift when it does. Unneeded with a `poster` the host has
     * measured; the poster's shape wins when both are present. Without
     * either, the box is 16:9 until the clip arrives.
     */
    ratio?: number | string;
}
/**
 * A clip on the page: an uploaded asset named `asset:<name>`, playing inline
 * with the browser's controls and an optional caption under it. It plays
 * once the host hands the frame the clip's bytes. Until then its box is
 * already the clip's shape (a `poster`'s measured size, the `ratio`, or
 * 16:9), so nothing below moves when it lands, and the poster, when there
 * is one, stands in the box as a picture would (blurred first, then sharp);
 * otherwise the `alt` text waits on a quiet tinted box, as it does when the
 * clip is missing or the host cannot provide it. By default it starts on its
 * own, muted and looping, the way a short motion should; sound is the
 * viewer's to turn on. Never a web address: the frame fetches nothing from
 * the internet, so a web clip must be downloaded and uploaded as an asset
 * first.
 *
 * @kitFeature page-video Listed only for an author whose upload also takes a clip.
 */
export declare function Video(props: VideoProps): JSX.Element;
export interface AudioProps {
    /**
     * `asset:<name>`: a sound uploaded beside the page (the asset tool returns
     * this exact string); MP3, M4A or Ogg. Any other URL, a web address
     * included, is never fetched and shows the `alt` text in its place.
     */
    src: string;
    /** What the sound is, in a sentence: read aloud, and shown in the player's place until it loads or when it is missing. */
    alt: string;
    /** A line under the player, in the subtext style. */
    caption?: string;
    /** Start over when the sound ends (default `false`). */
    loop?: boolean;
    /** The player's width: a CSS width (`320`, `"50%"`). Unset, it spans the column and never exceeds it. */
    width?: number | string;
}
/**
 * A sound on the page: an uploaded asset named `asset:<name>`, as the
 * browser's own player with an optional caption under it. It never starts
 * on its own; the viewer presses play. Until the host hands the frame the
 * sound's bytes, and when it cannot, the `alt` text stands in its place.
 * Never a web address: the frame fetches nothing from the internet.
 *
 * @kitFeature page-video Listed only for an author whose upload also takes a sound.
 */
export declare function Audio(props: AudioProps): JSX.Element;
