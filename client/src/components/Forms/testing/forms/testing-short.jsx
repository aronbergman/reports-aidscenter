import React from "react";
import { Checkbox, Form, Radio, Input } from "antd";

export const TestingShort = ({ createResetValue }) => {
  return (
    <>
      <div>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Поле является обязательным для сохранения",
            },
          ]}
          name="3_gender"
          label="Ваш пол?"
        >
          <Radio.Group>
            <Radio value="Мужчина">Мужчина</Radio>
            <Radio value="Женщина">Женщина</Radio>
          </Radio.Group>
        </Form.Item>
        {createResetValue("3_gender")}
      </div>

      <div>
        <Form.Item
          rules={[{ required: true, message: "Поле является обязательным" }]}
          name="4_age"
          label="Ваш возраст?"
        >
          <Radio.Group>
            <Radio value="18-19 лет">18-19 лет</Radio>
            <Radio value="20-29 лет">20-29 лет</Radio>
            <Radio value="30-39 лет">30-39 лет</Radio>
            <Radio value="40-49 лет">40-49 лет</Radio>
            <Radio value="50 и старше">50 и старше</Radio>
          </Radio.Group>
        </Form.Item>
        {createResetValue("4_age")}
      </div>

      <div>
        <Form.Item
          name="6_1_sexual_partners_from_6_months"
          label="Были ли у вас сексуальные партнеры за последние 6 месяцев (если да, укажите число)?"
        >
          <Input placeholder="Укажите число партнеров" />
        </Form.Item>
        <Form.Item name="6_2_sexual_partners_from_6_months" label="Нет">
          <Checkbox.Group>
            <Checkbox value="Нет" />
          </Checkbox.Group>
        </Form.Item>
        {createResetValue([
          "6_1_sexual_partners_from_6_months",
          "6_2_sexual_partners_from_6_months",
        ])}
      </div>

      <div>
        <Form.Item
          required
          name="8_sex_using_a_condom"
          label="Как часто вы занимались сексом в последние 6 месяцев, используя презерватив?"
        >
          <Radio.Group>
            <Radio value="Всегда / почти всегда">Всегда / почти всегда</Radio>
            <Radio value="В большинстве случаев">В большинстве случаев</Radio>
            <Radio value="Примерно в половине случаев">
              Примерно в половине случаев
            </Radio>
            <Radio value="В меньшинстве случаев">В меньшинстве случаев</Radio>
            <Radio value="Никогда">Никогда</Radio>
          </Radio.Group>
        </Form.Item>
        {createResetValue("8_sex_using_a_condom")}
      </div>

      <div>
        <Form.Item
          required
          name="11_condom_for_last_sex"
          label="Вы пользовались презервативом во время последнего секса?"
        >
          <Radio.Group>
            <Radio value="Да">Да</Radio>
            <Radio value="Нет">Нет</Radio>
          </Radio.Group>
        </Form.Item>
        {createResetValue("11_condom_for_last_sex")}
      </div>

      <div>
        <Form.Item
          name="12_using_condom"
          label="Используете ли вы презервативы при (возможны несколько вариантов):"
        >
          <Checkbox.Group>
            <Checkbox value="Вагинальном сексе">Вагинальном сексе</Checkbox>
            <Checkbox value="Оральном сексе">Оральном сексе</Checkbox>
            <Checkbox value="Анальном сексе">Анальном сексе</Checkbox>
            <Checkbox value="Не использую">Не использую</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        {createResetValue("12_using_condom")}
      </div>

      <div>
        <Form.Item
          name="13_1_no_using_condom"
          label="Почему Вы не использовали презерватив со своим последним сексуальным партнером(возможны несколько вариантов)?"
        >
          <Checkbox.Group>
            <Checkbox value="Я использовал его">Я использовал его</Checkbox>
            <Checkbox value="У меня его не было">У меня его не было</Checkbox>
            <Checkbox value="Они слишком дорогие">
              Они слишком дорого стоят
            </Checkbox>
            <Checkbox value="Партнер не хотел пользоваться презервативом">
              Партнер/ша не хотел/а пользоваться презервативом
            </Checkbox>
            <Checkbox value="Мы были готовы зачать ребенка">
              Мы были готовы зачать ребенка
            </Checkbox>
            <Checkbox value="Мне не нравится пользоваться презервативом">
              Мне не нравится пользоваться презервативом
            </Checkbox>
            <Checkbox value="Мне кажется, в этом не было необходимости">
              Мне кажется, в этом не было необходимости
            </Checkbox>
            <Checkbox value="Я доверяю своему партнеру">
              Я доверяю своему партнеру
            </Checkbox>
            <Checkbox value="Я просто не думал об этом">
              Я просто не думал об этом
            </Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item name="13_2_no_using_condom">
          <Input placeholder="Другое" />
        </Form.Item>
        {createResetValue(["13_1_no_using_condom", "13_2_no_using_condom"])}
      </div>

      <div>
        <Form.Item
          required
          name="14_now_there_is_a_condom"
          label="У Вас сейчас есть презерватив с собой?"
        >
          <Radio.Group>
            <Radio value="Да">Да</Radio>
            <Radio value="Нет">Нет</Radio>
          </Radio.Group>
        </Form.Item>
        {createResetValue("14_now_there_is_a_condom")}
      </div>

      <div>
        <Form.Item
          name="15_with_whom_sex"
          label="С кем у вас были сексуальные контакты последние 6 месяцев?"
        >
          <Checkbox.Group>
            <Checkbox value="Мужчины">Мужчины</Checkbox>
            <Checkbox value="Женщины">Женщины</Checkbox>
            <Checkbox value="Трансгендеры">Трансгендеры</Checkbox>
            <Checkbox value="Не было">Не было</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        {createResetValue("15_with_whom_sex")}
      </div>

      <div>
        <Form.Item
          name="16_1_used_drugs"
          label="Вы употребляли наркотики в последние 12 месяцев (если да, то какие)?"
        >
          <Checkbox.Group>
            <Checkbox value="Не употреблял">Не употреблял</Checkbox>
            <Checkbox value="Мефедрон">Мефедрон</Checkbox>
            <Checkbox value="Марихуана">Марихуана</Checkbox>
            <Checkbox value="Бутират">Бутират</Checkbox>
            <Checkbox value="Кокаин">Кокаин</Checkbox>
            <Checkbox value="Героин">Героин</Checkbox>
            <Checkbox value="МДМА (экстази)">МДМА (экстази)</Checkbox>
            <Checkbox value="Амфетамин">Амфетамин</Checkbox>
            <Checkbox value="Метамфетамин">Метамфетамин</Checkbox>
            <Checkbox value="LSD">LSD</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item name="16_2_used_drugs">
          <Input placeholder="Другое" />
        </Form.Item>
        {createResetValue(["16_1_used_drugs", "16_2_used_drugs"])}
      </div>

      <div>
        <Form.Item
          required
          name="17_drugs_for_sex"
          label="Используете ли вы наркотики для секса?"
        >
          <Radio.Group>
            <Radio value="Да">Да</Radio>
            <Radio value="Нет">Нет</Radio>
          </Radio.Group>
        </Form.Item>
        {createResetValue("17_drugs_for_sex")}
      </div>

      <div>
        <Form.Item
          required
          name="18_drugs_or_money_in_exchange_for_sex"
          label="Приходилось ли вам получать или давать деньги или наркотики в обмен на сексуальные услуги в последние 12 месяцев?"
        >
          <Radio.Group>
            <Radio value="Да, я давал">Да, я давал</Radio>
            <Radio value="Да, я получал">Да, я получал</Radio>
            <Radio value="И то и другое">И то и другое</Radio>
            <Radio value="Нет">Нет</Radio>
          </Radio.Group>
        </Form.Item>
        {createResetValue("18_drugs_or_money_in_exchange_for_sex")}
      </div>

      <div>
        <Form.Item
          required
          name="19_sexually_transmitted_diseases"
          label="За последние 12 месяцев у Вас были заболевания, передаваемые половым путем?"
        >
          <Radio.Group>
            <Radio value="Да">Да</Radio>
            <Radio value="Нет">Нет</Radio>
          </Radio.Group>
        </Form.Item>
        {createResetValue("19_sexually_transmitted_diseases")}
      </div>

      <div>
        <Form.Item
          required
          name="23_hiv_tested"
          label="Вы когда-нибудь проходили тестирование на ВИЧ?"
        >
          <Radio.Group>
            <Radio value="Да">Да</Radio>
            <Radio value="Нет">Нет</Radio>
          </Radio.Group>
        </Form.Item>
        {createResetValue("23_hiv_tested")}
      </div>

      <div>
        <Form.Item
          required
          name="24_how_often_hiv_tested"
          label="Как часто вы проходите тестирование на ВИЧ?"
        >
          <Radio.Group>
            <Radio value="Раз в 3 месяца">Раз в 3 месяца</Radio>
            <Radio value="Раз в 6 месяцев">Раз в 6 месяцев</Radio>
            <Radio value="Раз в 12 месяцев">Раз в 12 месяцев</Radio>
            <Radio value="Менее одного раза в 12 месяцев">
              Менее одного раза в 12 месяцев
            </Radio>
            <Radio value="Первый раз">Первый раз</Radio>
          </Radio.Group>
        </Form.Item>
        {createResetValue("24_how_often_hiv_tested")}
      </div>

      <div>
        <Form.Item
          required
          name="31_you_are_a_listen_PrEP"
          label="Вы уже слышали о доконтактной профилактике (PrEP) до этого?"
        >
          <Radio.Group>
            <Radio value="Да">Да</Radio>
            <Radio value="Нет">Нет</Radio>
          </Radio.Group>
        </Form.Item>
        {createResetValue("31_you_are_a_listen_PrEP")}
      </div>

      <div>
        <Form.Item
          required
          name="32_you_are_a_interest_PrEP"
          label="Вы были бы заинтересованы в использовании PrEP?"
        >
          <Radio.Group>
            <Radio value="Да, на ежедневной основе">
              Да, на ежедневной основе
            </Radio>
            <Radio value="Да, по требованию (например, только до и после секса без презерватива)">
              Да, по требованию (например, только до и после секса без
              презерватива)
            </Radio>
            <Radio value="Нет">Нет</Radio>
          </Radio.Group>
        </Form.Item>
        {createResetValue("32_you_are_a_interest_PrEP")}
      </div>

      <div>
        <Form.Item
          required
          name="33_you_are_a_used_PrEP"
          label="Вы когда-нибудь уже использовали доконтактную профилактику (PrEP)?"
        >
          <Radio.Group>
            <Radio value="Да, на ежедневной основе">
              Да, на ежедневной основе
            </Radio>
            <Radio value="Да, по требованию (например, только до и после секса без презерватива)">
              Да, по требованию (например, только до и после секса без
              презерватива)
            </Radio>
            <Radio value="Нет">Нет</Radio>
          </Radio.Group>
        </Form.Item>
        {createResetValue("33_you_are_a_used_PrEP")}
      </div>

      <div>
        <Form.Item name="36_hiv_test_result" label="Результат теста на ВИЧ:">
          <Radio.Group>
            <Radio value="Положительный">Положительный</Radio>
            <Radio value="Отрицательный">Отрицательный</Radio>
          </Radio.Group>
        </Form.Item>
        {createResetValue("36_hiv_test_result")}
      </div>

      <div>
        <Form.Item
          name="5_consulting_on_regular_testing_provided"
          label="Оказано консультирование по регулярному тестированию"
        >
          <Checkbox.Group>
            <Checkbox value="Да">Да</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        {createResetValue("39_consulting_on_regular_testing_provided")}
      </div>

      <div>
        <Form.Item
          name="6_prevention_counseling_provided"
          label="Оказано консультирование по профилактике"
        >
          <Checkbox.Group>
            <Checkbox value="Да">Да</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        {createResetValue("6_prevention_counseling_provided")}
      </div>

      <div>
        <Form.Item
          name="7_provided_counseling_on_receiving_treatment_for_hiv"
          label="Оказано консультирование по получению лечения для ВИЧ+"
        >
          <Checkbox.Group>
            <Checkbox value="Да">Да</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        {createResetValue(
          "7_provided_counseling_on_receiving_treatment_for_hiv"
        )}
      </div>
    </>
  );
};
