import React from "react";
import { Link } from "react-router-dom";
import { Table, Tag } from "antd";
import { StatusTag } from "../shared";

const columns = [
  {
    title: "Код",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Визит",
    dataIndex: "visitName",
    key: "visitName",
  },
  {
    title: "Дата",
    dataIndex: "date",
    key: "date",
    render: (date) => date,
  },
  {
    title: "Статус",
    dataIndex: "status",
    key: "status",
    render: (status) => <StatusTag status={status}/>,
  },
  {
    title: "",
    dataIndex: "id",
    render: (id) => <Link to={`/visits/history/${id}`}>Редактировать</Link>,
  },
];

const dataMap = (info) => ({
  id: info.id,
  code: info.patient.code,
  visitName: `${info.visit.num} (${info.visit.comment})`,
  status: info.status,
  date: info.date,
});

export const PatientVisitsTable = (props) => {
  const { patientVisits, pagination } = props;
  const dataSource = patientVisits.map(dataMap);
  return (
    <Table
      pagination={pagination}
      size="small"
      columns={columns}
      dataSource={dataSource}
    />
  );
};
