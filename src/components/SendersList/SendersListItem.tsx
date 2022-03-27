import React from "react";
import "./SendersListItem.css";

export const SendersListItem = ({
  item,
}: {
  item: { from_name: string; from_id: string; count: number };
}) => {
  return (
    <li className="sender-list-item">
      <p className="sender-list-item-title">{item.from_name}</p>
      <div className="sender-list-item-count">{item.count}</div>
    </li>
  );
};
