import React from "react";
import { Tag } from "antd";

export const StatusTag = (props) => {
  const { status } = props;
  switch (status) {
    case 0:
      return <Tag color="cyan">Новый</Tag>;
    case 1:
      return <Tag color="magenta">Назначен</Tag>;
    case 2:
      return <Tag color="green">Заполнен</Tag>;
    default:
      return <></>;
  }
};
