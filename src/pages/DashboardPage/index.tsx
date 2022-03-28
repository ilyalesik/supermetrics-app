import React from "react";
import "./index.css";
import { load, setFromId } from "../../stores/posts";
import PostsNavigationConnected from "../../components/PostsNavigation";

export const DashboardPage = ({
  senders,
  posts,
}: {
  senders: React.ReactElement;
  posts: React.ReactElement;
}) => {
  return (
    <div className="dashboard-page">
      <div />
      <div>
        <PostsNavigationConnected />
      </div>
      <div className="dashboard-page-senders">{senders}</div>
      <div className="dashboard-page-posts">{posts}</div>
    </div>
  );
};

const DashboardPageConnected = ({
  from_id,
  senders,
  posts,
}: {
  from_id?: string;
  senders: React.ReactElement;
  posts: React.ReactElement;
}) => {
  React.useEffect(load, []);

  React.useEffect(() => {
    setFromId(from_id || null);
  }, [from_id]);

  return <DashboardPage senders={senders} posts={posts} />;
};

export default DashboardPageConnected;
