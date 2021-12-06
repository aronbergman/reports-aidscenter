import React from 'react';
import { ConfigProvider, DatePicker, Checkbox, Select, Input, Switch, Tooltip } from 'antd';
import 'moment/locale/ru';
import locale from 'antd/lib/locale/ru_RU';
import { connect } from "react-redux";
import { setRangePeriod, setTestingCity,
} from "../../redux/reducers/filterHotLine.reducer";
import styles from './styles.module.scss'

const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;
const dateFormat = 'DD.MM.YYYY';

const FiltersHotline = ({
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
                     rangePeriod,
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
                    <RangePicker defaultValue={rangePeriod}
                         onChange={onChangeRangePeriod} format={dateFormat} />
                </ConfigProvider>}

            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    rangePeriod: state.filterHotLine.rangePeriod
})

const mapDispatchToProps = (dispatch) => ({
    setRangePeriod: (period) => dispatch(setRangePeriod(period)),
    setCity: (city) => dispatch(setTestingCity(city)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FiltersHotline);
