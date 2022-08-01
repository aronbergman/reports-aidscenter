import React, { useEffect, useState } from "react";
import { PageHeader, Typography } from "antd";
import { useParams } from "react-router";
import { getPatient, postPatient } from "../redux/thunks/patients.thunks";
import { getPatientVisits } from "../redux/thunks/patient_visits.thunk";
import { PatientForm } from "./PatientForm";
import { PatientVisitsTable } from "./PatientVisitsTable";
import { useNotification } from "../hooks";

const orderByNum = (vs1, vs2) => vs1.visitId > vs2.visitId ? 1 : -1;

export const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState();
  const [patientVisits, setPatientVisits] = useState([]);
  const { openNotification } = useNotification();

  useEffect(() => {
    getPatient(id).then((res) => {
      setPatient(res.data);
    });
    getPatientVisits().then((res) => {
      setPatientVisits(res.data.filter((info) => info.patientId === +id).sort(orderByNum));
    });
  }, [id]);

  const updateProfile = (profile) => {
    postPatient(id, profile)
      .then(() => {
        openNotification("Профиль успешно сохранен");
      })
      .catch(() => {
        openNotification("При сохранении произошла ошибка");
      });
  };

  if (patient) {
    return (
      <>
        <PageHeader title={`Пациент: ${patient.code}`} />

        <PatientForm profile={patient} onUpdate={updateProfile} />

        <br />
        <Typography.Title level={3}>Визиты</Typography.Title>
        <PatientVisitsTable patientVisits={patientVisits} pagination={false} />
      </>
    );
  }

  return <></>;
};
