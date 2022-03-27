import React from "react";
import "./index.css";
import { load } from "../../stores/posts";

export const DashboardPage = ({
  senders,
  posts,
}: {
  senders: React.ReactElement;
  posts: React.ReactElement;
}) => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-page-senders">{senders}</div>
      <div className="dashboard-page-posts">{posts}</div>
    </div>
  );
};

const DashboardPageConnected = ({
  senders,
  posts,
}: {
  senders: React.ReactElement;
  posts: React.ReactElement;
}) => {
  React.useEffect(load, []);

  return <DashboardPage senders={senders} posts={posts} />;
};

export default DashboardPageConnected;
