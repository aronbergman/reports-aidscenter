import React, { useEffect, useState, useCallback } from "react";
import {
  ConfigProvider,
  DatePicker,
  Checkbox,
  Select,
  Input,
  Switch,
  Tooltip,
} from "antd";
import styles from "./PacientsFilter.scss";

// Добавить поиск по пациентам через дату рождения(например, 22.10.1995)
// Добавить поиск пациентов по режиму приема
// Фильтр поиска: по временному периоду
// Фильтр поиска: по режиму приема (вопрос 44 первого визита или же если этот вопрос будет на странице пациента, можно «привязать» его)
// Фильтр поиска: использование наркотиков для секса (вопрос 15 из первого визита или же если этот вопрос будет на странице пациента, можно «привязать» его)
// Фильтр поиска по выявленным ИППП: вопросы из первого визита 31, 34-41.

export const PatientsFilter = (props) => {
  const { onChange } = props;
  const handleChange = useCallback(
    (filter) => {
      console.log("cb", filter);
      onChange(filter);
    },
    [onChange]
  );
  return (
    <div className={styles.filters}>
      <div></div>
      <div>
        <Select
          placeholder="Режим приема"
          defaultValue=""
          optionFilterProp="children"
          onChange={(value) => handleChange({ medicalFrequency: value })}
          style={{ width: 150 }}
        >
          <Select.Option value="">Все режимы</Select.Option>
          <Select.Option value="ежедневный">ежедневный</Select.Option>
          <Select.Option value="ситуативный">ситуативный</Select.Option>
          <Select.Option value="смешанный">смешанный</Select.Option>
        </Select>
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
