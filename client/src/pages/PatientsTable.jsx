import React from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { StatusTag } from "../shared";

const columns = [
  {
    title: "Уникальный код",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Визит 1",
    dataIndex: "visit1",
    key: "visit1",
    render: (status) => <StatusTag status={status}/>,
  },
  {
    title: "Визит 2",
    dataIndex: "visit2",
    key: "visit2",
    render: (status) => <StatusTag status={status}/>,
  },
  {
    title: "Визит 3",
    dataIndex: "visit3",
    key: "visit3",
    render: (status) => <StatusTag status={status}/>,
  },
  {
    title: "Визит 4",
    dataIndex: "visit4",
    key: "visit4",
    render: (status) => <StatusTag status={status}/>,
  },
  {
    title: "Визит 5",
    dataIndex: "visit5",
    key: "visit5",
    render: (status) => <StatusTag status={status}/>,
  },
  {
    title: "Визит 6",
    dataIndex: "visit6",
    key: "visit6",
    render: (status) => <StatusTag status={status}/>,
  },
  {
    title: "",
    dataIndex: "id",
    render: (id, record) => <Link to={`/visits/patients/${id}`}>Профиль</Link>,
  },
];

export const PatientsTable = (props) => {
  const { patients } = props;
  const dataSource = patients.map((patient) => {
    const { patient_visits } = patient;
    const visit1 = patient_visits.find((visit) => visit.visitId === 1);
    const visit2 = patient_visits.find((visit) => visit.visitId === 2);
    const visit3 = patient_visits.find((visit) => visit.visitId === 3);
    const visit4 = patient_visits.find((visit) => visit.visitId === 4);
    const visit5 = patient_visits.find((visit) => visit.visitId === 5);
    const visit6 = patient_visits.find((visit) => visit.visitId === 6);
    return {
      ...patient,
      ...(visit1 && { visit1: visit1.status }),
      ...(visit2 && { visit2: visit2.status }),
      ...(visit3 && { visit3: visit3.status }),
      ...(visit4 && { visit4: visit4.status }),
      ...(visit5 && { visit5: visit5.status }),
      ...(visit6 && { visit6: visit6.status }),
    };
  });

  return (
    <Table
      pagination={true}
      size="small"
      columns={columns}
      dataSource={dataSource}
    />
  );
};
