import React from 'react';
import { ConfigProvider, DatePicker, Checkbox, Select, Input, Radio } from 'antd';
import 'moment/locale/ru';
import locale from 'antd/lib/locale/ru_RU';
import { connect } from "react-redux";
import {
    setSearchOfCode,
    setRangePeriod, setTestingCity,
    setTestingDrugUsed,
    setTestingPrepUsed,
    setTestingSexWorked,
    setFormType,
    setAge
} from "../../redux/reducers/filter.reducer";
import styles from './styles.module.scss'

const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;
const dateFormat = 'DD.MM.YYYY HH:mm:ss';

const Filters = ({
                     sexWorked,
                     usedPrep,
                     usedDrugs,
                     periodType,
                     formType,
                     setFormType,
                     setAge,
                     setDrugUsed,
                     setPrepUsed,
                     setSexWorked,
                     setRangePeriod,
                     setCity,
                     setSearchOfCode
                 }) => {

    const onChangeDrugUsed = () => {
        setDrugUsed(!usedDrugs)
    }
    const onChangePrepUsed = () => {
        setPrepUsed(!usedPrep)
    }
    const onChangeSexWorked = () => {
        setSexWorked(!sexWorked)
    }

    const onChangeRangePeriod = (period) => {
        setRangePeriod(period)
    }

    const onChangeCity = (city) => {
        setCity(city)
    }

    const onChangeFormType = (type) => {
        setFormType(type)
    }

    const onChangeAge = (age) => {
        setAge(age)
    }

    const onSearchOfCode = (value) => {
        setSearchOfCode(value)
    }

    return (
        <div className={styles.filters}>
            <div className={styles.firstLine}>
                {periodType !== "all" && <ConfigProvider locale={locale}>
                    <RangePicker showTime onChange={onChangeRangePeriod} format={dateFormat}/>
                </ConfigProvider>}
                <div className={styles.groups}>
                    <Checkbox onChange={onChangeDrugUsed}>Used drugs</Checkbox>
                    <Checkbox onChange={onChangePrepUsed}>Used PrEP</Checkbox>
                    <Checkbox onChange={onChangeSexWorked}>Sex workers</Checkbox>
                </div>

                <Select
                    style={{ width: 200 }}
                    placeholder="Фильтр по филиалу"
                    defaultValue=""
                    onClear={() => {
                    }}
                    optionFilterProp="children"
                    onChange={onChangeCity}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="">Все филиалы</Option>
                    <Option value="moscow">Москва</Option>
                    <Option value="nn">Нижний Новгород</Option>
                    <Option value="spb">Санкт-Петербург</Option>
                </Select>

                {/*накинуть фильтр по возрасту*/}
            </div>

            <div className={styles.secondLine}>

                <Search
                    placeholder="поиск анкет по коду" onSearch={onSearchOfCode} allowClear style={{ width: 300 }}
                    enterButton/>

                <Select
                    style={{ width: 200 }}
                    placeholder="Тип опроса"
                    defaultValue={formType ? formType : ""}
                    onChange={onChangeFormType}
                >
                    <Option value="">Все типы опросов</Option>
                    <Option value="expanded">Расширенный опрос</Option>
                    <Option value="short">Сокращённый опрос</Option>
                </Select>

                <Select
                    mode="multiple"
                    style={{ width: '400px' }}
                    placeholder="Возраст"
                    onChange={onChangeAge}
                >
                    <Option value="18-19 лет">18-19 лет</Option>
                    <Option value="20-29 лет">20-29 лет</Option>
                    <Option value="30-39 лет">30-39 лет</Option>
                    <Option value="40-49 лет">40-49 лет</Option>
                    <Option value="50 и старше">50 и старше</Option>
                </Select>

            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    periodType: state.filter.periodType,
    usedDrugs: state.filter.usedDrugs,
    sexWorked: state.filter.sexWorked,
    usedPrep: state.filter.usedPrep,
    formType: state.filter.formType,
})

const mapDispatchToProps = (dispatch) => ({
    setDrugUsed: (used) => dispatch(setTestingDrugUsed(used)),
    setPrepUsed: (used) => dispatch(setTestingPrepUsed(used)),
    setSexWorked: (used) => dispatch(setTestingSexWorked(used)),
    setRangePeriod: (period) => dispatch(setRangePeriod(period)),
    setCity: (city) => dispatch(setTestingCity(city)),
    setSearchOfCode: (code) => dispatch(setSearchOfCode(code)),
    setFormType: (type) => dispatch(setFormType(type)),
    setAge: (age) => dispatch(setAge(age)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
