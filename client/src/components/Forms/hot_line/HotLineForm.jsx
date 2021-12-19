import { DeleteOutlined } from "@ant-design/icons";
import { Form, Input, Button, Checkbox, Radio, Select, Spin, DatePicker } from 'antd';
import moment from 'moment'
import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { findByCode, resetFilterState } from "../../../redux/reducers/filter.reducer";
import { hotLineForm } from "../../../redux/thunks/forms";
import { findAllUsersForForms } from "../../../redux/thunks/user.thunks";
import { FastTabs } from "../testing/fast-tabs";
import noPride from "./image.jpeg";
import styles from './styles.module.scss'
import { Success } from "./Success";

const { Option } = Select;

const HotLineForm = () => {
    const defaultCity = localStorage.getItem('1_city')
    const defaultUser = localStorage.getItem('2_consultant')
    const history = useHistory();

    const goTo = (path) => {
        history.push("/" + path.target.value)
    }

    const [users, setUsers] = useState([])
    const [city, setCity] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const [successful, setSuccessful] = useState(false);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const subdivisionHotLineForm = '4'

    const sortByName = (a, b) => {
        var nameA = a.appointment.toUpperCase();
        var nameB = b.appointment.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    }

    useEffect(() => {
        findAllUsersForForms().then((data) => {
            if (city) {
                localStorage.removeItem('2_consultant')
                setUsers(data.data
                    .filter(i => i.city === city && i.subdivision.includes(subdivisionHotLineForm))
                    .sort((a, b) => sortByName(a, b)));

                form.setFieldsValue({
                    "2_consultant": ""
                });
            } else {
                setUsers(data.data
                    .filter(i => i.city === defaultCity && i.subdivision.includes(subdivisionHotLineForm))
                    .sort((a, b) => sortByName(a, b)));

                form.setFieldsValue({
                    "2_consultant": defaultUser
                });
            }
        })

        return () => {
            dispatch(resetFilterState())
        }
    }, [city, defaultCity, defaultUser, dispatch, form]);

    useEffect(() => {
        console.log('first')
        defaultCity && form.setFieldsValue({
            "1_city": defaultCity
        });
        if (defaultUser) {
            form.setFieldsValue({
                "2_consultant": defaultUser
            });
        }
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
            "2_consultant": localStorage.getItem("2_consultant"),
            "3_source_of_appeal": values["3_source_of_appeal"],
            "7_consulting_on_regular_testing_provided": values["7_consulting_on_regular_testing_provided"] ? values["7_consulting_on_regular_testing_provided"][0] : null,
            "8_prevention_counseling_provided": values["8_prevention_counseling_provided"] ? values["8_prevention_counseling_provided"][0] : null,
            "9_provided_counseling_on_receiving_treatment_for_hiv": values["9_provided_counseling_on_receiving_treatment_for_hiv"] ? values["9_provided_counseling_on_receiving_treatment_for_hiv"][0] : null,
            "10_consultant_comment": values["10_consultant_comment"],
        })

        const createOtherFields = () => {

            // 5_1_reason_for_petition 5_2_reason_for_petition
            if (values["5_1_reason_for_petition"]?.length && values["5_2_reason_for_petition"]?.length) {
                stateForm["5_reason_for_petition"] = [...values["5_1_reason_for_petition"], values["5_2_reason_for_petition"]].toString()
            } else if (values["5_1_reason_for_petition"]?.length) {
                stateForm["5_reason_for_petition"] = values["5_1_reason_for_petition"].toString()
            } else if (values["5_2_reason_for_petition"]?.length) {
                stateForm["5_reason_for_petition"] = [values["5_2_reason_for_petition"]].toString()
            } else {
                stateForm["5_reason_for_petition"] = null
            }

            // 6_1_consultation_results 6_2_consultation_results
            if (values["6_1_consultation_results"]?.length && values["6_2_consultation_results"]?.length) {
                stateForm["6_consultation_results"] = [...values["6_1_consultation_results"], values["6_2_consultation_results"]].toString()
            } else if (values["6_1_consultation_results"]?.length) {
                stateForm["6_consultation_results"] = values["6_1_consultation_results"].toString()
            } else if (values["6_2_consultation_results"]?.length) {
                stateForm["6_consultation_results"] = [values["6_2_consultation_results"]].toString()
            } else {
                stateForm["6_consultation_results"] = null
            }

            if (values["4_date"]) {
                stateForm["4_date"] = values["4_date"].format("YYYY-MM-DD HH:mm:ss")
            } else {
                stateForm["4_date"] = moment().format("YYYY-MM-DD HH:mm:ss")
            }

            return stateForm
        }

        const fields = await createOtherFields()
        setSubmitting(true)

        dispatch(hotLineForm(fields))
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

    const reasonForPetitionList = [
        {
            label: 'Опасный контакт (оценка рисков, рекомендации по профилактике)',
            value: 'Опасный контакт (оценка рисков, рекомендации по профилактике)'
        },
        { label: 'Постконтактная профилактика', value: 'Постконтактная профилактика' },
        { label: 'Доконтактная профилактика', value: 'Доконтактная профилактика' },
        { label: 'Недавнее получение ВИЧ+ статуса', value: 'Недавнее получение ВИЧ+ статуса' },
        {
            label: 'Жизнь с ВИЧ (аспекты для людей, живущих с ВИЧ)',
            value: 'Жизнь с ВИЧ (аспекты для людей, живущих с ВИЧ)'
        },
        {
            label: 'Жизнь с ВИЧ (аспекты для родных, близких, партнёров ЛЖВ)',
            value: 'Жизнь с ВИЧ (аспекты для родных, близких, партнёров ЛЖВ)'
        },
        { label: 'АРВТ и проблемы с ней', value: 'АРВТ и проблемы с ней' },
        { label: 'Юридические вопросы и нарушение прав ЛЖВ', value: 'Юридические вопросы и нарушение прав ЛЖВ' },
        { label: 'Консультации по тестированию', value: 'Консультации по тестированию' },
    ];

    const consultationResultsList = [
        { label: 'Оказана информационная поддержка', value: 'Оказана информационная поддержка' },
        { label: 'Оказана психологическая поддержка', value: 'Оказана психологическая поддержка' },
        { label: 'Клиент направлен в региональный Центр СПИДа', value: 'Клиент направлен в региональный Центр СПИДа' },
        {
            label: 'Клиент направлен в другие региональные организации',
            value: 'Клиент направлен в другие региональные организации'
        },
    ]

    const setCityHandler = (city) => {
        localStorage.setItem('1_city', city)
        setCity(city)
        form.setFieldsValue({
            "1_city": city
        });
    }

    const setUserHandler = (consultant) => {
        localStorage.setItem('2_consultant', consultant)
        form.setFieldsValue({
            "2_consultant": consultant
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

            <div className={styles.image}
                 style={{ backgroundImage: `url(${noPride})` }}
            />

            <div className={styles.titleContainer}>
                <div className={styles.line}/>
                <h1 className={styles.h1}>Горячая линия</h1>
                <p className={styles.required}>* Обязательные поля</p>

                {createResetValue()}
            </div>

            <Form
                layout={'vertical'}
                form={form}
                onFinish={onFinish}>

                <div>
                    <Form.Item name="1_city" label="Филиал и Консультант"
                               rules={[{ required: true, message: 'Поле является обязательным' }]}>
                        <Select defaultValue={defaultCity} value={form.getFieldsValue()["1_city"]}
                                onChange={setCityHandler}>
                            <Option value="moscow">Москва</Option>
                            <Option value="spb">Санкт-Петербург</Option>
                            <Option value="nn">Нижний Новгород</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="2_consultant"
                               style={{ margin: 0 }}
                        // rules={[{ required: true, message: 'Поле является обязательным' }]}
                    >
                        {
                            users.length
                                ? (
                                    <Select onChange={setUserHandler}>
                                        {users.map(user => <Option value={user.appointment}>{user.appointment}</Option>)}
                                    </Select>
                                )
                                : city
                                    ? <i>Для города не сохранены Консультанты</i>
                                    : <i>Выбор доступен после указания города</i>
                        }
                    </Form.Item>
                </div>

                <div>
                    <Form.Item rules={[{ required: true, message: 'Поле является обязательным' }]}
                               name="3_source_of_appeal" label="Источник обращения">
                        <Radio.Group>
                            <Radio value="Телефон">Телефон</Radio>
                            <Radio value="Мессенджеры (WhatsApp, Telegram, Viber)">Мессенджеры (WhatsApp, Telegram,
                                Viber)</Radio>
                            <Radio value="Cоциальные сети (ВК, Facebook)">Cоциальные сети (ВК, Facebook)</Radio>
                            <Radio value="Cоциальные сети для ключевых групп (Hornet и пр.)">Cоциальные сети для
                                ключевых групп (Hornet и пр.)</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {createResetValue('3_source_of_appeal')}
                </div>

                <Form.Item required name="4_date" label={`Дата и Время`}>
                    <DatePicker defaultValue={moment()} showTime format={'DD.MM.YYYY HH:mm'}/>
                </Form.Item>

                <div>
                    <Form.Item name="5_1_reason_for_petition" label="Причина обращения">
                        <Checkbox.Group>
                            {reasonForPetitionList.map(option => <Checkbox
                                value={option.value}>{option.label}</Checkbox>)}
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item name="5_2_reason_for_petition">
                        <Input placeholder="Другая"/>
                    </Form.Item>
                    {createResetValue(['5_1_reason_for_petition', '5_2_reason_for_petition'])}
                </div>

                <div>
                    <Form.Item rules={[{ required: true, message: 'Поле является обязательным' }]}
                               name="6_1_consultation_results" label="Результаты консультации">
                        <Checkbox.Group>
                            {consultationResultsList.map(option => <Checkbox
                                value={option.value}>{option.label}</Checkbox>)}
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item name="6_2_consultation_results">
                        <Input placeholder="Другой"/>
                    </Form.Item>
                    {createResetValue(['6_1_consultation_results', '6_2_consultation_results'])}
                </div>

                <div>
                    <Form.Item name="7_consulting_on_regular_testing_provided"
                               label="Оказано консультирование по регулярному тестированию">
                        <Checkbox.Group>
                            <Checkbox value="Да">Да</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    {createResetValue('7_consulting_on_regular_testing_provided')}
                </div>

                <div>
                    <Form.Item name="8_prevention_counseling_provided"
                               label="Оказано консультирование по профилактике">
                        <Checkbox.Group>
                            <Checkbox value="Да">Да</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    {createResetValue('8_prevention_counseling_provided')}
                </div>

                <div>
                    <Form.Item name="9_provided_counseling_on_receiving_treatment_for_hiv"
                               label="Оказано консультирование по получению лечения для ВИЧ+">
                        <Checkbox.Group>
                            <Checkbox value="Да">Да</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    {createResetValue('9_provided_counseling_on_receiving_treatment_for_hiv')}
                </div>

                <div>
                    <Form.Item name="10_consultant_comment" label="Комментарий">
                        <Input.TextArea placeholder="Комментарий"/>
                    </Form.Item>
                    {createResetValue('10_consultant_comment')}
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

export default connect(mapStateToProps, mapDispatchToProps)(HotLineForm);
