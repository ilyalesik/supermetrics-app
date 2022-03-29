import { timeout } from "../../utils/timeout";
import { $posts, load, setDescOrder, setFromId } from "./index";
import { $clientId, login } from "../auth";

beforeAll(() => jest.spyOn(window, "fetch"));

const post1 = {
  created_time: "2022-03-28T19:06:39+00:00",
  from_id: "user_1",
  from_name: "Filomena Cort",
  id: "post624236da322ce_86ec7f87",
  message:
    "protection racism mood contrary pavement drama sample manufacture printer",
  type: "status",
};

const post2 = {
  created_time: "2022-03-28T13:32:35+00:00",
  from_id: "user_1",
  from_name: "Filomena Cort",
  id: "post624236da322d9_dbc2eea1",
  message:
    "plane falsify rear admit difficulty dorm core thin flat wrestle reputation beer syndrome reliance mail tumour intermediate speech recommendation linen combine move mug fling facade wrist wagon buy permission test leave dynamic expertise",
  type: "status",
};

const post3 = {
  created_time: "2022-03-28T08:16:40+00:00",
  from_id: "user_9",
  from_name: "Rosann Eide",
  id: "post624236da322e2_c369f3bc",
  message: "wagon pedestrian falsify franchise rare corn",
  type: "status",
};

it("get posts", async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.fetch.mockImplementation((url) => {
    if (
      url.split("?")[0] !== `${process.env.REACT_APP_API_HOST}/assignment/posts`
    ) {
      return;
    }
    return {
      ok: true,
      json: async () => ({
        meta: {
          request_id: "1",
        },
        data: {
          page: 1,
          posts: [post1, post2, post3],
        },
      }),
    };
  });

  load();
  await timeout();

  expect($posts.getState()).toMatchObject([post3, post2, post1]);
});

it("get posts + filter by sender", async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.fetch.mockImplementation((url) => {
    if (
      url.split("?")[0] !== `${process.env.REACT_APP_API_HOST}/assignment/posts`
    ) {
      return;
    }
    return {
      ok: true,
      json: async () => ({
        meta: {
          request_id: "1",
        },
        data: {
          page: 1,
          posts: [post1, post2, post3],
        },
      }),
    };
  });

  load();
  setFromId("user_1");
  await timeout();

  expect($posts.getState()).toMatchObject([post2, post1]);
});

it("get posts + filter by sender + ordering", async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.fetch.mockImplementation((url) => {
    if (
      url.split("?")[0] !== `${process.env.REACT_APP_API_HOST}/assignment/posts`
    ) {
      return;
    }
    return {
      ok: true,
      json: async () => ({
        meta: {
          request_id: "1",
        },
        data: {
          page: 1,
          posts: [post1, post2, post3],
        },
      }),
    };
  });

  load();
  setFromId("user_1");
  setDescOrder();
  await timeout();

  expect($posts.getState()).toMatchObject([post1, post2]);
});

it("logout on SL error", async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.fetch.mockImplementation((url) => {
    if (url === `${process.env.REACT_APP_API_HOST}/assignment/register`) {
      return {
        ok: true,
        json: async () => ({
          meta: {
            request_id: "1",
          },
          data: {
            client_id: "1",
            email: "johndoe@example.com",
            sl_token: "12345",
          },
        }),
      };
    } else if (
      url.split("?")[0] === `${process.env.REACT_APP_API_HOST}/assignment/posts`
    ) {
      return {
        ok: false,
        json: async () => ({
          meta: {
            request_id: "1",
          },
          error: {
            message: "Invalid SL Token",
          },
        }),
      };
    }
  });

  login({
    name: "John Doe",
    email: "johndoe@example.com",
  });

  await timeout();

  expect($clientId.getState()).toBe("12345");

  load();
  await timeout();

  expect($clientId.getState()).toBe(null);
});
