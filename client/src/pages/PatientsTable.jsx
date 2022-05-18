import React, { useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { StatusTag } from "../shared";
import { Button } from "antd";

const columns = [
  {
    title: "Уникальный код",
    dataIndex: "code",
    key: 1,
  },
  {
    title: "1 (Старт)",
    dataIndex: "visit1",
    key: 2,
    render: (status) => <StatusTag status={status} />,
  },
  {
    title: "2 (1 мес)",
    dataIndex: "visit2",
    key: 3,
    render: (status) => <StatusTag status={status} />,
  },
  {
    title: "3 (3 мес)",
    dataIndex: "visit3",
    key: 4,
    render: (status) => <StatusTag status={status} />,
  },
  {
    title: "4 (6 мес)",
    dataIndex: "visit4",
    key: 5,
    render: (status) => <StatusTag status={status} />,
  },
  {
    title: "5 (9 мес)",
    dataIndex: "visit5",
    key: 6,
    render: (status) => <StatusTag status={status} />,
  },
  {
    title: "6 (12 мес)",
    dataIndex: "visit6",
    key: 7,
    render: (status) => <StatusTag status={status} />,
  },
  {
    title: "",
    dataIndex: "id",
    key: 8,
    render: (id, record) => <Link to={`/visits/patients/${id}`}>Профиль</Link>,
  },
];

export const PatientsTable = (props) => {
  const { patients, onDelete } = props;
  const dataSource = patients.map((patient) => {
    const { patient_visits } = patient;
    const visit1 = patient_visits.find((visit) => visit.visitId === 1);
    const visit2 = patient_visits.find((visit) => visit.visitId === 2);
    const visit3 = patient_visits.find((visit) => visit.visitId === 3);
    const visit4 = patient_visits.find((visit) => visit.visitId === 4);
    const visit5 = patient_visits.find((visit) => visit.visitId === 5);
    const visit6 = patient_visits.find((visit) => visit.visitId === 6);
    return {
      key: patient.id,
      ...patient,
      ...(visit1 && { visit1: visit1.status }),
      ...(visit2 && { visit2: visit2.status }),
      ...(visit3 && { visit3: visit3.status }),
      ...(visit4 && { visit4: visit4.status }),
      ...(visit5 && { visit5: visit5.status }),
      ...(visit6 && { visit6: visit6.status }),
    };
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const hasSelected = selectedRowKeys.length > 0;
  const rowSelection = {
    type: "checkbox",
    selectedRowKeys,
    onChange: (keys) => {
      setSelectedRowKeys(keys);
    },
  };

  const handleDelete = () => {
    onDelete(selectedRowKeys);
  };

  return (
    <>
      <Table
        pagination={true}
        size="small"
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelection}
      />
      <Button type="primary" onClick={handleDelete} disabled={!hasSelected}>
        Удалить
      </Button>
    </>
  );
};
