import React from "react";
import "./index.css";
import { load, setFromId } from "../../stores/posts";

export const DashboardPage = ({
  senders,
  posts,
  navigation,
}: {
  senders: React.ReactElement;
  posts: React.ReactElement;
  navigation: React.ReactElement;
}) => {
  return (
    <div className="dashboard-page">
      <div />
      <div>{navigation}</div>
      <div className="dashboard-page-senders">{senders}</div>
      <div className="dashboard-page-posts">{posts}</div>
    </div>
  );
};

const DashboardPageConnected = ({
  from_id,
  ...otherProps
}: {
  from_id?: string;
  senders: React.ReactElement;
  posts: React.ReactElement;
  navigation: React.ReactElement;
}) => {
  React.useEffect(load, []);

  React.useEffect(() => {
    setFromId(from_id || null);
  }, [from_id]);

  return <DashboardPage {...otherProps} />;
};

export default DashboardPageConnected;
