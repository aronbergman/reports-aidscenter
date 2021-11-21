import { DeleteOutlined } from "@ant-design/icons";
import { Form, Input, Button, Tag, Alert, Spin, Radio, Checkbox } from 'antd';
import MaskedInput from 'antd-mask-input'
import moment from 'moment'
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { findByCode, resetFilterState } from "../../../redux/reducers/filter.reducer";
import { findTesting, drugsForm } from "../../../redux/thunks/forms";
import { Success } from "../../Success";
import { FastTabs } from "../testing/fast-tabs";
import styles from './styles.module.scss'

const TestingForm = ({ pastTests }) => {
    const history = useHistory();

    const goTo = (path) => {
        history.push("/" + path.target.value)
    }

    const [submitting, setSubmitting] = useState(false)
    const [successful, setSuccessful] = useState(false);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const resetForm = () => {
        dispatch(resetFilterState())
        setSuccessful(false);
        window.location.reload();
        return form.resetFields()
    }

    const onFinish = async (values) => {

        const stateForm = new Object({
            "1_code": values["1_code"].replace(/[. /_]/g, '').toUpperCase(),
            "2_help_type": values["2_help_type"],
            "4_description_of_circuit": values["4_description_of_circuit"],
            "5_consulting_on_regular_testing_provided": values["5_consulting_on_regular_testing_provided"] ? values["5_consulting_on_regular_testing_provided"][0] : null,
            "6_prevention_counseling_provided": values["6_prevention_counseling_provided"] ? values["6_prevention_counseling_provided"][0] : null,
            "7_provided_counseling_on_receiving_treatment_for_hiv": values["7_provided_counseling_on_receiving_treatment_for_hiv"] ? values["7_provided_counseling_on_receiving_treatment_for_hiv"][0] : null,
            "8_consultant_comment": values["8_consultant_comment"]
        })

        const createOtherFields = () => {
            // 3_issue_date
            if (values["3_1_issue_date"]?.length && values["3_2_issue_date"]?.length) {
                stateForm["3_issue_date"] = [values["3_1_issue_date"], values["3_2_issue_date"]].toString()
            } else if (values["3_1_issue_date"]?.length) {
                stateForm["3_issue_date"] = values["3_1_issue_date"]
            } else if (values["3_2_issue_date"]?.length) {
                stateForm["3_issue_date"] = [values["3_2_issue_date"]].toString()
            } else {
                stateForm["3_issue_date"] = null
            }

            if (values["43_date"]) {
                stateForm["43_date"] = values["43_date"].format("YYYY-MM-DD HH:mm:ss")
            } else {
                stateForm["43_date"] = moment().format("YYYY-MM-DD HH:mm:ss")
            }

            return stateForm
        }

        const fields = await createOtherFields()

        setSubmitting(true)
        dispatch(drugsForm(fields))
            .then((data) => {
                setSubmitting(false)
                localStorage.removeItem("TESTING_FORM")
                form.resetFields()
                setSuccessful(data);
            })
            .catch(() => {
                setSuccessful(false);
            });
    }

    function CodeInput(props) {
        return <>
            <MaskedInput
                className={styles.code}
                mask="W/WW/WW/WW.WW.WWWW"
                placeholder="П/ИИ/ММ/ДД.ДД.ДДДД"
                isRevealingMask={true}
                size="18"
                {...props}
                formatCharacters={{
                    'W': {
                        validate() {
                            return true
                        },
                        transform(char) {
                            return char.toUpperCase()
                        }
                    }
                }}
            />

            <Input
                {...props}
                onChange={onChangeCode}/>
        </>
    }

    const onChangeCode = (event) => {
        const value = event.target.value
        form.setFieldsValue({
            "1_code": value
        });
        const valueClean = value.replace(/[. /_]/g, '')
        if (valueClean.length === 13) {
            dispatch(findTesting({
                code: valueClean
            })).then((data) => {
                dispatch(findByCode(data.data))
                form.setFieldsValue({
                    "1_code": value
                });
            })
        }
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
            if (name === '1_code') dispatch(resetFilterState())
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

            <div className={styles.titleContainer}>
                <div className={styles.line}/>
                <h1 className={styles.h1}>Статистика Аптека Москва</h1>
                <p className={styles.required}>* Обязательные поля</p>
                {createResetValue()}
            </div>

            <Form
                layout={'vertical'}
                form={form}
                onFinish={onFinish}
            >

                <div>
                    <Form.Item name="1_code"
                               label="Уникальный идентификационный код (УИК) респондента (пол, 2 буквы имени, 2 буквы имени матери, дата рождения):"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Поле является обязательным для сохранения',
                                   },
                               ]}
                    >
                        <CodeInput/>
                    </Form.Item>

                    {pastTests && <div>
                        {pastTests.map(i => i["45_consultant_comment"] &&
                            <Alert message={i["45_consultant_comment"]} type="info" showIcon description={
                                <div>{moment(i["43_date"]).format('DD.MM.YYYY HH:mm')} {i["42_consultant"] &&
                                <span>({i["42_consultant"]})</span>}</div>}/>)}
                        {pastTests.length > 0 && <br/>}
                        {pastTests.length > 0 ? [...pastTests].sort(function (a, b) {
                                if (b["43_date"] < a["43_date"]) {
                                    return -1;
                                }
                                if (b["43_date"] > a["43_date"]) {
                                    return 1;
                                }
                                return -1;
                            }).map(i =>
                                <Tag>{moment(i["43_date"], 'MM/DD/YYYY HH:mm:ss')
                                    .format('DD.MM.YYYY HH:mm')}</Tag>)
                            : <i style={{ color: "gray" }}>тестирований с этим кодом не найдено</i>
                        }
                    </div>}

                    {createResetValue('1_code')}
                </div>

                <div>
                    <Form.Item name="2_help_type" label="Тип помощи">
                        <Radio.Group>
                            <Radio value="АРВТ">АРВТ</Radio>
                            <Radio value="ПКП">ПКП</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {createResetValue('2_help_type')}
                </div>

                <div>
                    <Form.Item name="3_1_issue_date" label="Срок выдачи">
                        <Radio.Group>
                            <Radio value="Полная схема на месяц">Полная схема на месяц</Radio>
                            <Radio value="Схема на 3 дня">Схема на 3 дня</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="3_2_issue_date">
                        <Input placeholder="Другое"/>
                    </Form.Item>
                    {createResetValue(['3_1_issue_date', '3_2_issue_date'])}
                </div>

                <div>
                    <Form.Item name="4_description_of_circuit" label="Описание схемы">
                        <Input.TextArea placeholder="Ваш ответ"/>
                    </Form.Item>
                    {createResetValue('4_description_of_circuit')}
                </div>

                <div>
                    <Form.Item name="5_consulting_on_regular_testing_provided"
                               label="Оказано консультирование по регулярному тестированию">
                        <Checkbox.Group>
                            <Checkbox value="Да">Да</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    {createResetValue('39_consulting_on_regular_testing_provided')}
                </div>

                <div>
                    <Form.Item name="6_prevention_counseling_provided"
                               label="Оказано консультирование по профилактике">
                        <Checkbox.Group>
                            <Checkbox value="Да">Да</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    {createResetValue('6_prevention_counseling_provided')}
                </div>

                <div>
                    <Form.Item name="7_provided_counseling_on_receiving_treatment_for_hiv"
                               label="Оказано консультирование по получению лечения для ВИЧ+">
                        <Checkbox.Group>
                            <Checkbox value="Да">Да</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    {createResetValue('7_provided_counseling_on_receiving_treatment_for_hiv')}
                </div>

                <div>
                    <Form.Item name="8_consultant_comment" label="Комментарий консультанта">
                        <Input.TextArea placeholder="Ваш ответ"/>
                    </Form.Item>
                    {createResetValue('8_consultant_comment')}
                </div>

                <Form.Item style={{ textAlign: "center" }}>
                    {submitting ? <Spin size="large"/>
                        : <Button htmlType="submit" type="primary" size="large">Сохранить опрос</Button>}
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

export default connect(mapStateToProps, mapDispatchToProps)(TestingForm);
