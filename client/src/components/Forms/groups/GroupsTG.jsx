import { DeleteOutlined } from "@ant-design/icons";
import { Form, Input, Button, Select, Spin, DatePicker } from 'antd';
import moment from 'moment'
import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { findByCode, resetFilterState } from "../../../redux/reducers/filter.reducer";
import { groupsTGForm } from "../../../redux/thunks/forms";
import { FastTabs } from "../testing/fast-tabs";
import noPride from "./image.jpeg";
import styles from './styles.module.scss'
import { Success } from "./Success";

const { Option } = Select;

const GroupsTG = () => {
    const defaultCity = localStorage.getItem('1_city')
    const history = useHistory();

    const goTo = (path) => {
        history.push("/" + path.target.value)
    }

    const [submitting, setSubmitting] = useState(false)
    const [successful, setSuccessful] = useState(false);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        defaultCity && form.setFieldsValue({
            "1_city": defaultCity
        });
        // eslint-disable-next-line
    }, [successful, dispatch])

    const resetForm = () => {
        dispatch(resetFilterState())
        setSuccessful(false);
        window.location.reload();
        return form.resetFields()
    }

    const onFinish = async (values) => {

        const stateForm = new Object({
            "1_city": localStorage.getItem("1_city"),
            "3_number_of_participants": values["3_number_of_participants"],
            "4_list_of_participants": values["4_list_of_participants"],
            "5_medical_principles_transgender_transition": values["5_medical_principles_transgender_transition"],
            "6_psychology_principles_transgender_transition": values["6_psychology_principles_transgender_transition"],
            "7_consultant_comment": values["7_consultant_comment"],
        })

        const createOtherFields = () => {
            if (values["2_date"]) {
                stateForm["2_date"] = values["2_date"].format("YYYY-MM-DD HH:mm:ss")
            } else {
                stateForm["2_date"] = moment().format("YYYY-MM-DD HH:mm:ss")
            }

            return stateForm
        }

        const fields = await createOtherFields()
        setSubmitting(true)

        dispatch(groupsTGForm(fields))
            .then((data) => {
                setSubmitting(false)
                form.resetFields()
                setSuccessful(data);
            })
            .catch(() => {
                setSuccessful(false);
                setSubmitting(false)
            });
    }

    const setCityHandler = (city) => {
        localStorage.setItem('1_city', city)
        form.setFieldsValue({
            "1_city": city
        });
    }

    const reloadForm = () => {
        dispatch(resetFilterState())
        setSuccessful(false);
    }

    const createResetValue = (name) => {
        let values
        if (typeof name === "object") {
            values = name.map(i => ({ name: i }))
        } else {
            values = [{ name: name }]
        }

        const resetField = () => {
            return values.map(item => form.setFieldsValue({ [item.name]: null }))
        }

        return (
            <div className={styles.reset}>
                <Button icon={<DeleteOutlined/>} onClick={name ? resetField : resetForm}/>
            </div>
        )
    }

    if (successful) {
        return <Success reload={reloadForm} data={successful}/>
    }

    return (
        <div className={styles.container}>

            <FastTabs goTo={goTo}/>

            {/*<div className={styles.image} style={{ backgroundImage: `url(${noPride})` }}/>*/}

            <div className={styles.titleContainer}>
                <div className={styles.line}/>
                <h1 className={styles.h1}>Группа поддержки Транс-персон</h1>
                <p className={styles.required}>* Обязательные поля</p>

                {createResetValue()}
            </div>

            <Form
                layout={'vertical'}
                form={form}
                onFinish={onFinish}>

                <div>
                    <Form.Item name="1_city" label="Филиал"
                               rules={[{ required: true, message: 'Поле является обязательным' }]}
                    >
                        <Select defaultValue={defaultCity} value={form.getFieldsValue()["1_city"]}
                                onChange={setCityHandler}>
                            <Option value="moscow">Москва</Option>
                            <Option value="spb">Санкт-Петербург</Option>
                            <Option value="nn">Нижний Новгород</Option>
                        </Select>
                    </Form.Item>
                </div>

                <Form.Item required name="2_date" label={`Дата группы`}>
                    <DatePicker defaultValue={moment()} format={'DD.MM.YYYY'}/>
                </Form.Item>

                <div>
                    <Form.Item name="3_number_of_participants" label="Количество участников">
                        <Input.TextArea placeholder="Количество"/>
                    </Form.Item>
                    {createResetValue('3_number_of_participants')}
                </div>

                <div>
                    <Form.Item name="4_list_of_participants" label="Список участников (дд.мм.гг/номер/две буквы имени/цифра при необходимости)">
                        <Input.TextArea placeholder="дд.мм.гг/номер/две буквы имени/цифра при необходимости"/>
                    </Form.Item>
                    {createResetValue('4_list_of_participants')}
                </div>

                <div>
                    <Form.Item name="5_medical_principles_transgender_transition" label="Количество людей получивших консультацию о медицинских принципах и правилах трансгендерного перехода">
                        <Input.TextArea placeholder="Количество"/>
                    </Form.Item>
                    {createResetValue('5_medical_principles_transgender_transition')}
                </div>

                <div>
                    <Form.Item name="6_psychology_principles_transgender_transition" label="Количество людей получивших консультацию по психологическим аспектам трансгендерного перехода">
                        <Input.TextArea placeholder="Количество"/>
                    </Form.Item>
                    {createResetValue('6_psychology_principles_transgender_transition')}
                </div>

                <div>
                    <Form.Item name="7_consultant_comment" label="Комментарий">
                        <Input.TextArea placeholder="Комментарий"/>
                    </Form.Item>
                    {createResetValue('7_consultant_comment')}
                </div>

                <Form.Item style={{ textAlign: "center" }}>
                    {submitting ? <Spin size="large"/>
                        : <Button htmlType="submit" type="primary" size="large">Сохранить</Button>}
                </Form.Item>
            </Form>

        </div>
    );
};

const mapStateToProps = (state) => ({
    pastTests: state.filter.findByCode
})

const mapDispatchToProps = (dispatch) => ({
    findByCode: (code) => dispatch(findByCode(code))
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupsTG);
