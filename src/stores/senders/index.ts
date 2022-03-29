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

  return Object.values(result).sort((a, b) => {
    if (a.from_name < b.from_name) {
      return -1;
    } else if (a.from_name > b.from_name) {
      return 1;
    } else if (a.count < b.count) {
      return -1;
    } else if (a.count > b.count) {
      return 1;
    } else {
      return 0;
    }
  });
});
