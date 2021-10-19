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
            title={`Тестирование завершено`}
            subTitle={`Код опроса ${props.data.data.data.id}. Код клиента ${props.data.data.data["1_code"]}`}
            extra={[
                <Button type="primary" key="buy" onClick={props.reload}>Начать новый опрос</Button>,
            ]}
        />
    )
}