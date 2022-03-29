import {
  combine,
  createEffect,
  createEvent,
  createStore,
  forward,
  restore,
  sample,
} from "effector";
import { $token, logout } from "../auth";
import { getPosts } from "../../api/posts";

const $page = createStore(1);

const postsEffect = createEffect(getPosts);

// Loading trigger
export const load = createEvent();
sample({
  source: combine($page, $token, (page, clientId) => ({ page, clientId })),
  clock: load,
  target: postsEffect,
});

// Invalid SL Token handler
forward({
  from: postsEffect.fail.map((payload) => {
    if (payload.error.message === "Invalid SL Token") {
      return true;
    }
  }),
  to: logout,
});

// Ordering store/events
const $ordering = createStore<"asc" | "desc" | null>(null);
export const setAskOrder = createEvent();
export const setDescOrder = createEvent();
$ordering.on(setAskOrder, () => "asc").on(setDescOrder, () => "desc");

// Current from id (sender selection)
const $fromId = createStore<string | null>(null);
export const setFromId = createEvent<string | null>();
$fromId.on(setFromId, (_, payload) => payload);

export const $rawPosts = restore(postsEffect.done, null).map(
  (state) => (state && state.result) || null
);

// Final posts list (filtered/sorted)
export const $posts = combine(
  $ordering,
  $fromId,
  $rawPosts,
  (ordering, fromId, rawPosts) => {
    if (!rawPosts) {
      return null;
    }
    return rawPosts.posts
      .slice()
      .filter((item) => {
        return fromId === null || item.from_id === fromId;
      })
      .sort((a, b) => {
        if (a.created_time < b.created_time) {
          return ordering === "desc" ? 1 : -1;
        } else if (a.created_time > b.created_time) {
          return ordering === "desc" ? -1 : 1;
        } else {
          return 0;
        }
      });
  }
);
