import { DeleteOutlined } from "@ant-design/icons";
import { Form, Input, Button, DatePicker, Tabs, Switch, Select, Tag, Alert, Spin } from 'antd';
import MaskedInput from 'antd-mask-input'
import moment from 'moment'
import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { findByCode, resetFilterState } from "../../../redux/reducers/filter.reducer";
import { findTesting, testing } from "../../../redux/thunks/forms";
import { findAllUsersForForms } from "../../../redux/thunks/user.thunks";
import { Success } from "../../Success";
import { FastTabs } from "./fast-tabs";
import { TestingDrugsUser } from "./forms/testing-drugs-user";
import { TestingGeneral } from "./forms/testing-general";
import { TestingMsm } from "./forms/testing-msm";
import noPride from './images/no-pride.jpg'
import pride from './images/pride.jpeg'
import styles from './styles.module.scss'

const { Option } = Select;
const { TabPane } = Tabs;

const TestingForm = ({ pastTests }) => {
    const defaultUser = localStorage.getItem('42_consultant')
    const defaultCity = localStorage.getItem('46_city')
    const history = useHistory();

    const goTo = (path) => {
        history.push("/" + path.target.value)
    }

    const [users, setUsers] = useState([]);
    const [prep, setPrep] = useState(false);
    const [city, setCity] = useState(null);
    const [expanded, setExpanded] = useState(true);
    const [general, setGeneral] = useState(false);
    const [drugsUsers, setDrugsUsers] = useState(false);
    const [submitting, setSubmitting] = useState(false)
    const [successful, setSuccessful] = useState(false);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const subdivisionTestingForm = '2';

    useEffect(() => {
        findAllUsersForForms().then((data) => {
            if (city) {
                localStorage.removeItem('42_consultant')
                setUsers(data.data.filter(i => i.city === city && i.subdivision.includes(subdivisionTestingForm)));
                form.setFieldsValue({ "42_consultant": "" });
            } else {
                setUsers(data.data.filter(i => i.city === defaultCity && i.subdivision.includes(subdivisionTestingForm)));
                form.setFieldsValue({ "42_consultant": defaultUser });
            }
        })

        return () => {
            dispatch(resetFilterState())
        }
        // eslint-disable-next-line
    }, [city, defaultCity, dispatch]);

    // if (localStorage.getItem('TESTING_FORM')) {
    //     initialValues = {
    //         ...JSON.parse(localStorage.getItem('TESTING_FORM')),
    //         ...initialValues
    //     }
    // }

    const resetForm = () => {
        // initialValues = {}
        // localStorage.removeItem("TESTING_FORM")
        dispatch(resetFilterState())
        setSuccessful(false);
        window.location.reload();
        return form.resetFields()
    }

    const onFormLayoutChange = (values) => {
        if (values["33_you_are_a_used_PrEP"] !== "Нет") {
            setPrep(true)
        } else {
            setPrep(false)
        }
    };

    const onFinish = async (values) => {

        const stateForm = new Object({
            "1_code": values["1_code"].replace(/[. /_]/g, '').toUpperCase(),
            "3_gender": values["3_gender"],
            "4_age": values["4_age"],
            "7_constant_sexual_partner": values["7_constant_sexual_partner"],
            "8_sex_using_a_condom": values["8_sex_using_a_condom"],
            "9_condom_for_sex_with_a_permanent": values["9_condom_for_sex_with_a_permanent"],
            "10_condom_for_sex_with_a_club": values["10_condom_for_sex_with_a_club"],
            "11_condom_for_last_sex": values["11_condom_for_last_sex"],
            "12_using_condom": values["12_using_condom"] ? values["12_using_condom"].toString() : null,
            "14_now_there_is_a_condom": values["14_now_there_is_a_condom"],
            "15_with_whom_sex": values["15_with_whom_sex"] ? values["15_with_whom_sex"].toString() : null,
            "17_drugs_for_sex": values["17_drugs_for_sex"],
            "18_drugs_or_money_in_exchange_for_sex": values["18_drugs_or_money_in_exchange_for_sex"],
            "19_sexually_transmitted_diseases": values["19_sexually_transmitted_diseases"],
            "20_med_sexually_transmitted_diseases": values["20_med_sexually_transmitted_diseases"],
            "22_diagnosed_with_syphilis": values["22_diagnosed_with_syphilis"],
            "23_hiv_tested": values["23_hiv_tested"],
            "24_how_often_hiv_tested": values["24_how_often_hiv_tested"],
            "25_do_you_know_your_hiv_status": values["25_do_you_know_your_hiv_status"],
            "26_you_are_a_citizen_of_russia": values["26_you_are_a_citizen_of_russia"],
            "28_you_education": values["28_you_education"],
            "29_the_nature_of_your_work": values["29_the_nature_of_your_work"],
            "30_marital_status": values["30_marital_status"],
            "31_you_are_a_listen_PrEP": values["31_you_are_a_listen_PrEP"],
            "32_you_are_a_interest_PrEP": values["32_you_are_a_interest_PrEP"],
            "33_you_are_a_used_PrEP": values["33_you_are_a_used_PrEP"],
            "35_you_have_started_taking_prep": values["35_you_have_started_taking_prep"],
            "36_hiv_test_result": values["36_hiv_test_result"],
            "37_hepatitis_test_result": values["37_hepatitis_test_result"],
            "38_syphilis_test_result": values["38_syphilis_test_result"],
            "39_consulting_on_regular_testing_provided": values["39_consulting_on_regular_testing_provided"] ? values["39_consulting_on_regular_testing_provided"][0] : null,
            "40_prevention_counseling_provided": values["40_prevention_counseling_provided"] ? values["40_prevention_counseling_provided"][0] : null,
            "41_provided_counseling_on_receiving_treatment_for_hiv": values["41_provided_counseling_on_receiving_treatment_for_hiv"] ? values["41_provided_counseling_on_receiving_treatment_for_hiv"][0] : null,
            "42_consultant": localStorage.getItem("42_consultant"),
            "45_consultant_comment": values["45_consultant_comment"],
            "46_city": localStorage.getItem("46_city"),
            "47_type_form": expanded ? "MSM" : drugsUsers ? "PWID" : "short",
            "47_how_long_have_you_been_using_drugs": values["47_how_long_have_you_been_using_drugs"],
            "62_have_you_used_drugs_in_past_12_m": values["62_have_you_used_drugs_in_past_12_m"],
            "48_ways_of_using_drugs": values["48_ways_of_using_drugs"] ? values["48_ways_of_using_drugs"][0]: null,
            "51_shared_the_same_syringe_with_other_people": values["51_shared_the_same_syringe_with_other_people"],
            "52_who_did_they_share_the_syringe_with": values["52_who_did_they_share_the_syringe_with"] ? values["52_who_did_they_share_the_syringe_with"][0]: null,
            "54_you_usually_disinfect_the_container": values["54_you_usually_disinfect_the_container"],
            "56_where_do_you_usually_get_syringes": values["56_where_do_you_usually_get_syringes"] ? values["56_where_do_you_usually_get_syringes"][0] : null,
            "59_have_had_sex_in_the_past_12_months_using_a_condom": values["59_have_had_sex_in_the_past_12_months_using_a_condom"],
            "60_diagnosed_with_tuberculosis": values["60_diagnosed_with_tuberculosis"] ? values["60_diagnosed_with_tuberculosis"][0] : null,
            "61_hiv_tested_12_m": values["61_hiv_tested_12_m"],
        })

        const createOtherFields = () => {

            // "2_how_did_you_know": [...values["2_1_how_did_you_know"], values["2_2_how_did_you_know"]],
            if (values["2_1_how_did_you_know"]?.length && values["2_2_how_did_you_know"]?.length) {
                stateForm["2_how_did_you_know"] = [...values["2_1_how_did_you_know"], values["2_2_how_did_you_know"]].toString()
            } else if (values["2_1_how_did_you_know"]?.length) {
                stateForm["2_how_did_you_know"] = values["2_1_how_did_you_know"].toString()
            } else if (values["2_2_how_did_you_know"]?.length) {
                stateForm["2_how_did_you_know"] = [values["2_2_how_did_you_know"]].toString()
            } else {
                stateForm["2_how_did_you_know"] = null
            }

            // "5_first_sex": [...values["5_1_first_sex"], values["5_2_first_sex"]],
            if (values["5_2_first_sex"]?.length) {
                stateForm["5_first_sex"] = values["5_2_first_sex"][0]
            } else if (values["5_1_first_sex"]?.length) {
                stateForm["5_first_sex"] = values["5_1_first_sex"]
            } else {
                stateForm["5_first_sex"] = null
            }

            // "6_sexual_partners_from_6_months": [...values["6_1_sexual_partners_from_6_months"], values["6_2_sexual_partners_from_6_months"]],
            if (values["6_2_sexual_partners_from_6_months"]?.length) {
                stateForm["6_sexual_partners_from_6_months"] = values["6_2_sexual_partners_from_6_months"][0]
            } else if (values["6_1_sexual_partners_from_6_months"]?.length) {
                stateForm["6_sexual_partners_from_6_months"] = values["6_1_sexual_partners_from_6_months"]
            } else {
                stateForm["6_sexual_partners_from_6_months"] = null
            }

            // "13_no_using_condom": [...values["13_1_no_using_condom"], values["13_2_no_using_condom"]],
            if (values["13_1_no_using_condom"]?.length && values["13_2_no_using_condom"]?.length) {
                stateForm["13_no_using_condom"] = [...values["13_1_no_using_condom"], values["13_2_no_using_condom"]].toString()
            } else if (values["13_1_no_using_condom"]?.length) {
                stateForm["13_no_using_condom"] = values["13_1_no_using_condom"].toString()
            } else if (values["13_2_no_using_condom"]?.length) {
                stateForm["13_no_using_condom"] = [values["13_2_no_using_condom"]].toString()
            } else {
                stateForm["13_no_using_condom"] = null
            }

            // "50_what_drugs_did_you_use_injection": [...values["50_1_what_drugs_did_you_use_injection"], values["50_2_what_drugs_did_you_use_injection"]],
            if (values["50_1_what_drugs_did_you_use_injection"]?.length && values["50_2_what_drugs_did_you_use_injection"]?.length) {
                stateForm["50_what_drugs_did_you_use_injection"] = [...values["50_1_what_drugs_did_you_use_injection"], values["50_2_what_drugs_did_you_use_injection"]].toString()
            } else if (values["50_1_what_drugs_did_you_use_injection"]?.length) {
                stateForm["50_what_drugs_did_you_use_injection"] = values["50_1_what_drugs_did_you_use_injection"].toString()
            } else if (values["50_2_what_drugs_did_you_use_injection"]?.length) {
                stateForm["50_what_drugs_did_you_use_injection"] = [values["50_2_what_drugs_did_you_use_injection"]].toString()
            } else {
                stateForm["50_what_drugs_did_you_use_injection"] = null
            }

            // "49_what_drugs_did_you_use_non_injection": [...values["49_1_what_drugs_did_you_use_non_injection"], values["49_2_what_drugs_did_you_use_non_injection"]],
            if (values["49_1_what_drugs_did_you_use_non_injection"]?.length && values["49_2_what_drugs_did_you_use_non_injection"]?.length) {
                stateForm["49_what_drugs_did_you_use_non_injection"] = [...values["49_1_what_drugs_did_you_use_non_injection"], values["49_2_what_drugs_did_you_use_non_injection"]].toString()
            } else if (values["49_1_what_drugs_did_you_use_non_injection"]?.length) {
                stateForm["49_what_drugs_did_you_use_non_injection"] = values["49_1_what_drugs_did_you_use_non_injection"].toString()
            } else if (values["49_2_what_drugs_did_you_use_non_injection"]?.length) {
                stateForm["49_what_drugs_did_you_use_non_injection"] = [values["49_2_what_drugs_did_you_use_non_injection"]].toString()
            } else {
                stateForm["49_what_drugs_did_you_use_non_injection"] = null
            }

            // "16_used_drugs": [...values["16_1_used_drugs"], values["16_2_used_drugs"]],
            if (values["16_1_used_drugs"]?.length && values["16_2_used_drugs"]?.length) {
                stateForm["16_used_drugs"] = [...values["16_1_used_drugs"], values["16_2_used_drugs"]].toString()
            } else if (values["16_1_used_drugs"]?.length) {
                stateForm["16_used_drugs"] = values["16_1_used_drugs"].toString()
            } else if (values["16_2_used_drugs"]?.length) {
                stateForm["16_used_drugs"] = [values["16_2_used_drugs"]].toString()
            } else {
                stateForm["16_used_drugs"] = null
            }

            // ?! "21_used_drugs": [...values["21_1_used_drugs"], values["21_2_used_drugs"]],
            if (values["21_1_diagnosed_gepatit"]?.length && values["21_2_diagnosed_gepatit"]?.length) {
                stateForm["21_diagnosed_gepatit"] = [...values["21_1_diagnosed_gepatit"], values["21_2_diagnosed_gepatit"]].toString()
            } else if (values["21_1_diagnosed_gepatit"]?.length) {
                stateForm["21_diagnosed_gepatit"] = values["21_1_diagnosed_gepatit"].toString()
            } else if (values["21_2_diagnosed_gepatit"]?.length) {
                stateForm["21_diagnosed_gepatit"] = [values["21_2_diagnosed_gepatit"]].toString()
            } else {
                stateForm["21_diagnosed_gepatit"] = null
            }

            // "53_why_do_you_use_the_same_syringe": [...values["53_1_why_do_you_use_the_same_syringe"], values["53_2_why_do_you_use_the_same_syringe"]],
            if (values["53_1_why_do_you_use_the_same_syringe"]?.length && values["53_2_why_do_you_use_the_same_syringe"]?.length) {
                stateForm["53_why_do_you_use_the_same_syringe"] = [...values["53_1_why_do_you_use_the_same_syringe"], values["53_2_why_do_you_use_the_same_syringe"]].toString()
            } else if (values["53_1_why_do_you_use_the_same_syringe"]?.length) {
                stateForm["53_why_do_you_use_the_same_syringe"] = values["53_1_why_do_you_use_the_same_syringe"].toString()
            } else if (values["53_2_why_do_you_use_the_same_syringe"]?.length) {
                stateForm["53_why_do_you_use_the_same_syringe"] = [values["53_2_why_do_you_use_the_same_syringe"]].toString()
            } else {
                stateForm["53_why_do_you_use_the_same_syringe"] = null
            }

            // "55_how_do_you_usually_disinfect_syringes_and_needles": [...values["55_1_how_do_you_usually_disinfect_syringes_and_needles"], values["55_2_how_do_you_usually_disinfect_syringes_and_needles"]],
            if (values["55_1_how_do_you_usually_disinfect_syringes_and_needles"]?.length && values["55_2_how_do_you_usually_disinfect_syringes_and_needles"]?.length) {
                stateForm["55_how_do_you_usually_disinfect_syringes_and_needles"] = [...values["55_1_how_do_you_usually_disinfect_syringes_and_needles"], values["55_2_how_do_you_usually_disinfect_syringes_and_needles"]].toString()
            } else if (values["55_1_how_do_you_usually_disinfect_syringes_and_needles"]?.length) {
                stateForm["55_how_do_you_usually_disinfect_syringes_and_needles"] = values["55_1_how_do_you_usually_disinfect_syringes_and_needles"].toString()
            } else if (values["55_2_how_do_you_usually_disinfect_syringes_and_needles"]?.length) {
                stateForm["55_how_do_you_usually_disinfect_syringes_and_needles"] = [values["55_2_how_do_you_usually_disinfect_syringes_and_needles"]].toString()
            } else {
                stateForm["55_how_do_you_usually_disinfect_syringes_and_needles"] = null
            }

            // "57_undergo_treatment_in_a_narcological_hospital": [...values["57_1_undergo_treatment_in_a_narcological_hospital"], values["57_2_undergo_treatment_in_a_narcological_hospital"]],
            if (values["57_2_undergo_treatment_in_a_narcological_hospital"]?.length) {
                stateForm["57_undergo_treatment_in_a_narcological_hospital"] = values["57_2_undergo_treatment_in_a_narcological_hospital"][0]
            } else if (values["57_1_undergo_treatment_in_a_narcological_hospital"]?.length) {
                stateForm["57_undergo_treatment_in_a_narcological_hospital"] = values["57_1_undergo_treatment_in_a_narcological_hospital"]
            } else {
                stateForm["57_undergo_treatment_in_a_narcological_hospital"] = null
            }

            // "58_how_many_sexual_partners": [...values["58_1_how_many_sexual_partners"], values["58_2_how_many_sexual_partners"]],
            if (values["58_2_how_many_sexual_partners"]?.length) {
                stateForm["58_how_many_sexual_partners"] = values["58_2_how_many_sexual_partners"][0]
            } else if (values["58_1_how_many_sexual_partners"]?.length) {
                stateForm["58_how_many_sexual_partners"] = values["58_1_how_many_sexual_partners"]
            } else {
                stateForm["58_how_many_sexual_partners"] = null
            }

            // "27_registration_on_the_territory": [...values["27_1_registration_on_the_territory"], values["27_2_registration_on_the_territory"]],
            if (values["27_1_registration_on_the_territory"]?.length && values["27_2_registration_on_the_territory"]?.length) {
                stateForm["27_registration_on_the_territory"] = [values["27_1_registration_on_the_territory"], values["27_2_registration_on_the_territory"]].toString()
            } else if (values["27_1_registration_on_the_territory"]?.length) {
                stateForm["27_registration_on_the_territory"] = values["27_1_registration_on_the_territory"].toString()
            } else if (values["27_2_registration_on_the_territory"]?.length) {
                stateForm["27_registration_on_the_territory"] = [values["27_2_registration_on_the_territory"]].toString()
            } else {
                stateForm["27_registration_on_the_territory"] = null
            }

            // "34_for_prep_you_use": [...values["34_1_for_prep_you_use"], values["34_2_for_prep_you_use"]],
            if (values["34_1_for_prep_you_use"]?.length && values["34_2_for_prep_you_use"]?.length) {
                stateForm["34_for_prep_you_use"] = [values["34_1_for_prep_you_use"], values["34_2_for_prep_you_use"]].toString()
            } else if (values["34_1_for_prep_you_use"]?.length) {
                stateForm["34_for_prep_you_use"] = values["34_1_for_prep_you_use"].toString()
            } else if (values["34_2_for_prep_you_use"]?.length) {
                stateForm["34_for_prep_you_use"] = [values["34_2_for_prep_you_use"]].toString()
            } else {
                stateForm["34_for_prep_you_use"] = null
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
        dispatch(testing(fields))
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

    function callback(key) {
        setGeneral(key === "0")
        setExpanded(key === "1")
        setDrugsUsers(key === "2")

        form.setFieldsValue({
            "47_type_form": key
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

    const optionsWithDisabled = [
        { label: 'Знакомые', value: 'Знакомые' },
        { label: 'Поисковые системы', value: 'Поисковые системы' },
        { label: 'Телеграм', value: 'Телеграм' },
        { label: 'Тестировался здесь ранее', value: 'Тестировался здесь ранее' },
        { label: 'Соцсети/сайт фонда', value: 'Соцсети/сайт фонда' },
        { label: 'Хорнет', value: 'Хорнет' },
        { label: 'Аутрич в клубах', value: 'Аутрич в клубах' },
        { label: 'Экраны в клубах', value: 'Экраны в клубах' },
        { label: 'Контекстная реклама в Гугле', value: 'Контекстная реклама в Гугле' },
        { label: 'Видео-реклама в Инстаграм', value: 'Видео-реклама в Инстаграм' },
    ];

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

    const setCityHandler = (city) => {
        localStorage.setItem('46_city', city)
        setCity(city)
        form.setFieldsValue({
            "46_city": city
        });
    }

    const setUserHandler = (consultant) => {
        localStorage.setItem('42_consultant', consultant)
        form.setFieldsValue({
            "42_consultant": consultant
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

            <div className={styles.image}
                 style={expanded ? { backgroundImage: `url(${pride})` } : { backgroundImage: `url(${noPride})` }}
            />

            <div className={styles.titleContainer}>
                <div className={styles.line}/>
                <h1 className={styles.h1}>Опрос тестируемых</h1>
                <p className={styles.required}>* Обязательные поля</p>

                {createResetValue()}
            </div>

            <Form
                layout={'vertical'}
                form={form}
                onFinish={onFinish}
                onValuesChange={onFormLayoutChange}
                // initialValues={initialValues}
            >

                <div className={styles.tabs}>
                    <Tabs size="large" defaultActiveKey={expanded} onChange={callback}>
                        <TabPane tab="МСМ" key="1"/>
                        <TabPane tab="ПИН" key="2"/>
                        <TabPane tab="Общая поп." key="0"/>
                    </Tabs>
                </div>

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

                {expanded && <TestingMsm
                    optionsWithDisabled={optionsWithDisabled}
                    createResetValue={createResetValue}
                    prep={prep}
                />}

                {general && <TestingGeneral createResetValue={createResetValue}/>}

                {drugsUsers && <TestingDrugsUser createResetValue={createResetValue}/>}

                <Form.Item required name="43_date" label={`Дата и Время`}>
                    <DatePicker showNow defaultValue={moment()} showTime format={'DD.MM.YYYY HH:mm'}/>
                </Form.Item>

                <Form.Item name="46_city" label="Город">
                    <Select defaultValue={defaultCity} onChange={setCityHandler}>
                        <Option value="moscow">Москва</Option>
                        <Option value="spb">Санкт-Петербург</Option>
                        <Option value="nn">Нижний Новгород</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="42_consultant" label="Консультант">
                    {
                        users.length
                            ? (
                                <Select onChange={setUserHandler}>
                                    {users.map(user => <Option value={user.username}>{user.appointment}</Option>)}
                                </Select>
                            )
                            : city
                                ? <i>Для города не сохранены Консультанты</i>
                                : <i>Выбор доступен после указания города</i>
                    }
                </Form.Item>

                <div>
                    <Form.Item name="45_consultant_comment" label="Комментарий">
                        <Input.TextArea placeholder="Комментарий"/>
                    </Form.Item>
                    {createResetValue('45_consultant_comment')}
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
