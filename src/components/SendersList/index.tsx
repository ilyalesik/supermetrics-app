import React from "react";
import { $senders } from "../../stores/posts";
import { useStore } from "effector-react";
import "./index.css";
import { SendersListItem } from "./SendersListItem";

export const SendersList = ({
  items,
}: {
  items: { from_name: string; from_id: string; count: number }[];
}) => {
  return (
    <ul className="senders-lists">
      {items.map((item) => (
        <SendersListItem key={item.from_id} item={item} />
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
