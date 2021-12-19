import React from 'react';
import { ConfigProvider, DatePicker, Select } from 'antd';
import 'moment/locale/ru';
import locale from 'antd/lib/locale/ru_RU';
import { connect } from "react-redux";
import { setRangePeriod, setTestingCity, setReason, setResult
} from "../../redux/reducers/filterHotLine.reducer";
import styles from './styles.module.scss'

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'DD.MM.YYYY';

const FiltersHotline = ({
                     periodType,
                     setRangePeriod,
                     setCity,
    setReason,
    setResult,
                     rangePeriod,
                 }) => {

    const onChangeRangePeriod = (period) => {
        setRangePeriod(period)
    }

    const onChangeCity = (city) => {
        setCity(city)
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

    const onChangeReason = (reason) => {
        setReason(reason)
    }

    const onChangeResult = (result) => {
        setResult(result)
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

                <Select
                    mode="multiple"
                    style={{ width: 350 }}
                    placeholder="Причина"
                    onChange={onChangeReason}
                >
                    {reasonForPetitionList.map(reason => (
                        <Option value={reason.value}>{reason.label}</Option>
                    ))}
                </Select>

                <Select
                    mode="multiple"
                    style={{ width: 350 }}
                    placeholder="Результат"
                    onChange={onChangeResult}
                >
                    {consultationResultsList.map(result => (
                        <Option value={result.value}>{result.label}</Option>
                    ))}
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
    setReason: (reason) => dispatch(setReason(reason)),
    setResult: (result) => dispatch(setResult(result)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FiltersHotline);
