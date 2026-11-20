import { type JSX } from "react";
/**
 * A JSON value as a connector returned it.
 *
 * @kitFeature live-sources Listed only for an author whose host teaches the declaration block.
 */
export type SourceJson = string | number | boolean | null | readonly SourceJson[] | {
    readonly [key: string]: SourceJson;
};
/**
 * What `useSource` returns: the current value and where it came from.
 * `fresh` is false while the page shows the authoring snapshot and true once
 * a refresh replaced it; `asOf` stamps the value either way; `error` is a
 * short reason when the last refresh failed and the snapshot stayed;
 * `updating` is true while the shell is reading a newer value, so the page
 * can show that beside the value it still has.
 *
 * @kitFeature live-sources Listed only for an author whose host teaches the declaration block.
 */
export interface LiveSource<T = SourceJson> {
    readonly value: T;
    readonly asOf: string;
    readonly fresh: boolean;
    readonly updating?: boolean;
    readonly error?: string;
}
/**
 * The current value of a declared source. Pass the id as a string literal:
 * the compiler checks it against the page's `cursor-canvas-sources` block
 * and refuses a page that reads a source it does not declare. The type
 * argument is the author's promise about the value's shape, the same one
 * the block's `shape` note records; it is not checked at runtime.
 *
 * @example
 * ```tsx
 * const bugs = useSource<Issue[]>("openBugs");
 * <Table rows={bugs.value.map(...)} />
 * <SourceStamp source={bugs} />
 * ```
 *
 * @kitFeature live-sources Listed only for an author whose host teaches the declaration block.
 */
export declare function useSource<T = SourceJson>(id: string): LiveSource<T>;
/**
 * Asks the page shell to read the named sources again now. Pass the ids of
 * declared sources (a routine slot a button is bound to, most often); ids
 * the page does not declare are dropped. The shell decides whether to
 * answer: a press from a focused page refreshes, a page cannot refresh on
 * its own schedule, and the values arrive through `useSource`, which
 * reports `updating` meanwhile. A no-op outside a page frame.
 *
 * @example
 * ```tsx
 * <Button onClick={() => refreshSources(["incidents"])}>Refresh incidents</Button>
 * ```
 *
 * @kitFeature live-sources Listed only for an author whose host teaches the declaration block.
 */
export declare function refreshSources(ids: readonly string[]): void;
export interface SourceStampProps {
    /** The source whose stamp to show, as `useSource` returned it. */
    source: LiveSource<unknown>;
}
/**
 * One quiet caption line saying how current a source's value is: `Updated
 * 12 s ago` once a refresh landed, `As of Oct 19, 2026, 3:04 PM` while the
 * page shows its authoring snapshot. After a refresh that failed, the
 * stamp keeps the snapshot date and a quiet status pill beside it says the
 * page is showing the last value (or which app to connect). It ticks so
 * the relative age stays true while the page is open, and its tooltip is
 * always the exact time of the read. Put it under the block that shows
 * the value.
 *
 * @kitFeature live-sources Listed only for an author whose host teaches the declaration block.
 */
export declare function SourceStamp({ source }: SourceStampProps): JSX.Element;
