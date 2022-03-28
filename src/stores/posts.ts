import {
  combine,
  createEffect,
  createEvent,
  createStore,
  forward,
  restore,
  sample,
} from "effector";
import { $clientId, logout } from "./auth";
import {
  array,
  number,
  object,
  string,
  ValidationError,
} from "typed-contracts";

const $page = createStore(1);

const postsData = object({
  data: object({
    page: number,
    posts: array(
      object({
        created_time: string,
        from_id: string,
        from_name: string,
        id: string,
        message: string,
        type: string,
      })
    ),
  }),
  meta: object({
    request_id: string,
  }),
});

const postsErrorData = object({
  meta: object({
    request_id: string,
  }),
  error: object({
    message: string,
  }),
});

const postsDataValidate = postsData("posts data");
export type PostsData = Exclude<
  ReturnType<typeof postsDataValidate>,
  ValidationError
>;

const postsErrorDataValidate = postsErrorData("posts error data");

const postsEffect = createEffect(
  async ({ clientId, page }: { clientId: string | null; page?: number }) => {
    const url = `https://api.supermetrics.com/assignment/posts?sl_token=${clientId}&page=${page}`;
    const req = await fetch(url);
    const data = await req.json();

    if (!req.ok) {
      const parsedError = postsErrorDataValidate(data);
      throw new Error(
        parsedError instanceof ValidationError
          ? "Validation error"
          : parsedError.error.message
      );
    }
    const validatedData = postsDataValidate(data);
    if (validatedData instanceof ValidationError) {
      throw new Error("Validation error");
    }
    return validatedData.data;
  }
);

export const load = createEvent();

sample({
  source: combine($page, $clientId, (page, clientId) => ({ page, clientId })),
  clock: load,
  target: postsEffect,
});

forward({
  from: postsEffect.fail.map((payload) => {
    if (payload.error.message === "Invalid SL Token") {
      return true;
    }
  }),
  to: logout,
});

const $ordering = createStore<"asc" | "desc" | null>(null);

export const setAskOrder = createEvent();
export const setDescOrder = createEvent();

$ordering.on(setAskOrder, () => "asc").on(setDescOrder, () => "desc");

const $rawPosts = restore(postsEffect.done, null).map(
  (state) => (state && state.result) || null
);

export const $posts = combine($ordering, $rawPosts, (ordering, rawPosts) => {
  if (!rawPosts) {
    return null;
  }
  return rawPosts.posts.slice().sort((a, b) => {
    if (a.created_time < b.created_time) {
      return ordering === "desc" ? 1 : -1;
    } else if (a.created_time > b.created_time) {
      return ordering === "desc" ? -1 : 1;
    } else {
      return 0;
    }
  });
});

export const $senders = $rawPosts.map((state) => {
  if (!state) {
    return null;
  }
  const result: {
    [key: string]: {
      from_id: string;
      from_name: string;
      count: number;
    };
  } = {};
  state.posts.forEach((item) => {
    if (result[item.from_id]) {
      result[item.from_id].count += 1;
    } else {
      result[item.from_id] = {
        from_id: item.from_id,
        from_name: item.from_name,
        count: 1,
      };
    }
  });

  return Object.values(result);
});
