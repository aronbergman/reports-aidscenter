import React, { useCallback } from "react";
import { DatePicker, Checkbox, Select, Form, Row, Col } from "antd";

// Добавить поиск по пациентам через дату рождения(например, 22.10.1995)
// Добавить поиск пациентов по режиму приема
// Фильтр поиска: по временному периоду
// Фильтр поиска: по режиму приема (вопрос 44 первого визита или же если этот вопрос будет на странице пациента, можно «привязать» его)
// Фильтр поиска: использование наркотиков для секса (вопрос 15 из первого визита или же если этот вопрос будет на странице пациента, можно «привязать» его)
// Фильтр поиска по выявленным ИППП: вопросы из первого визита 31, 34-41.

const dateFormat = "DD.MM.YYYY";

export const PatientsFilter = (props) => {
  const { onChange } = props;
  const handleChange = useCallback(
    (filter) => {
      onChange(filter);
    },
    [onChange]
  );
  const handleCheckbox = useCallback((data) => {
    const { target } = data;
    if (target) {
      handleChange({ [target.value]: target.checked ? 1 : 0 });
    }
  }, [handleChange]);
  const inputWidth = "calc(100% - 20px)";
  return (
    <Form layout="vertical" style={{ maxWidth: "1000px" }}>
      <Row>
        <Col span={12}>
          <Form.Item label="Период">
            <DatePicker.RangePicker
              format={dateFormat}
              onChange={(date, dateString) => {
                const [dateStart, dateEnd] = dateString;
                if (dateStart && dateEnd) {
                  handleChange({ dateStart, dateEnd });
                }
              }}
              style={{ width: inputWidth }}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Дата рождения">
            <DatePicker
              format={dateFormat}
              onChange={(date, dateString) =>
                handleChange({ birthDay: dateString })
              }
              style={{ width: inputWidth }}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Режим приема">
            <Select
              placeholder="Режим приема"
              defaultValue=""
              optionFilterProp="children"
              onChange={(value) => handleChange({ medicalFrequency: value })}
              style={{ width: inputWidth }}
            >
              <Select.Option value="">Все режимы</Select.Option>
              <Select.Option value="ежедневный">ежедневный</Select.Option>
              <Select.Option value="ситуативный">ситуативный</Select.Option>
              <Select.Option value="смешанный">смешанный</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <Form.Item label="ИППП">
            <Checkbox.Group>
              <Checkbox name="d1" value="d1" onChange={handleCheckbox}>
                ВИЧ
              </Checkbox>
              <Checkbox name="d2" value="d2" onChange={handleCheckbox}>
                Геп. В
              </Checkbox>
              <Checkbox name="d3" value="d3" onChange={handleCheckbox}>
                Геп. C
              </Checkbox>
              <Checkbox name="d4" value="d4" onChange={handleCheckbox}>
                Сифилис
              </Checkbox>
              <Checkbox name="d5" value="d5" onChange={handleCheckbox}>
                Гонорея
              </Checkbox>
              <Checkbox name="d6" value="d6" onChange={handleCheckbox}>
                Хламидиоз
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Наркотики">
            <Select
              placeholder="Используете"
              defaultValue=""
              optionFilterProp="children"
              onChange={(value) => handleChange({ drugs: value })}
              style={{ width: inputWidth }}
            >
              <Select.Option value="">Все варианты</Select.Option>
              <Select.Option value="1">Да</Select.Option>
              <Select.Option value="2">Нет</Select.Option>
              <Select.Option value="3">Не заполнено</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
