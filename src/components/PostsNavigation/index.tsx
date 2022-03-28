import React from "react";
import "./index.css";
import { setAskOrder, setDescOrder } from "../../stores/posts";

export const PostsNavigation = ({
  onAsc,
  onDesc,
}: {
  onAsc: () => void;
  onDesc: () => void;
}) => {
  return (
    <div className="posts-navigation">
      <button className="posts-navigation-button" onClick={onAsc}>
        asc
      </button>
      <button className="posts-navigation-button" onClick={onDesc}>
        desc
      </button>
    </div>
  );
};

const PostsNavigationConnected = () => {
  return <PostsNavigation onAsc={setAskOrder} onDesc={setDescOrder} />;
};

export default PostsNavigationConnected;
