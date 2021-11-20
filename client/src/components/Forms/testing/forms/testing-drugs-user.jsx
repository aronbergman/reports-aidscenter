import { Checkbox, Form, Radio, Input } from "antd";
import React from "react"

export const TestingDrugsUser = ({ createResetValue }) => {

    return (
        <>
            <div>
                <Form.Item rules={[{ required: true, message: 'Поле является обязательным' }]}
                           name="4_age" label="Сколько Вам полных лет?">
                    <Radio.Group>
                        <Radio value="18-19 лет">18-19 лет</Radio>
                        <Radio value="20-29 лет">20-29 лет</Radio>
                        <Radio value="30-39 лет">30-39 лет</Radio>
                        <Radio value="40-49 лет">40-49 лет</Radio>
                        <Radio value="50 и старше">50 и старше</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('4_age')}
            </div>

            <div>
                <Form.Item rules={[{ required: true, message: 'Поле является обязательным для сохранения' }]}
                           name="3_gender" label="Ваш пол?">
                    <Radio.Group>
                        <Radio value="Мужчина">Мужчина</Radio>
                        <Radio value="Женщина">Женщина</Radio>
                        <Radio value="Другой">Другой</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('3_gender')}
            </div>

            <div>
                <Form.Item name="47_how_long_have_you_been_using_drugs" label="Как долго Вы употребляете наркотики?">
                    <Radio.Group>
                        <Radio value="Менее полугода">Менее полугода</Radio>
                        <Radio value="Менее года">Менее года</Radio>
                        <Radio value="От 1 года до 5 лет">От 1 года до 5 лет</Radio>
                        <Radio value="От 5 лет до 10">От 5 лет до 10</Radio>
                        <Radio value="Более 10 лет">Более 10 лет</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('47_how_long_have_you_been_using_drugs')}
            </div>

            <div>
                <Form.Item
                    label="Отметьте все способы употребления наркотиков, которые Вы когда-либо пробовали?"
                    name="48_ways_of_using_drugs"
                >
                    <Checkbox.Group>
                        <Checkbox value="Неинъекционно (курю, нюхаю и т.п.)">Неинъекционно (курю, нюхаю и
                            т.п.)</Checkbox>
                        <Checkbox value="Инъекционно">Инъекционно</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                {createResetValue('48_ways_of_using_drugs')}
            </div>

            <div>
                <Form.Item
                    label="Употребляли ли вы наркотики за последние 12 месяцев?"
                    name="62_have_you_used_drugs_in_past_12_m"
                >
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('62_have_you_used_drugs_in_past_12_m')}
            </div>

            <div>
                <Form.Item name="49_1_what_drugs_did_you_use_non_injection"
                           label="Какие наркотики Вы употребляли неинъекционно за последние 12 месяцев?">
                    <Checkbox.Group>
                        <Checkbox value="Героин">Героин</Checkbox>
                        <Checkbox value="Марихуана">Марихуана</Checkbox>
                        <Checkbox value="МДМА (экстази)">МДМА (экстази)</Checkbox>
                        <Checkbox value="Мефедрон">Мефедрон</Checkbox>
                        <Checkbox value="Скорости (амфетамин, метамфетамин)">Скорости (амфетамин,
                            метамфетамин)</Checkbox>
                        <Checkbox value="Соли">Соли</Checkbox>
                        <Checkbox value="Спайс">Спайс</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item name="49_2_what_drugs_did_you_use_non_injection">
                    <Input placeholder="Другие (напишите, какие)"/>
                </Form.Item>
                {createResetValue(['49_1_what_drugs_did_you_use_non_injection', '49_2_what_drugs_did_you_use_non_injection'])}
            </div>

            <div>
                <Form.Item name="50_1_what_drugs_did_you_use_injection"
                           label="Какие наркотики Вы употребляли инъекционно за последние 12 месяцев?">
                    <Checkbox.Group>
                        <Checkbox value="Амфетамин, метамфитамин, фенамин (скорость)">Амфетамин, метамфитамин, фенамин
                            (скорость)</Checkbox>
                        <Checkbox value="Героин">Героин</Checkbox>
                        <Checkbox value="Метадон">Метадон</Checkbox>
                        <Checkbox value="Мефедрон">Мефедрон</Checkbox>
                        <Checkbox value="Соли">Соли</Checkbox>
                        <Checkbox value="Тропикамид">Тропикамид</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item name="50_2_what_drugs_did_you_use_injection">
                    <Input placeholder="Другие (напишите, какие)"/>
                </Form.Item>
                {createResetValue(['50_1_what_drugs_did_you_use_injection', '50_2_what_drugs_did_you_use_injection'])}
            </div>

            <div>
                <Form.Item name="51_shared_the_same_syringe_with_other_people"
                           label="Как часто за последние 12 месяцев Вы пользовались вместе с другими людьми одними и теми же шприцем, иглой, или емкостью для приготовления раствора?">
                    <Radio.Group>
                        <Radio value="Всегда / практически всегда">Всегда / практически всегда</Radio>
                        <Radio value="В большинстве случаев">В большинстве случаев</Radio>
                        <Radio value="Примерно в половине случаев">Примерно в половине случаев</Radio>
                        <Radio value="В меньшинстве случаев">В меньшинстве случаев</Radio>
                        <Radio value="Никогда">Никогда </Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('51_shared_the_same_syringe_with_other_people')}
            </div>

            <div>
                <Form.Item name="52_who_did_they_share_the_syringe_with"
                           label="Вместе с кем Вы последний раз пользовались одними и теми же шприцом, иглой или емкостью для приготовления раствора, вводя себе наркотик?">
                    <Checkbox.Group>
                        <Checkbox value="Муж / жена">Муж / жена</Checkbox>
                        <Checkbox value="Другие родственники">Другие родственники</Checkbox>
                        <Checkbox value="Сексуальный партнер / партнерша">Сексуальный партнер / партнерша</Checkbox>
                        <Checkbox value="Друзья / постоянная компания">Друзья / постоянная компания</Checkbox>
                        <Checkbox value="Дальние знакомые / знакомые знакомых">Дальние знакомые / знакомые
                            знакомых</Checkbox>
                        <Checkbox value="Незнакомые люди / случайная компания">Незнакомые люди / случайная
                            компания</Checkbox>
                        <Checkbox value="Трудно сказать / Не помню">Трудно сказать / Не помню</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                {createResetValue('52_who_did_they_share_the_syringe_with')}
            </div>

            <div>
                <Form.Item name="53_1_why_do_you_use_the_same_syringe"
                           label="Почему Вы пользуетесь одними и теми же шприцом, иглой, емкостью для приготовления раствора вместе с другими людьми?">
                    <Checkbox.Group>
                        <Checkbox value="Слишком дорого покупать новые шприцы и иглы">Слишком дорого покупать новые
                            шприцы и иглы</Checkbox>
                        <Checkbox value="Трудно найти новые шприцы и иглы, когда они необходимы">Трудно найти новые
                            шприцы и иглы, когда они необходимы</Checkbox>
                        <Checkbox value="Отказались продать шприц(ы) и/или иглы в аптеке">Отказались продать шприц(ы)
                            и/или иглы в аптеке</Checkbox>
                        <Checkbox value="Не думал об этом">Не думал об этом</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item name="53_2_why_do_you_use_the_same_syringe">
                    <Input placeholder="Другие причины (напишите)"/>
                </Form.Item>
                {createResetValue(['53_1_why_do_you_use_the_same_syringe', '53_2_why_do_you_use_the_same_syringe'])}
            </div>

            <div>
                <Form.Item name="54_you_usually_disinfect_the_container"
                           label="Вы обычно дезинфицируете емкость для приготовления раствора и шприцы?">
                    <Radio.Group>
                        <Radio value="Да, шприцы">Да, шприцы </Radio>
                        <Radio value="Да, емкость">Да, емкость </Radio>
                        <Radio value="Да, и то, и то">Да, и то, и то</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('54_you_usually_disinfect_the_container')}
            </div>

            <div>
                <Form.Item name="55_1_how_do_you_usually_disinfect_syringes_and_needles"
                           label="Как Вы обычно дезинфицируете шприцы и иглы, которые до Вас использовали другие люди?">
                    <Checkbox.Group>
                        <Checkbox value="Промываю холодной водой">Промываю холодной водой</Checkbox>
                        <Checkbox value="Промываю горячей водой">Промываю горячей водой</Checkbox>
                        <Checkbox value="Кипячу">Кипячу</Checkbox>
                        <Checkbox value="Дезинфицирую с помощью хлора">Дезинфицирую с помощью хлора</Checkbox>
                        <Checkbox value="Обрабатываю спиртом">Обрабатываю спиртом</Checkbox>
                        <Checkbox value="Не дезинфицирую">Не дезинфицирую</Checkbox>
                        <Checkbox value="Их стерилизую не я">Их стерилизую не я</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item name="55_2_how_do_you_usually_disinfect_syringes_and_needles">
                    <Input placeholder="Другое (напишите)"/>
                </Form.Item>
                {createResetValue(['55_1_how_do_you_usually_disinfect_syringes_and_needles', '55_2_how_do_you_usually_disinfect_syringes_and_needles'])}
            </div>

            <div>
                <Form.Item name="56_where_do_you_usually_get_syringes"
                           label="Как и где Вы обычно приобретаете новые / неиспользованные иглы, шприцы?">
                    <Checkbox.Group>
                        <Checkbox value="Покупаю в аптеке">Покупаю в аптеке</Checkbox>
                        <Checkbox value="Беру у друзей/знакомых">Беру у друзей/знакомых</Checkbox>
                        <Checkbox value="Получаю бесплатно (благотворительная помощь)">Получаю бесплатно
                            (благотворительная помощь)</Checkbox>
                    </Checkbox.Group>
                </Form.Item>

                {createResetValue('56_where_do_you_usually_get_syringes')}
            </div>

            <div>
                <Form.Item name="57_1_undergo_treatment_in_a_narcological_hospital"
                           label="Приходилось ли Вам за последние 12 месяцев проходить лечение в наркологической больнице или диспансере?">
                    <Input placeholder="ОТМЕТЬТЕ, СКОЛЬКО РАЗ"/>
                </Form.Item>
                <Form.Item name="57_2_undergo_treatment_in_a_narcological_hospital" label="Нет">
                    <Checkbox.Group>
                        <Checkbox value="Нет"/>
                    </Checkbox.Group>
                </Form.Item>
                {createResetValue(['57_1_undergo_treatment_in_a_narcological_hospital', '57_2_undergo_treatment_in_a_narcological_hospital'])}
            </div>

            <div>
                <Form.Item name="58_1_how_many_sexual_partners"
                           label=" Сколько сексуальных партнеров у Вас было за последние 12 месяцев?">
                    <Input placeholder="отметьте, сколько партнеров"/>
                </Form.Item>
                <Form.Item name="58_2_how_many_sexual_partners" label="Не было">
                    <Checkbox.Group>
                        <Checkbox value="Не было"/>
                    </Checkbox.Group>
                </Form.Item>
                {createResetValue(['58_1_how_many_sexual_partners', '58_2_how_many_sexual_partners'])}
            </div>

            <div>
                <Form.Item required name="18_drugs_or_money_in_exchange_for_sex"
                           label="Приходилось ли Вам за последние 12 месяцев получать/давать деньги или наркотики в обмен на сексуальные услуги?">
                    <Radio.Group>
                        <Radio value="Да, я давал">Да, я давал</Radio>
                        <Radio value="Да, я получал">Да, я получал</Radio>
                        <Radio value="И то и другое">И то и другое</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('18_drugs_or_money_in_exchange_for_sex')}
            </div>

            <div>
                <Form.Item required name="59_have_had_sex_in_the_past_12_months_using_a_condom"
                           label="Как часто вы занимались сексом в последние 12 месяцев, используя презерватив?">
                    <Radio.Group>
                        <Radio value="Всегда / почти всегда">Всегда / почти всегда</Radio>
                        <Radio value="В большинстве случаев">В большинстве случаев</Radio>
                        <Radio value="Примерно в половине случаев">Примерно в половине случаев</Radio>
                        <Radio value="В меньшинстве случаев">В меньшинстве случаев</Radio>
                        <Radio value="Никогда">Никогда</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('59_have_had_sex_in_the_past_12_months_using_a_condom')}
            </div>

            <div>
                <Form.Item name="13_1_no_using_condom"
                           label="Почему Вы не использовали презерватив со своим последним сексуальным партнером(возможны несколько вариантов)?">
                    <Checkbox.Group>
                        <Checkbox value="Я использовал его">Я использовал его</Checkbox>
                        <Checkbox value="У меня его не было">У меня его не было</Checkbox>
                        <Checkbox value="Они слишком дорогие">Они слишком дорого стоят</Checkbox>
                        <Checkbox value="Партнер не хотел пользоваться презервативом">Партнер/ша не хотел/а пользоваться
                            презервативом</Checkbox>
                        <Checkbox value="Мы были готовы зачать ребенка">Мы были готовы зачать ребенка</Checkbox>
                        <Checkbox value="Мне не нравится пользоваться презервативом">Мне не нравится пользоваться
                            презервативом</Checkbox>
                        <Checkbox value="Мне кажется, в этом не было необходимости">Мне кажется, в этом не было
                            необходимости</Checkbox>
                        <Checkbox value="Я доверяю своему партнеру">Я доверяю своему партнеру</Checkbox>
                        <Checkbox value="Я просто не думал об этом">Я просто не думал об этом</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item name="13_2_no_using_condom">
                    <Input placeholder="Другое"/>
                </Form.Item>
                {createResetValue(['13_1_no_using_condom', '13_2_no_using_condom'])}
            </div>

            <div>
                <Form.Item required name="20_med_sexually_transmitted_diseases"
                           label="Приходилось ли Вам за последние 12 месяцев болеть заболеваниями, передающимися половым путем? Обращались ли вы к врачу?">
                    <Radio.Group>
                        <Radio value="Да, обращался к врачу">Да, обращался к врачу</Radio>
                        <Radio value="Да, не обращался к врачу">Да, не обращался к врачу</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('20_med_sexually_transmitted_diseases')}
            </div>

            <div>
                <Form.Item name="21_1_diagnosed_gepatit"
                           label="Имеете ли Вы хронические формы гепатитов?">
                    <Checkbox.Group>
                        <Checkbox value="Да, проходил лечение">Да, проходил лечение</Checkbox>
                        <Checkbox value="Да, не проходил лечение">Да, не проходил лечение</Checkbox>
                        <Checkbox value="Нет">Нет</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item name="21_2_diagnosed_gepatit">
                    <Input placeholder="НАПИШИТЕ ФОРМЫ: А, В, С, D, E"/>
                </Form.Item>
                {createResetValue(['21_1_diagnosed_gepatit', '21_2_diagnosed_gepatit'])}
            </div>

            <div>
                <Form.Item name="60_diagnosed_with_tuberculosis"
                           label="Вам когда-либо ставили диагноз «туберкулез»?">
                    <Checkbox.Group>
                        <Checkbox value="Да">Да</Checkbox>
                        <Checkbox value="Нет">Нет</Checkbox>
                        <Checkbox value="Не знаю про это заболевание">Не знаю про это заболевание</Checkbox>
                    </Checkbox.Group>
                </Form.Item>

                {createResetValue('60_diagnosed_with_tuberculosis')}
            </div>

            <div>
                <Form.Item required name="23_hiv_tested"
                           label="Вы когда-нибудь проходили тестирование на ВИЧ?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('23_hiv_tested')}
            </div>

            <div>
                <Form.Item required name="61_hiv_tested_12_m"
                           label="Проходили ли Вы тестирование на ВИЧ за последние 12 месяцев?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('61_hiv_tested_12_m')}
            </div>

            <div>
                <Form.Item required name="25_do_you_know_your_hiv_status"
                           label="Какой у Вас ВИЧ-статус?">
                    <Radio.Group>
                        <Radio value="Я - ВИЧ-положительный(-ая), не на терапии">Я - ВИЧ-положительный(-ая), не на
                            терапии</Radio>
                        <Radio value="Я - ВИЧ-положительный(-ая), на терапии">Я - ВИЧ-положительный(-ая), на
                            терапии</Radio>
                        <Radio value="Я ВИЧ-отрицательный">Я - ВИЧ-отрицательный(-ая)</Radio>
                        <Radio value="Я не знаю свой ВИЧ-статус">Мне не известен мой ВИЧ-статус</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('25_do_you_know_your_hiv_status')}
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
                <Form.Item required name="37_hepatitis_test_result"
                           label={`Результат теста на Гепатит С:`}>
                    <Radio.Group>
                        <Radio value="Положительный">Положительный</Radio>
                        <Radio value="Отрицательный">Отрицательный</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('37_hepatitis_test_result')}
            </div>

        </>
    )
}