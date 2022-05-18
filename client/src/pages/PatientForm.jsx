import React from "react";
import { Form, Input, Button, Card } from "antd";
import { CodeInput } from "../shared";

export const PatientForm = (props) => {
  const { profile, onUpdate } = props;

  const onFinish = (profile) => {
    onUpdate(profile);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const initialValues = profile;

  return (
    <Form
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={profile ? initialValues : {}}
      autoComplete="off"
    >
      <Card>
        <Form.Item
          label="Уникальный код"
          name="code"
          rules={[
            {
              required: true,
              message: "Укажите код",
            },
          ]}
        >
          <CodeInput />
        </Form.Item>
      </Card>
      <Card>
        <Form.Item
          label="Контакт"
          name="contact"
          rules={[
            {
              required: true,
              message: "Укажите Контакт",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Card>
      <Card>
        <Form.Item
          label="Комментарий"
          name="comment"
        >
          <Input.TextArea rows={10}/>
        </Form.Item>
      </Card>
      <Card>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {profile ? "Сохранить" : "Добавить пациента"}
          </Button>
        </Form.Item>
      </Card>
    </Form>
  );
};
