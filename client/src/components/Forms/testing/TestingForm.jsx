import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import MaskedInput from 'antd-mask-input'
import { connect, useDispatch, useSelector } from "react-redux";
import moment from 'moment'
import {
    Form,
    Input,
    Button,
    Checkbox,
    Radio,
    DatePicker,
    Tabs,
    Switch,
    Select,
    message,
    Tag,
    Alert
} from 'antd';
import { ADMIN, MODERATOR, USER } from "../../../constants/roles.constants";
import useAuth from "../../../hooks/useAuth";
// import { findByCode } from "../../../actions/filter-testing";
// import { findTesting, testing } from "../../../actions/forms";
import { findByCode } from "../../../redux/reducers/filter.reducer";
import { findTesting, testing } from "../../../redux/thunks/forms";
import pride from './images/pride.jpeg'
import noPride from './images/no-pride.jpg'
import styles from './styles.module.scss'

const {Option} = Select;
const {TabPane} = Tabs;

const TestingForm = ({pastTests}) => {
    const [ expanded, setExpanded ] = useState(true)
    const [ now, setNow ] = useState(true)
    const [ submitting, setSubmitting ] = useState(false)
    const [ successful, setSuccessful ] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [ form ] = Form.useForm();
    const city = JSON.parse(localStorage.getItem("user"))
    let initialValues = {}


    useEffect(() => form.resetFields(), [form, initialValues, submitting]);

    if (localStorage.getItem('TESTING_FORM')) {
        initialValues = {
            ...JSON.parse(localStorage.getItem('TESTING_FORM')),
            ...initialValues
        }
    }

    if (localStorage.getItem('CONSULTANT')) {
        initialValues = {
            "42_consultant": JSON.parse(localStorage.getItem('CONSULTANT')),
            ...initialValues
        }
    }

    const resetForm = () => {
        console.log('resetForm')
        localStorage.removeItem("TESTING_FORM")
        initialValues = {}
        message.success('Поля формы сброшены')
        window.location.reload();
        return form.resetFields()
    }

    const onFormLayoutChange = (values) => {

        if (values["date"] || values["time"]) {
            return
        }

        localStorage.setItem("TESTING_FORM", JSON.stringify(form.getFieldsValue()))

        if (values['42_consultant']) {
            localStorage.setItem("CONSULTANT", JSON.stringify(values['42_consultant']))
        }
    };

    const onFinish = async (values) => {
        console.log('values', values)
        console.log('city.username', city)

        const stateForm = new Object({
            "1_code": values["1_code"],
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
            "42_consultant": values["42_consultant"],
            "45_consultant_comment": values["45_consultant_comment"],
            "46_city": city.username,
        })

        const createOtherFields = () => {

            // "2_how_did_you_know": [...values["2_1_how_did_you_know"], values["2_2_how_did_you_know"]],
            if (values["2_1_how_did_you_know"]?.length && values["2_2_how_did_you_know"]?.length) {
                stateForm["2_how_did_you_know"] = [ ...values["2_1_how_did_you_know"], values["2_2_how_did_you_know"] ].toString()
            } else if (values["2_1_how_did_you_know"]?.length) {
                stateForm["2_how_did_you_know"] = values["2_1_how_did_you_know"].toString()
            } else if (values["2_2_how_did_you_know"]?.length) {
                stateForm["2_how_did_you_know"] = [ values["2_2_how_did_you_know"] ].toString()
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
                stateForm["13_no_using_condom"] = [ ...values["13_1_no_using_condom"], values["13_2_no_using_condom"] ].toString()
            } else if (values["13_1_no_using_condom"]?.length) {
                stateForm["13_no_using_condom"] = values["13_1_no_using_condom"].toString()
            } else if (values["13_2_no_using_condom"]?.length) {
                stateForm["13_no_using_condom"] = [ values["13_2_no_using_condom"] ].toString()
            } else {
                stateForm["13_no_using_condom"] = null
            }

            // "16_used_drugs": [...values["16_1_used_drugs"], values["16_2_used_drugs"]],
            if (values["16_1_used_drugs"]?.length && values["16_2_used_drugs"]?.length) {
                stateForm["16_used_drugs"] = [ ...values["16_1_used_drugs"], values["16_2_used_drugs"] ].toString()
            } else if (values["16_1_used_drugs"]?.length) {
                stateForm["16_used_drugs"] = values["16_1_used_drugs"].toString()
            } else if (values["16_2_used_drugs"]?.length) {
                stateForm["16_used_drugs"] = [ values["16_2_used_drugs"] ].toString()
            } else {
                stateForm["16_used_drugs"] = null
            }

            // "21_used_drugs": [...values["21_1_used_drugs"], values["21_2_used_drugs"]],
            if (values["21_1_used_drugs"]?.length && values["21_2_used_drugs"]?.length) {
                stateForm["21_used_drugs"] = [ ...values["21_1_used_drugs"], values["21_2_used_drugs"] ].toString()
            } else if (values["21_1_used_drugs"]?.length) {
                stateForm["21_used_drugs"] = values["21_1_used_drugs"].toString()
            } else if (values["21_2_used_drugs"]?.length) {
                stateForm["21_used_drugs"] = [ values["21_2_used_drugs"] ].toString()
            } else {
                stateForm["21_used_drugs"] = null
            }

            // "27_registration_on_the_territory": [...values["27_1_registration_on_the_territory"], values["27_2_registration_on_the_territory"]],
            if (values["27_1_registration_on_the_territory"]?.length && values["27_2_registration_on_the_territory"]?.length) {
                stateForm["27_registration_on_the_territory"] = [ values["27_1_registration_on_the_territory"], values["27_2_registration_on_the_territory"] ].toString()
            } else if (values["27_1_registration_on_the_territory"]?.length) {
                stateForm["27_registration_on_the_territory"] = values["27_1_registration_on_the_territory"].toString()
            } else if (values["27_2_registration_on_the_territory"]?.length) {
                stateForm["27_registration_on_the_territory"] = [ values["27_2_registration_on_the_territory"] ].toString()
            } else {
                stateForm["27_registration_on_the_territory"] = null
            }

            // "34_for_prep_you_use": [...values["34_1_for_prep_you_use"], values["34_2_for_prep_you_use"]],
            if (values["34_1_for_prep_you_use"]?.length && values["34_2_for_prep_you_use"]?.length) {
                stateForm["34_for_prep_you_use"] = [ values["34_1_for_prep_you_use"], values["34_2_for_prep_you_use"] ].toString()
            } else if (values["34_1_for_prep_you_use"]?.length) {
                stateForm["34_for_prep_you_use"] = values["34_1_for_prep_you_use"].toString()
            } else if (values["34_2_for_prep_you_use"]?.length) {
                stateForm["34_for_prep_you_use"] = [ values["34_2_for_prep_you_use"] ].toString()
            } else {
                stateForm["34_for_prep_you_use"] = null
            }

            if (values["date"]) {
                stateForm["43_date"] = values["date"].format("M/D/YYYY HH:mm:ss")
            } else {
                stateForm["43_date"] = moment().format("M/D/YYYY HH:mm:ss")
            }

            return stateForm
        }

        const fields = await createOtherFields()

        setSubmitting(true)
        dispatch(testing(fields))
            .then(() => {
                setSubmitting(false)
                setSuccessful(true);
                localStorage.removeItem("TESTING_FORM")
                form.resetFields()
                history.push('/forms')
                message.success('Форма успешно сохранена 👌')
            })
            .catch(() => {
                setSuccessful(false);
            });
    }

    function callback(key) {
        setExpanded(key === "1")
        console.log('expanded', expanded)
    }

    function CodeInput(props) {
        return <MaskedInput
            mask="W/WW/WW/11.11.1111"
            placeholder="П/ИИ/ММ/ДД.ДД.ДДДД"
            size="18"
            { ...props }
            onChange={ onChangeCode }
            formatCharacters={ {
                'W': {
                    validate(char) {
                        return /^[?!,.а-яА-ЯёЁ\s]+$/.test(char)
                    },
                    transform(char) {
                        return char.toUpperCase()
                    }
                }
            } }
        />
    }

    const optionsWithDisabled = [
        {label: 'Аутрич в клубах', value: 'Аутрич в клубах'},
        {label: 'Экраны в клубах', value: 'Экраны в клубах'},
        {label: 'Соцсети/сайт фонда', value: 'Соцсети/сайт фонда'},
        {label: 'Хорнет', value: 'Хорнет'},
        {label: 'Телеграм', value: 'Телеграм'},
        {label: 'Знакомые', value: 'Знакомые'},
        {label: 'Контекстная реклама в Гугле', value: 'Контекстная реклама в Гугле'},
        {label: 'Видео-реклама в Инстаграм', value: 'Видео-реклама в Инстаграм'},
        {label: 'Поисковые системы', value: 'Поисковые системы'},
        {label: 'Тестировался здесь ранее', value: 'Тестировался здесь ранее'},
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

    return (
        <div className={ styles.container }>

            <div className={ styles.resetForm } onClick={ resetForm }>Сбросить поля</div>

            <div className={ styles.image }
                 style={ expanded ? {backgroundImage: `url(${ pride })`} : {backgroundImage: `url(${ noPride })`} }
            />

            <div className={ styles.titleContainer }>
                <div className={ styles.line }/>
                <h1 className={ styles.h1 }>Опрос тестируемых «СПИД.ЦЕНТР»</h1>
                <p className={ styles.required }>* Обязательные поля</p>
            </div>

            <Form
                layout={ 'vertical' }
                form={ form }
                initialValues={ initialValues }
                onValuesChange={ onFormLayoutChange }
                onFinish={ onFinish }
            >

                <div className={ styles.tabs }>
                    <Tabs size="large" defaultActiveKey={ expanded } onChange={ callback }>
                        <TabPane tab="Расширенный" key="1"/>
                        <TabPane tab="Сокращенный" key="0"/>
                    </Tabs>
                </div>

                <div>
                    <Form.Item name="1_code"
                               label="Уникальный идентификационный код (УИК) респондента (пол, 2 буквы имени, 2 буквы имени матери, дата рождения): П/ИИ/ММ/ДД.ДД.ДДДД"
                               rules={ [
                                   {
                                       required: true,
                                       message: 'Поле обязательно для заполнения',
                                   },
                               ] }
                    >
                        <CodeInput/>
                    </Form.Item>

                    { pastTests && <div>
                        { pastTests.map(i => i["45_consultant_comment"] &&
                            <Alert message={ i["45_consultant_comment"] } type="info" showIcon description={
                                <div>{ moment(i["43_date"]).format('DD.MM.YYYY HH:mm') } { i["42_consultant"] &&
                                <span>({ i["42_consultant"] })</span> }</div> }/>) }
                        <br/>
                        { pastTests && [...pastTests].sort(function (a, b) {
                            if (b["43_date"] < a["43_date"]) {
                                return -1;
                            }
                            if (b["43_date"] > a["43_date"]) {
                                return 1;
                            }
                            return -1;
                        }).map(i =>
                            <Tag>{ moment(i["43_date"], 'MM/DD/YYYY HH:mm:ss').format('DD.MM.YYYY HH:mm') }</Tag>) }
                    </div> }


                </div>

                { expanded && <div>
                    <Form.Item name="2_1_how_did_you_know" label="Откуда вы узнали о тестировании?">
                        <Checkbox.Group>
                            { optionsWithDisabled.map(option => <Checkbox
                                value={ option.value }>{ option.label }</Checkbox>) }
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item name="2_2_how_did_you_know">
                        <Input placeholder="Другое"/>
                    </Form.Item>
                </div> }

                { expanded && <Form.Item required name="3_gender" label="Ваш пол?">
                    <Radio.Group>
                        <Radio value="Male">Мужчина</Radio>
                        <Radio value="Famale">Женщина</Radio>
                    </Radio.Group>
                </Form.Item> }

                { expanded && <Form.Item required name="4_age" label="Ваш возраст?">
                    <Radio.Group>
                        <Radio value="18-19 лет">18-19 лет</Radio>
                        <Radio value="20-29 лет">20-29 лет</Radio>
                        <Radio value="30-39 лет">30-39 лет</Radio>
                        <Radio value="40-49 лет">40-49 лет</Radio>
                        <Radio value="50 и старше">50 и старше</Radio>
                    </Radio.Group>
                </Form.Item> }

                { expanded && <div>
                    <Form.Item name="5_1_first_sex" label="В каком возрасте у вас был первый сексуальный контакт?">
                        <Input placeholder="Возраст"/>
                    </Form.Item>
                    <Form.Item name="5_2_first_sex" label="Не было">
                        <Checkbox.Group>
                            <Checkbox value="Не было"/>
                        </Checkbox.Group>
                    </Form.Item>
                </div> }

                { expanded && <div>
                    <Form.Item name="6_1_sexual_partners_from_6_months"
                               label="Были ли у вас сексуальные партнеры за последние 6 месяцев (если да, укажите число)?">
                        <Input placeholder="Укажите число партнеров"/>
                    </Form.Item>
                    <Form.Item name="6_2_sexual_partners_from_6_months" label="Нет">
                        <Checkbox.Group>
                            <Checkbox value="Нет"/>
                        </Checkbox.Group>
                    </Form.Item>
                </div> }

                { expanded && <Form.Item required name="7_constant_sexual_partner"
                                         label="Есть ли у вас постоянный сексуальный партнер?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item> }

                { expanded && <Form.Item required name="8_sex_using_a_condom"
                                         label="Как часто вы занимались сексом в последние 6 месяцев, используя презерватив?">
                    <Radio.Group>
                        <Radio value="Всегда / почти всегда">Всегда / почти всегда</Radio>
                        <Radio value="В большинстве случаев">В большинстве случаев</Radio>
                        <Radio value="Примерно в половине случаев">Примерно в половине случаев</Radio>
                        <Radio value="В меньшинстве случаев">В меньшинстве случаев</Radio>
                        <Radio value="Никогда">Никогда</Radio>
                    </Radio.Group>
                </Form.Item> }

                { expanded && <Form.Item required name="9_condom_for_sex_with_a_permanent"
                                         label="Используете ли вы презерватив при сексе с постоянным партнером?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item> }

                { expanded && <Form.Item required name="10_condom_for_sex_with_a_club"
                                         label="Используете ли вы презерватив при сексе со случайными партнерами?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item> }

                { expanded && <Form.Item required name="11_condom_for_last_sex"
                                         label="Вы пользовались презервативом во время последнего секса?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item> }

                { expanded && <Form.Item name="12_using_condom"
                                         label="Используете ли вы презервативы при (возможны несколько вариантов):">
                    <Checkbox.Group>
                        <Checkbox value="Вагинальном сексе">Вагинальном сексе</Checkbox>
                        <Checkbox value="Оральном сексе">Оральном сексе</Checkbox>
                        <Checkbox value="Анальном сексе">Анальном сексе</Checkbox>
                        <Checkbox value="Не использую">Не использую</Checkbox>
                    </Checkbox.Group>
                </Form.Item> }

                { expanded && <div>
                    <Form.Item name="13_1_no_using_condom"
                               label="Почему вы не использовали презерватив со своим последним сексуальным партнером(возможны несколько вариантов)?">
                        <Checkbox.Group>
                            <Checkbox value="Я использовал его">Я использовал его</Checkbox>
                            <Checkbox value="У меня его не было">У меня его не было</Checkbox>
                            <Checkbox value="Я был в алкогольном/наркотическом опьянении">Я был в
                                алкогольном/наркотическом
                                опьянении</Checkbox>
                            <Checkbox value="Они слишком дорогие">Они слишком дорогие</Checkbox>
                            <Checkbox value="Партнер не хотел пользоваться презервативом">Партнер не хотел пользоваться
                                презервативом</Checkbox>
                            <Checkbox value="Мы были готовы зачать ребенка">Мы были готовы зачать ребенка</Checkbox>
                            <Checkbox value="Я не люблю пользоваться презервативами">Я не люблю пользоваться
                                презервативами</Checkbox>
                            <Checkbox value="Мне кажется, в этом не было необходимости">Мне кажется, в этом не было
                                необходимости</Checkbox>
                            <Checkbox value="Я доверяю своему партнеру">Я доверяю своему партнеру</Checkbox>
                            <Checkbox value="Я просто не думал об этом">Я просто не думал об этом</Checkbox>
                            <Checkbox value="Я использую PrEP">Я использую PrEP</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item name="13_2_no_using_condom">
                        <Input placeholder="Другое"/>
                    </Form.Item>
                </div> }

                { expanded && <Form.Item required name="14_now_there_is_a_condom"
                                         label="У тебя сейчас есть презерватив с собой?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item> }

                { expanded &&
                <Form.Item name="15_with_whom_sex" label="С кем у вас были половые контакты последние 6 месяцев?">
                    <Checkbox.Group>
                        <Checkbox value="Мужчины">Мужчины</Checkbox>
                        <Checkbox value="Женщины">Женщины</Checkbox>
                        <Checkbox value="Трансгендеры">Трансгендеры</Checkbox>
                        <Checkbox value="Не было">Не было</Checkbox>
                    </Checkbox.Group>
                </Form.Item> }

                { expanded && <div>
                    <Form.Item name="16_1_used_drugs"
                               label="Вы употребляли наркотики в последние 12 месяцев (если да, то какие)?">
                        <Checkbox.Group>
                            <Checkbox value="Не употреблял">Не употреблял</Checkbox>
                            <Checkbox value="Героин">Героин</Checkbox>
                            <Checkbox value="Кокаин">Кокаин</Checkbox>
                            <Checkbox value="Марихуана">Марихуана</Checkbox>
                            <Checkbox value="МДМА (экстази)">МДМА (экстази)</Checkbox>
                            <Checkbox value="Мефедрон">Мефедрон</Checkbox>
                            <Checkbox value="Амфетамин">Амфетамин</Checkbox>
                            <Checkbox value="Метамфетамин">Метамфетамин</Checkbox>
                            <Checkbox value="Бутират">Бутират</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item name="16_2_used_drugs">
                        <Input placeholder="Другое"/>
                    </Form.Item>
                </div> }

                { expanded && <Form.Item required name="17_drugs_for_sex"
                                         label="Используете ли вы наркотики для секса?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item> }

                { expanded && <Form.Item required name="18_drugs_or_money_in_exchange_for_sex"
                                         label="Приходилось ли вам получать или давать деньги или наркотики в обмен на сексуальные услуги в последние 12 месяцев?">
                    <Radio.Group>
                        <Radio value="Да, я давал">Да, я давал</Radio>
                        <Radio value="Да, я получал">Да, я получал</Radio>
                        <Radio value="И то и другое">И то и другое</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item> }

                { expanded && <Form.Item required name="19_sexually_transmitted_diseases"
                                         label="Были ли у вас заболевания, передающиеся половым путем, за последние 12 месяцев?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item> }

                { expanded && <Form.Item required name="20_med_sexually_transmitted_diseases"
                                         label="Обращались ли вы за медицинской консультацией по поводу ИППП в последние 12 месяцев?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item> }

                { expanded && <div>
                    <Form.Item name="21_1_used_drugs"
                               label="Диагностировали у вас есть хронические формы гепатита? (если да, укажите форму: A, B, C, D, E)">
                        <Checkbox.Group>
                            <Checkbox value="Нет">Нет</Checkbox>
                            <Checkbox value="Я не знаю об этой болезни">Я не знаю об этой болезни</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item name="21_2_used_drugs">
                        <Input placeholder="Другое"/>
                    </Form.Item>
                </div> }

                { expanded && <Form.Item required name="22_diagnosed_with_syphilis"
                                         label="Был ли у вас ранее диагностирован сифилис?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item> }

                { expanded && <Form.Item required name="23_hiv_tested"
                                         label="Вы когда-нибудь проходили тестирование на ВИЧ?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item> }

                { expanded && <Form.Item required name="24_how_often_hiv_tested"
                                         label="Как часто вы проходите тестирование на ВИЧ?">
                    <Radio.Group>
                        <Radio value="Раз в 3 месяца">Раз в 3 месяца</Radio>
                        <Radio value="Раз в 6 месяцев">Раз в 6 месяцев</Radio>
                        <Radio value="Раз в 12 месяцев">Раз в 12 месяцев</Radio>
                        <Radio value="Менее одного раза в 12 месяцев">Менее одного раза в 12 месяцев</Radio>
                        <Radio value="Первый раз">Первый раз</Radio>
                    </Radio.Group>
                </Form.Item> }

                { expanded && <Form.Item required name="25_do_you_know_your_hiv_status"
                                         label="Знаете ли вы свой ВИЧ-статус?">
                    <Radio.Group>
                        <Radio value="Я ВИЧ-положительный">Я ВИЧ-положительный</Radio>
                        <Radio value="Я ВИЧ-отрицательный">Я ВИЧ-отрицательный</Radio>
                        <Radio value="Я не знаю свой ВИЧ-статус">Я не знаю свой ВИЧ-статус</Radio>
                    </Radio.Group>
                </Form.Item> }


                { expanded && <Form.Item required name="26_you_are_a_citizen_of_russia"
                                         label="Вы гражданин России?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item> }

                { expanded && <div>
                    <Form.Item name="27_1_registration_on_the_territory"
                               label="У вас есть регистрация на территории Московской области? (если есть регистрация другого региона, укажите, какого)">
                        <Radio.Group>
                            <Radio value="Постоянная регистрация">Постоянная регистрация</Radio>
                            <Radio value="Временная регистрация">Временная регистрация</Radio>
                            <Radio value="Нет регистрации">Нет регистрации</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="27_2_registration_on_the_territory">
                        <Input placeholder="Другое"/>
                    </Form.Item>
                </div> }

                { expanded && <Form.Item required name="28_you_education"
                                         label="Ваше образование?">
                    <Radio.Group>
                        <Radio value="Не получил базового среднего образования (не закончил 8-9 классы школы)">Не
                            получил базового
                            среднего образования (не закончил 8-9 классы школы)</Radio>
                        <Radio
                            value="Неполное среднее (закончил 8-9 классы школы или ПТУ / колледжа на базе 8-9 классов)">Неполное
                            среднее (закончил 8-9 классы школы или ПТУ / колледжа на базе 8-9 классов)</Radio>
                        <Radio
                            value="Общее среднее (закончил 10-11 классы школы или ПТУ / колледжа на базе 10-11 классов)">Общее
                            среднее (закончил 10-11 классы школы или ПТУ / колледжа на базе 10-11 классов)</Radio>
                        <Radio
                            value="Среднее специальное (окончил техникум / колледж / колледж со средним специальным образованием)">Среднее
                            специальное (окончил техникум / колледж / колледж со средним специальным
                            образованием)</Radio>
                        <Radio value="Неполное высшее образование (закончил 2-4 года университета)">Неполное высшее
                            образование
                            (закончил 2-4 года университета)</Radio>
                        <Radio value="Высшее (получил диплом университета)">Высшее (получил диплом университета)</Radio>
                        <Radio value="Академическая степень (кандидат наук, доктор наук)">Академическая степень
                            (кандидат наук,
                            доктор наук)</Radio>
                    </Radio.Group>
                </Form.Item> }

                { expanded && <Form.Item required name="29_the_nature_of_your_work"
                                         label="Какое из следующих определений лучше всего описывает характер вашей работы на данный момент?">
                    <Radio.Group>
                        <Radio value="Полная занятость">Полная занятость</Radio>
                        <Radio value="Частичная/неполная занятость">Частичная/неполная занятость</Radio>
                        <Radio
                            value="Полная занятость в собственном бизнесе или в приносящей доход индивидуальной деятельности">Полная
                            занятость в собственном бизнесе или в приносящей доход индивидуальной деятельности</Radio>
                        <Radio
                            value="Случайный заработок, неполная занятость в собственном бизнесе или в приносящей доход индивидуальной деятельности">Случайный
                            заработок, неполная занятость в собственном бизнесе или в приносящей доход индивидуальной
                            деятельности</Radio>
                        <Radio value="Безработный (ищу работу)">Безработный (ищу работу)</Radio>
                        <Radio value="Я не работаю и не ищу работу">Я не работаю и не ищу работу</Radio>
                    </Radio.Group>
                </Form.Item> }


                { expanded && <Form.Item required name="30_marital_status"
                                         label="Ваше семейное положение?">
                    <Radio.Group>
                        <Radio value="Никогда не был женат">Никогда не был женат</Radio>
                        <Radio value="Я живу вместе с партнером, но отношения не зарегистрированы">Я живу вместе с
                            партнером, но
                            отношения не зарегистрированы</Radio>
                        <Radio value="Женат/замужем">Женат/замужем</Radio>
                        <Radio value="Женат/замужем, живу отдельно от партнера">Женат/замужем, живу отдельно от
                            партнера</Radio>
                        <Radio value="В разводе живу отдельно от партнера">В разводе живу отдельно от партнера</Radio>
                        <Radio value="В разводе, но живу с партнером">В разводе, но живу с партнером</Radio>
                        <Radio value="Вдовец/вдова">Вдовец/вдова</Radio>
                    </Radio.Group>
                </Form.Item> }


                { expanded && <Form.Item required name="31_you_are_a_listen_PrEP"
                                         label="Вы уже слышали о доконтактной профилактике (PrEP) до этого?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item> }


                { expanded && <Form.Item required name="32_you_are_a_interest_PrEP"
                                         label="Вы были бы заинтересованы в использовании PrEP?">
                    <Radio.Group>
                        <Radio value="Да, на ежедневной основе">Да, на ежедневной основе</Radio>
                        <Radio value="Да, по требованию (например, только до и после секса без презерватива)">Да, по
                            требованию
                            (например, только до и после секса без презерватива)</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item> }

                { expanded && <Form.Item required name="33_you_are_a_used_PrEP"
                                         label="Вы когда-нибудь уже использовали доконтактную профилактику (PrEP)?">
                    <Radio.Group>
                        <Radio value="Да, на ежедневной основе">Да, на ежедневной основе</Radio>
                        <Radio value="Да, по требованию (например, только до и после секса без презерватива)">Да, по
                            требованию
                            (например, только до и после секса без презерватива)</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item> }


                { expanded && <div>
                    <Form.Item name="34_1_for_prep_you_use"
                               label="Для PrEP вы используете:">
                        <Radio.Group>
                            <Radio value="Truvada">Truvada</Radio>
                            <Radio value="Дженерики Truvada">Дженерики Truvada</Radio>
                            <Radio value="Двухкомпонентную схему (тенофавир и ламивудин/эмтрицитабин)">Двухкомпонентную
                                схему
                                (тенофавир и ламивудин/эмтрицитабин)</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="34_2_for_prep_you_use">
                        <Input placeholder="Другое"/>
                    </Form.Item>
                </div> }


                { expanded && <Form.Item required name="35_you_have_started_taking_prep"
                                         label="Вы начали прием PrEP:">
                    <Radio.Group>
                        <Radio value="После прохождения теста на ВИЧ и консультации с врачом">После прохождения теста на
                            ВИЧ и
                            консультации с врачом</Radio>
                        <Radio value="После теста на ВИЧ">После теста на ВИЧ</Radio>
                        <Radio value="Без каких-либо тестов и консультаций">Без каких-либо тестов и консультаций</Radio>
                    </Radio.Group>
                </Form.Item> }

                <Form.Item required name="36_hiv_test_result"
                           label="Результат теста на ВИЧ:">
                    <Radio.Group>
                        <Radio value="Положительный">Положительный</Radio>
                        <Radio value="Отрицательный">Отрицательный</Radio>
                    </Radio.Group>
                </Form.Item>


                { expanded && <Form.Item required name="37_hepatitis_test_result"
                                         label="Результат теста на Гепатит С:">
                    <Radio.Group>
                        <Radio value="Положительный">Положительный</Radio>
                        <Radio value="Отрицательный">Отрицательный</Radio>
                    </Radio.Group>
                </Form.Item> }

                { expanded && <Form.Item required name="38_syphilis_test_result"
                                         label="Результат теста на Сифилис:">
                    <Radio.Group>
                        <Radio value="Положительный">Положительный</Radio>
                        <Radio value="Отрицательный">Отрицательный</Radio>
                    </Radio.Group>
                </Form.Item> }


                <Form.Item name="39_consulting_on_regular_testing_provided"
                           label="Оказано консультирование по регулярному тестированию">
                    <Checkbox.Group>
                        <Checkbox value="Да">Да</Checkbox>
                    </Checkbox.Group>
                </Form.Item>

                <Form.Item name="40_prevention_counseling_provided" label="Оказано консультирование по профилактике">
                    <Checkbox.Group>
                        <Checkbox value="Да">Да</Checkbox>
                    </Checkbox.Group>
                </Form.Item>

                <Form.Item name="41_provided_counseling_on_receiving_treatment_for_hiv"
                           label="Оказано консультирование по получению лечения для ВИЧ+">
                    <Checkbox.Group>
                        <Checkbox value="Да">Да</Checkbox>
                    </Checkbox.Group>
                </Form.Item>

                <Form.Item
                    name="42_consultant" label="Консультант (выбор запоминается для следующих опросов)"
                    rules={ [ {required: true, message: 'Please select your country!'} ] }
                >
                    <Select>
                        <Option value="Майя Демидова">Майя Демидова</Option>
                        <Option value="Владислав Вишневский">Владислав Вишневский</Option>
                    </Select>
                </Form.Item>

                <div>
                    <Switch checked={ now } onChange={ () => setNow(!now) }/>&nbsp;&nbsp;&nbsp;<label htmlFor="">Сохраняю
                    во
                    время
                    тестирования (текущее время)</label>
                </div>

                {
                    !now && <>
                        <Form.Item rules={ [
                            {
                                required: true,
                                message: 'Поле обязательно для заполнения',
                            },
                        ] } name="date" label={ `Дата и Время` }>
                            <DatePicker showTime format={ 'DD.MM.YYYY HH:mm' }/>
                        </Form.Item>

                    </>
                }

                <Form.Item name="45_consultant_comment" label="Комментарий консультанта">
                    <Input.TextArea placeholder="Комментарий"/>
                </Form.Item>

                { submitting ? "Loading..." : <Form.Item>
                    <Button htmlType="submit" type="primary">Сохранить опрос</Button>
                </Form.Item> }
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

export default useAuth(connect(mapStateToProps, mapDispatchToProps)(TestingForm), USER);
