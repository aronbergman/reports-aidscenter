import React from 'react';
import { ConfigProvider, DatePicker, Checkbox, Select } from 'antd';
import 'moment/locale/ru';
import locale from 'antd/lib/locale/ru_RU';
import { connect } from "react-redux";
import {
    setRangePeriod, setTestingCity,
    setTestingDrugUsed,
    setTestingPrepUsed,
    setTestingSexWorked
} from "../../redux/reducers/filter.reducer";
// import {
//     setTestingDrugUsed,
//     setTestingPrepUsed,
//     setRangePeriod,
//     setTestingCity,
//     setTestingSexWorked
// } from "../../actions/filter-testing";
import styles from './styles.module.scss'

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'DD.MM.YYYY HH:mm:ss';

const Filters = ({
                     sexWorked,
                     usedPrep,
                     usedDrugs,
                     periodType,
                     setDrugUsed,
                     setPrepUsed,
                     setSexWorked,
                     setRangePeriod,
                     setCity
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

    return (
        <div className={styles.filters}>
            {periodType !== "all" && <ConfigProvider locale={locale}>
                <RangePicker showTime onChange={onChangeRangePeriod} format={dateFormat}/>
            </ConfigProvider>}
            <div className={styles.groups}>
                <Checkbox onChange={onChangeDrugUsed}>Used drugs</Checkbox>
                <Checkbox onChange={onChangePrepUsed}>Used PrEP</Checkbox>
                <Checkbox onChange={onChangeSexWorked}>Sex workers</Checkbox>
            </div>

            <Select
                allowClear
                style={{ width: 200 }}
                placeholder="Фильтр по филиалу"
                optionFilterProp="children"
                onChange={onChangeCity}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="moscow">Москва</Option>
                <Option value="nn">Нижний Новгород</Option>
                <Option value="spb">Санкт-Петербург</Option>
            </Select>

            {/*накинуть фильтр по возрасту*/}
        </div>
    );
};

const mapStateToProps = (state) => ({
    periodType: state.filter.periodType,
    usedDrugs: state.filter.usedDrugs,
    sexWorked: state.filter.sexWorked,
    usedPrep: state.filter.usedPrep,
})

const mapDispatchToProps = (dispatch) => ({
    setDrugUsed: (used) => dispatch(setTestingDrugUsed(used)),
    setPrepUsed: (used) => dispatch(setTestingPrepUsed(used)),
    setSexWorked: (used) => dispatch(setTestingSexWorked(used)),
    setRangePeriod: (period) => dispatch(setRangePeriod(period)),
    setCity: (city) => dispatch(setTestingCity(city)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
