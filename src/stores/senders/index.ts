import { $rawPosts } from "../posts";

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
