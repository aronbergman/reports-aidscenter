import { ConfigProvider, DatePicker, Select } from 'antd';
import locale from 'antd/lib/locale/ru_RU';
import 'moment/locale/ru';
import React from 'react';
import { connect } from "react-redux";
import { setRangePeriod, setTestingCity, setTestingType } from "../../redux/reducers/filterDrugs.reducer";
import styles from './styles.module.scss'

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'DD.MM.YYYY';

const FiltersDrugs = ({
                          periodType,
                          setRangePeriod,
                          setCity,
                          setType,
                          rangePeriod,
                      }) => {

    const onChangeRangePeriod = (period) => {
        setRangePeriod(period)
    }

    const onChangeCity = (city) => {
        setCity(city)
    }

    const onChangeType = (type) => {
        setType(type)
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
                                 onChange={onChangeRangePeriod} format={dateFormat}/>
                </ConfigProvider>}

                <Select
                    style={{ width: 180 }}
                    placeholder="Тип помощи"
                    defaultValue=""
                    onClear={() => {
                    }}
                    optionFilterProp="children"
                    onChange={onChangeType}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="">Все типы помощи</Option>
                    <Option value="АРВТ">АРВТ</Option>
                    <Option value="ПКП">ПКП</Option>
                </Select>

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
    setType: (type) => dispatch(setTestingType(type)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FiltersDrugs);
