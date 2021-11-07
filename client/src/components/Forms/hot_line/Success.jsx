import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from "react-router-dom";

export const Success = (props) => {
    console.log('props successful', props.data)
    const history = useHistory();

    const goToForms = () => {
        history.push("/forms")
    }

    return (
        <Result
            status="success"
            title={`Обращение на горячую линию сохранено`}
            subTitle={`Код обращения ${props.data.data.data.id}.`}
            extra={[
                <Button type="primary" key="buy" onClick={props.reload}>Сохранить новое</Button>,
            ]}
        />
    )
}