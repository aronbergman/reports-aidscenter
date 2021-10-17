import React, { useState } from "react";
import { Select, Form, Input, Button, message } from 'antd';

import AuthService from "../../services/auth.service";

const { Option } = Select;

export const ChangePassword = ({ setVisible, values }) => {
    const [validate, setValidate] = useState(false)
console.log('values', values)
    const onFinish = (pass) => {
        console.log('Success username:', {username: values.username, password: pass.password});
        AuthService.changePassword({username: values.username, password: pass.password}).then(() => {
            message.success("Пароль успешно изменён")
            setVisible(false)
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onValuesChange = (changedValues, allValues) => {
        console.log('changedValues, allValues', changedValues, allValues)
        if (allValues.password === allValues["password_2"] && allValues.password) {
            setValidate(true)
        } else {
            setValidate(false)
        }
    }

    return (
        <Form
            name="basic"
            layout="vertical"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
            autoComplete="off"
        >
            <Form.Item
                label="Пароль"
                name="password"
                rules={[
                    {
                        required: true,
                        min: 6,
                        message: 'Минимальная длинна 6 символов',
                    },
                ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                label="Повторить пароль"
                name="password_2"
                rules={[
                    {
                        required: true,
                        message: 'Please input password!',
                    },
                ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item>
                {validate ? <Button type="primary" htmlType="submit">
                    Изменить пароль сотрудника
                </Button> : "Введенные пароли не совпадают или пароль не введён"}

            </Form.Item>

        </Form>
    );
}
