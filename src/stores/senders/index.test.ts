import { load } from "../posts";
import { timeout } from "../../utils/timeout";
import { $senders } from "./index";

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

it("get senders", async () => {
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

  expect($senders.getState()).toMatchObject([
    {
      from_id: "user_1",
      from_name: "Filomena Cort",
      count: 2,
    },
    {
      from_id: "user_9",
      from_name: "Rosann Eide",
      count: 1,
    },
  ]);
});
