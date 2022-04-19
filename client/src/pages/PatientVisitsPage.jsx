import React, { useEffect, useState, useCallback } from "react";
import { PageHeader, Tabs } from "antd";
import { PatientVisitsTable } from "./PatientVisitsTable";
import { PatientVisitForm } from "./PatientVisitForm";
import { getPatientVisits } from "../redux/thunks/patient_visits.thunk";

export const PatientVisitsPage = () => {
  const [patientVisits, setPatientVisits] = useState([]);

  const reload = useCallback(() => {
    getPatientVisits().then((res) => setPatientVisits(res.data));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <>
      <PageHeader title="История визитов" />

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Просмотр" key="1">
          <PatientVisitsTable patientVisits={patientVisits} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Добавить" key="2">
          <PatientVisitForm onUpdate={reload} />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};
