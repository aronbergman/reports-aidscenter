import React from "react"
import { Checkbox, Form, Radio } from "antd";

export const TestingGeneral = ({ createResetValue }) => {

    return (
        <>
            <div>
                <Form.Item rules={[{ required: true, message: 'Поле является обязательным для сохранения' }]}
                           name="3_gender" label="Ваш пол?">
                    <Radio.Group>
                        <Radio value="Мужчина">Мужчина</Radio>
                        <Radio value="Женщина">Женщина</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('3_gender')}
            </div>

            <div>
                <Form.Item rules={[{
                    required: true,
                    message: 'Поле является обязательным',
                }]}
                           name="36_hiv_test_result"
                           label="Результат теста на ВИЧ:">
                    <Radio.Group>
                        <Radio value="Положительный">Положительный</Radio>
                        <Radio value="Отрицательный">Отрицательный</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('36_hiv_test_result')}
            </div>


            <div>
                <Form.Item name="37_hepatitis_test_result"
                           label={`Результат теста на Гепатит С: (если проводился)`}>
                    <Radio.Group>
                        <Radio value="Положительный">Положительный</Radio>
                        <Radio value="Отрицательный">Отрицательный</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('37_hepatitis_test_result')}
            </div>

            <div>
                <Form.Item name="38_syphilis_test_result"
                           label={`Результат теста на Сифилис: (если проводился)`}>
                    <Radio.Group>
                        <Radio value="Положительный">Положительный</Radio>
                        <Radio value="Отрицательный">Отрицательный</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('38_syphilis_test_result')}
            </div>

            <div>
                <Form.Item name="39_consulting_on_regular_testing_provided"
                           label="Оказано консультирование по регулярному тестированию">
                    <Checkbox.Group>
                        <Checkbox value="Да">Да</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                {createResetValue('39_consulting_on_regular_testing_provided')}
            </div>

            <div>
                <Form.Item name="40_prevention_counseling_provided"
                           label="Оказано консультирование по профилактике">
                    <Checkbox.Group>
                        <Checkbox value="Да">Да</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                {createResetValue('40_prevention_counseling_provided')}
            </div>

            <div>
                <Form.Item name="41_provided_counseling_on_receiving_treatment_for_hiv"
                           label="Оказано консультирование по получению лечения для ВИЧ+">
                    <Checkbox.Group>
                        <Checkbox value="Да">Да</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                {createResetValue('41_provided_counseling_on_receiving_treatment_for_hiv')}
            </div>

        </>
    )
}