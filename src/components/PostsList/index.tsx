import React from "react";
import { $posts } from "../../stores/posts";
import { useStore } from "effector-react";
import { PostsListItem } from "./PostsListItem";
import "./index.css";

export const PostsList = ({
  items,
}: {
  items: readonly {
    readonly created_time: string;
    readonly from_id: string;
    readonly from_name: string;
    readonly id: string;
    readonly message: string;
    readonly type: string;
  }[];
}) => {
  return (
    <ul className="posts-lists">
      {items.map((item) => (
        <PostsListItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

const PostsListConnected = () => {
  const postsData = useStore($posts);
  if (!postsData) {
    return null;
  }

  return <PostsList items={postsData.posts} />;
};

export default PostsListConnected;
