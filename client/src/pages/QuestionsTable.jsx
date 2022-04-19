import React from "react";
import { Link } from 'react-router-dom';
import { Table } from "antd";

const columns = [
  {
    title: "№",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Вопрос",
    dataIndex: "question",
    key: "question",
  },
  {
    title: "",
    dataIndex: "id",
    key: "edit",
    render: (id, record) => <Link to={`/visits/questions/${id}`}>Редактировать</Link>,
  },
];

export const QuestionsTable = (props) => {
  const { questions } = props;
  return (
    <Table
      pagination={true}
      size="small"
      columns={columns}
      dataSource={questions}
    />
  );
};
