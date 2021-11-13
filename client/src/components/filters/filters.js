import React from 'react';
import { ConfigProvider, DatePicker, Checkbox, Select, Input, Switch, Tooltip } from 'antd';
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
    setAge,
    setSearchType
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
                     setSearchType,
                     setDrugUsed,
                     setPrepUsed,
                     setSexWorked,
                     setRangePeriod,
                     setCity,
                     setSearchOfCode,
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

    const onChangeSearchType = (type) => {
        setSearchType(type)
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

                <Select
                    style={{ width: 150 }}
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
                    <Option value="nn">Н. Новгород</Option>
                    <Option value="spb">С. Петербург</Option>
                </Select>

                {periodType !== "all" && <ConfigProvider locale={locale}>
                    <RangePicker showTime onChange={onChangeRangePeriod} format={dateFormat}/>
                </ConfigProvider>}

                <div className={styles.groups}>
                    <Checkbox onChange={onChangeDrugUsed}>MSM used drugs</Checkbox>
                    <Checkbox onChange={onChangePrepUsed}>Used PrEP</Checkbox>
                    <Checkbox onChange={onChangeSexWorked}>Sex workers (both ways)</Checkbox>
                </div>

            </div>

            <div className={styles.secondLine}>

                <Select
                    style={{ width: 200 }}
                    placeholder="Тип опроса"
                    defaultValue={formType ? formType : ""}
                    onChange={onChangeFormType}
                >
                    <Option value="">Все типы</Option>
                    <Option value="MSM">МСМ</Option>
                    <Option value="PWID">ПИН</Option>
                    <Option value="short">Общая</Option>
                </Select>

                <Select
                    mode="multiple"
                    style={{ width: 360 }}
                    placeholder="Возраст"
                    onChange={onChangeAge}
                >
                    <Option value="18-19 лет">18-19 лет</Option>
                    <Option value="20-29 лет">20-29 лет</Option>
                    <Option value="30-39 лет">30-39 лет</Option>
                    <Option value="40-49 лет">40-49 лет</Option>
                    <Option value="50 и старше">50 и старше</Option>
                </Select>

                <div className={styles.groupsSearch}>
                    <span>&nbsp;</span>
                    <Tooltip placement="topLeft" title="Множественный поиск анкет клиента или одной анкеты по ID">
                        <Switch
                            onChange={onChangeSearchType}
                            defaultChecked checkedChildren="Клиент" unCheckedChildren="Анкета"/>
                    </Tooltip>
                    <span>&nbsp;</span>
                    <Search
                        placeholder="Код клиента или № анкеты" onSearch={onSearchOfCode} allowClear
                        style={{ width: 280 }}
                        enterButton
                    />

                </div>

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
    setSearchType: (type) => dispatch(setSearchType(type)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
