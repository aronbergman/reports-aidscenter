import React, { useEffect, useState } from "react";
import { Form, DatePicker, Button, Select } from "antd";
import { getPatients } from "../redux/thunks/patients.thunks";
import { getVisits } from "../redux/thunks/visits.thunks";
import {
  postPatientVisits,
  getPatientVisits,
} from "../redux/thunks/patient_visits.thunk";
import { useNotification } from "../hooks";
import { DebounceSelect } from "../shared";
import { useHistory } from "react-router";

const fetchPatients = async (name) => {
  return getPatients(name).then((patients) =>
    patients.data.map((user) => ({
      label: `${user.name} ${user.surname}`,
      value: user.id,
    }))
  );
};

export const PatientVisitForm = (props) => {
  const { onUpdate } = props;
  const history = useHistory();
  const { openNotification } = useNotification();

  const [visits, setVisits] = useState([]);

  const [patient, setPatient] = useState();
  const [visit, setVisit] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    getVisits().then((res) => setVisits(res.data));
  }, []);

  const onFinish = (values) => {
    const { patient, visit, date } = values;
    postPatientVisits({
      patientId: patient.value,
      visitId: visit,
      date: date.format(),
    }).then((res) => {
      const { id } = res.data;
      openNotification("Визит успешно добавлен");
      onUpdate();
      history.push(`/visits/history/${id}`);
    }).catch(() => {
      openNotification("Произошла ошибка");
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Пациент"
        name="patient"
        rules={[
          {
            required: true,
            message: "Выберите имя",
          },
        ]}
      >
        <DebounceSelect
          showSearch
          value={patient}
          placeholder="Выберите имя"
          fetchOptions={fetchPatients}
          onChange={(value) => {
            setPatient(value);
          }}
        />
      </Form.Item>
      <Form.Item
        label="Визит"
        name="visit"
        rules={[
          {
            required: true,
            message: "Выберите визит",
          },
        ]}
      >
        <Select
          value={visit}
          placeholder="Выберите визит"
          onChange={(newValue) => {
            setVisit(newValue);
          }}
        >
          {visits.map((visit) => (
            <Select.Option value={visit.id} key={visit.id}>
              {visit.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Дата"
        name="date"
        rules={[
          {
            required: true,
            message: "Выберите дату",
          },
        ]}
      >
        <DatePicker onChange={setDate} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить визит
        </Button>
      </Form.Item>
    </Form>
  );
};
