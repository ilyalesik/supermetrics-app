import React, { useMemo } from "react";
import "./PostsListItem.css";

export const PostsListItem = ({
  item,
}: {
  item: {
    created_time: string;
    id: string;
    message: string;
  };
}) => {
  const date = useMemo(
    () => new Date(item.created_time).toString(),
    [item.created_time]
  );
  return (
    <li className="posts-list-item">
      <div className="posts-list-item-header">{date}</div>
      <div className="posts-list-item-message">{item.message}</div>
    </li>
  );
};
