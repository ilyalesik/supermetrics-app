import React from "react";
import { $senders } from "../../stores/posts";
import { useStore } from "effector-react";
import "./index.css";
import { SendersListItem } from "./SendersListItem";
import { Link } from "wouter";

export const SendersList = ({
  items,
}: {
  items: { from_name: string; from_id: string; count: number }[];
}) => {
  return (
    <ul className="senders-lists">
      {items.map((item) => (
        <Link key={item.from_id} href={`/dashboard/${item.from_id}`}>
          <a className="senders-lists-link">
            <SendersListItem item={item} />
          </a>
        </Link>
      ))}
    </ul>
  );
};

const SendersListConnected = () => {
  const senders = useStore($senders);
  if (!senders) {
    return null;
  }

  return <SendersList items={senders} />;
};

export default SendersListConnected;
