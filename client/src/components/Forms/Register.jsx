import React from "react";
import { Select, Form, Input, Button } from 'antd';

import AuthService from "../../services/auth.service";

const { Option } = Select;

export const Register = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
        AuthService.register(values).then((data) => console.log('data AuthService register', data))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            layout="vertical"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input username!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Полное имя (для форм и списков)"
                name="appointment"
                rules={[
                    {
                        required: true,
                        message: 'Please input username!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Пароль"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input password!',
                    },
                ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                label="Город"
                name="city"
            >
                <Select placeholder="Город" defaultValue="moscow">
                    <Option value="moscow">Москва</Option>
                    <Option value="spb">Санкт-Петербург</Option>
                    <Option value="nn">Нижний Новгород</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Добавить сотрудника
                </Button>
            </Form.Item>
        </Form>
    );
}
