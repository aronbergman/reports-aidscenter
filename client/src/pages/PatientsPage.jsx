import React, { useEffect, useState, useCallback } from "react";
import { PageHeader, Tabs } from "antd";
import { useNotification } from "../hooks";
import {
  getPatients,
  postPatients,
  deletePatient,
} from "../redux/thunks/patients.thunks";
import { PatientForm } from "./PatientForm";
import { PatientsTable } from "./PatientsTable";
import { useHistory } from "react-router";

export const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const { openNotification } = useNotification();
  const history = useHistory();

  const reload = useCallback(() => {
    getPatients().then((res) => setPatients(res.data));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const createProfile = (profile) => {
    postPatients(profile)
      .then((res) => {
        const { id } = res.data;
        openNotification("Пациент успешно добавлен");
        reload();
        history.push(`/visits/patients/${id}`);
      })
      .catch(() => {
        openNotification("При добавлении произошла ошибка");
      });
  };

  const handleDelete = async (ids) => {
    await Promise.all(
      ids.map((id) => {
        return deletePatient(id);
      })
    );
    openNotification(`Пациенты удалены`);
    reload();
  };

  return (
    <>
      <PageHeader title="Пациенты" />

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Просмотр" key="1">
          <PatientsTable patients={patients} onDelete={handleDelete} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Добавить" key="2">
          <PatientForm onUpdate={createProfile} />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};
