import React from "react"
import { Checkbox, Form, Input, Radio } from "antd";

export const TestingMsm = ({
                               optionsWithDisabled,
                               createResetValue,
                               prep,
                           }) => {

    return (
        <>
            <div>
                <Form.Item name="2_1_how_did_you_know" label="Откуда вы узнали о тестировании?">
                    <Checkbox.Group>
                        {optionsWithDisabled.map(option => <Checkbox
                            value={option.value}>{option.label}</Checkbox>)}
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item name="2_2_how_did_you_know">
                    <Input placeholder="Другое"/>
                </Form.Item>
                {createResetValue(['2_1_how_did_you_know', '2_2_how_did_you_know'])}
            </div>

            <div>
                <Form.Item rules={[{ required: true, message: 'Поле является обязательным для сохранения' }]}
                           name="3_gender" label="Ваш пол?">
                    <Radio.Group>
                        <Radio value="Мужчина">Мужчина</Radio>
                        <Radio value="Трансгендерная женщина">Трансгендерная женщина</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('3_gender')}
            </div>

            <div>
                <Form.Item rules={[{ required: true, message: 'Поле является обязательным' }]}
                           name="4_age" label="Ваш возраст?">
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
                <Form.Item name="5_1_first_sex" label="В каком возрасте у вас был первый сексуальный контакт?">
                    <Input placeholder="Возраст"/>
                </Form.Item>
                <Form.Item name="5_2_first_sex" label="Не было">
                    <Checkbox.Group>
                        <Checkbox value="Не было"/>
                    </Checkbox.Group>
                </Form.Item>
                {createResetValue(['5_1_first_sex', '5_2_first_sex'])}
            </div>

            <div>
                <Form.Item name="6_1_sexual_partners_from_6_months"
                           label="Были ли у вас сексуальные партнеры за последние 6 месяцев (если да, укажите число)?">
                    <Input placeholder="Укажите число партнеров"/>
                </Form.Item>
                <Form.Item name="6_2_sexual_partners_from_6_months" label="Нет">
                    <Checkbox.Group>
                        <Checkbox value="Нет"/>
                    </Checkbox.Group>
                </Form.Item>
                {createResetValue(['6_1_sexual_partners_from_6_months', '6_2_sexual_partners_from_6_months'])}
            </div>

            <div>
                <Form.Item required name="7_constant_sexual_partner"
                           label="Есть ли у вас постоянный сексуальный партнер?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('7_constant_sexual_partner')}
            </div>

            <div>
                <Form.Item required name="8_sex_using_a_condom"
                           label="Как часто вы занимались сексом в последние 6 месяцев, используя презерватив?">
                    <Radio.Group>
                        <Radio value="Всегда / почти всегда">Всегда / почти всегда</Radio>
                        <Radio value="В большинстве случаев">В большинстве случаев</Radio>
                        <Radio value="Примерно в половине случаев">Примерно в половине случаев</Radio>
                        <Radio value="В меньшинстве случаев">В меньшинстве случаев</Radio>
                        <Radio value="Никогда">Никогда</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('8_sex_using_a_condom')}
            </div>

            <div>
                <Form.Item name="9_condom_for_sex_with_a_permanent"
                           label="Используете ли вы презерватив при сексе с постоянным партнером?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('9_condom_for_sex_with_a_permanent')}
            </div>

            <div>
                <Form.Item name="10_condom_for_sex_with_a_club"
                           label="Используете ли вы презерватив при сексе со случайными партнерами?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('10_condom_for_sex_with_a_club')}
            </div>

            <div>
                <Form.Item required name="11_condom_for_last_sex"
                           label="Вы пользовались презервативом во время последнего секса?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('11_condom_for_last_sex')}
            </div>

            <div>
                <Form.Item name="12_using_condom"
                           label="Используете ли вы презервативы при (возможны несколько вариантов):">
                    <Checkbox.Group>
                        <Checkbox value="Вагинальном сексе">Вагинальном сексе</Checkbox>
                        <Checkbox value="Оральном сексе">Оральном сексе</Checkbox>
                        <Checkbox value="Анальном сексе">Анальном сексе</Checkbox>
                        <Checkbox value="Не использую">Не использую</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                {createResetValue('12_using_condom')}
            </div>

            <div>
                <Form.Item name="13_1_no_using_condom"
                           label="Почему Вы не использовали презерватив со своим последним сексуальным партнером(возможны несколько вариантов)?">
                    <Checkbox.Group>
                        <Checkbox value="Я использовал его">Я использовал его</Checkbox>
                        <Checkbox value="У меня его не было">У меня его не было</Checkbox>
                        <Checkbox value="Я был в алкогольном/наркотическом опьянении">Я был в
                            алкогольном/наркотическом
                            опьянении</Checkbox>
                        <Checkbox value="Они слишком дорогие">Они слишком дорогие</Checkbox>
                        <Checkbox value="Партнер не хотел пользоваться презервативом">Партнер не хотел пользоваться
                            презервативом</Checkbox>
                        <Checkbox value="Мы были готовы зачать ребенка">Мы были готовы зачать ребенка</Checkbox>
                        <Checkbox value="Я не люблю пользоваться презервативами">Я не люблю пользоваться
                            презервативами</Checkbox>
                        <Checkbox value="Мне кажется, в этом не было необходимости">Мне кажется, в этом не было
                            необходимости</Checkbox>
                        <Checkbox value="Я доверяю своему партнеру">Я доверяю своему партнеру</Checkbox>
                        <Checkbox value="Я просто не думал об этом">Я просто не думал об этом</Checkbox>
                        <Checkbox value="Я использую PrEP">Я использую PrEP</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item name="13_2_no_using_condom">
                    <Input placeholder="Другое"/>
                </Form.Item>
                {createResetValue(['13_1_no_using_condom', '13_2_no_using_condom'])}
            </div>

            <div>
                <Form.Item required name="14_now_there_is_a_condom"
                           label="У Вас сейчас есть презерватив с собой?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('14_now_there_is_a_condom')}
            </div>

            <div>
                <Form.Item name="15_with_whom_sex" label="С кем у вас были сексуальные контакты последние 6 месяцев?">
                    <Checkbox.Group>
                        <Checkbox value="Мужчины">Мужчины</Checkbox>
                        <Checkbox value="Женщины">Женщины</Checkbox>
                        <Checkbox value="Трансгендеры">Трансгендеры</Checkbox>
                        <Checkbox value="Не было">Не было</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                {createResetValue('15_with_whom_sex')}
            </div>

            <div>
                <Form.Item name="16_1_used_drugs"
                           label="Вы употребляли наркотики в последние 12 месяцев (если да, то какие)?">
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
                    <Input placeholder="Другое"/>
                </Form.Item>
                {createResetValue(['16_1_used_drugs', '16_2_used_drugs'])}
            </div>

            <div>
                <Form.Item required name="17_drugs_for_sex"
                           label="Используете ли вы наркотики для секса?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('17_drugs_for_sex')}
            </div>

            <div>
                <Form.Item required name="18_drugs_or_money_in_exchange_for_sex"
                           label="Приходилось ли вам получать или давать деньги или наркотики в обмен на сексуальные услуги в последние 12 месяцев?">
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
                <Form.Item required name="19_sexually_transmitted_diseases"
                           label="За последние 12 месяцев у Вас были заболевания, передаваемые половым путем?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('19_sexually_transmitted_diseases')}
            </div>

            <div>
                <Form.Item required name="20_med_sexually_transmitted_diseases"
                           label="Обращались ли вы за медицинской консультацией по поводу ИППП в последние 12 месяцев?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('20_med_sexually_transmitted_diseases')}
            </div>

            <div>
                <Form.Item name="21_1_diagnosed_gepatit"
                           label="Диагностировали у вас есть хронические формы гепатита? (если да, укажите форму: A, B, C, D, E)">
                    <Checkbox.Group>
                        <Checkbox value="Нет">Нет</Checkbox>
                        <Checkbox value="Я не знаю об этой болезни">Я не знаю об этой болезни</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item name="21_2_diagnosed_gepatit">
                    <Input placeholder="Другое"/>
                </Form.Item>
                {createResetValue(['21_1_diagnosed_gepatit', '21_2_diagnosed_gepatit'])}
            </div>

            <div>
                <Form.Item required name="22_diagnosed_with_syphilis"
                           label="Был ли у вас ранее диагностирован сифилис?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('22_diagnosed_with_syphilis')}
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
                <Form.Item required name="24_how_often_hiv_tested"
                           label="Как часто вы проходите тестирование на ВИЧ?">
                    <Radio.Group>
                        <Radio value="Раз в 3 месяца">Раз в 3 месяца</Radio>
                        <Radio value="Раз в 6 месяцев">Раз в 6 месяцев</Radio>
                        <Radio value="Раз в 12 месяцев">Раз в 12 месяцев</Radio>
                        <Radio value="Менее одного раза в 12 месяцев">Менее одного раза в 12 месяцев</Radio>
                        <Radio value="Первый раз">Первый раз</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('24_how_often_hiv_tested')}
            </div>

            <div>
                <Form.Item required name="25_do_you_know_your_hiv_status"
                           label="Знаете ли вы свой ВИЧ-статус?">
                    <Radio.Group>
                        <Radio value="Я ВИЧ-положительный">Я ВИЧ-положительный</Radio>
                        <Radio value="Я ВИЧ-отрицательный">Я ВИЧ-отрицательный</Radio>
                        <Radio value="Я не знаю свой ВИЧ-статус">Я не знаю свой ВИЧ-статус</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('25_do_you_know_your_hiv_status')}
            </div>

            <div>
                <Form.Item required name="26_you_are_a_citizen_of_russia"
                           label="Вы гражданин России?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('26_you_are_a_citizen_of_russia')}
            </div>

            <div>
                <Form.Item name="27_1_registration_on_the_territory"
                           label="У вас есть регистрация на территории региона проживания?">
                    <Radio.Group>
                        <Radio value="Постоянная регистрация">Постоянная регистрация</Radio>
                        <Radio value="Временная регистрация">Временная регистрация</Radio>
                        <Radio value="Нет регистрации">Нет регистрации</Radio>
                    </Radio.Group>
                </Form.Item>
                {/*<Form.Item name="27_2_registration_on_the_territory">*/}
                {/*    <Input placeholder="Другое"/>*/}
                {/*</Form.Item>*/}
                {/*{createResetValue(['27_1_registration_on_the_territory', '27_2_registration_on_the_territory'])}*/}
                {createResetValue(['27_1_registration_on_the_territory'])}
            </div>

            <div>
                <Form.Item required name="28_you_education"
                           label="Ваше образование?">
                    <Radio.Group>
                        <Radio value="Не получил базового среднего образования (не закончил 8-9 классы школы)">Не
                            получил базового
                            среднего образования (не закончил 8-9 классы школы)</Radio>
                        <Radio
                            value="Неполное среднее (закончил 8-9 классы школы или ПТУ / колледжа на базе 8-9 классов)">Неполное
                            среднее (закончил 8-9 классы школы или ПТУ / колледжа на базе 8-9 классов)</Radio>
                        <Radio
                            value="Общее среднее (закончил 10-11 классы школы или ПТУ / колледжа на базе 10-11 классов)">Общее
                            среднее (закончил 10-11 классы школы или ПТУ / колледжа на базе 10-11 классов)</Radio>
                        <Radio
                            value="Среднее специальное (окончил техникум / колледж / колледж со средним специальным образованием)">Среднее
                            специальное (окончил техникум / колледж / колледж со средним специальным
                            образованием)</Radio>
                        <Radio value="Неполное высшее образование (закончил 2-4 года университета)">Неполное высшее
                            образование
                            (закончил 2-4 года университета)</Radio>
                        <Radio value="Высшее (получил диплом университета)">Высшее (получил диплом
                            университета)</Radio>
                        <Radio value="Академическая степень (кандидат наук, доктор наук)">Академическая степень
                            (кандидат наук,
                            доктор наук)</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('28_you_education')}
            </div>

            <div>
                <Form.Item required name="29_the_nature_of_your_work"
                           label="Какое из следующих определений лучше всего описывает характер вашей работы на данный момент?">
                    <Radio.Group>
                        <Radio value="Полная занятость">Полная занятость</Radio>
                        <Radio value="Частичная/неполная занятость">Частичная/неполная занятость</Radio>
                        <Radio
                            value="Полная занятость в собственном бизнесе или в приносящей доход индивидуальной деятельности">Полная
                            занятость в собственном бизнесе или в приносящей доход индивидуальной
                            деятельности</Radio>
                        <Radio
                            value="Случайный заработок, неполная занятость в собственном бизнесе или в приносящей доход индивидуальной деятельности">Случайный
                            заработок, неполная занятость в собственном бизнесе или в приносящей доход
                            индивидуальной
                            деятельности</Radio>
                        <Radio value="Безработный (ищу работу)">Безработный (ищу работу)</Radio>
                        <Radio value="Я не работаю и не ищу работу">Я не работаю и не ищу работу</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('29_the_nature_of_your_work')}
            </div>

            <div>
                <Form.Item required name="30_marital_status"
                           label="Ваше семейное положение?">
                    <Radio.Group>
                        <Radio value="Никогда не был женат">Никогда не был женат</Radio>
                        <Radio value="Я живу вместе с партнером, но отношения не зарегистрированы">Я живу вместе с
                            партнером, но
                            отношения не зарегистрированы</Radio>
                        <Radio value="Женат/замужем">Женат/замужем</Radio>
                        <Radio value="Женат/замужем, живу отдельно от партнера">Женат/замужем, живу отдельно от
                            партнера</Radio>
                        <Radio value="В разводе живу отдельно от партнера">В разводе живу отдельно от
                            партнера</Radio>
                        <Radio value="В разводе, но живу с партнером">В разводе, но живу с партнером</Radio>
                        <Radio value="Вдовец/вдова">Вдовец/вдова</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('30_marital_status')}
            </div>

            <div>
                <Form.Item required name="31_you_are_a_listen_PrEP"
                           label="Вы уже слышали о доконтактной профилактике (PrEP) до этого?">
                    <Radio.Group>
                        <Radio value="Да">Да</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('31_you_are_a_listen_PrEP')}
            </div>

            <div>
                <Form.Item required name="32_you_are_a_interest_PrEP"
                           label="Вы были бы заинтересованы в использовании PrEP?">
                    <Radio.Group>
                        <Radio value="Да, на ежедневной основе">Да, на ежедневной основе</Radio>
                        <Radio value="Да, по требованию (например, только до и после секса без презерватива)">Да, по
                            требованию
                            (например, только до и после секса без презерватива)</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('32_you_are_a_interest_PrEP')}
            </div>

            <div>
                <Form.Item required name="33_you_are_a_used_PrEP"
                           label="Вы когда-нибудь уже использовали доконтактную профилактику (PrEP)?">
                    <Radio.Group>
                        <Radio value="Да, на ежедневной основе">Да, на ежедневной основе</Radio>
                        <Radio value="Да, по требованию (например, только до и после секса без презерватива)">Да, по
                            требованию
                            (например, только до и после секса без презерватива)</Radio>
                        <Radio value="Нет">Нет</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('33_you_are_a_used_PrEP')}
            </div>

            {prep && <div>
                <Form.Item name="34_1_for_prep_you_use"
                           label="Для PrEP вы используете:">
                    <Radio.Group>
                        <Radio value="Truvada">Truvada</Radio>
                        <Radio value="Дженерики Truvada">Дженерики Truvada</Radio>
                        <Radio value="Двухкомпонентную схему (тенофавир и ламивудин/эмтрицитабин)">Двухкомпонентную
                            схему
                            (тенофавир и ламивудин/эмтрицитабин)</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="34_2_for_prep_you_use">
                    <Input placeholder="Другое"/>
                </Form.Item>
                {createResetValue(['34_1_for_prep_you_use', '34_2_for_prep_you_use'])}
            </div>}


            {prep && <div>
                <Form.Item required name="35_you_have_started_taking_prep"
                           label="Вы начали прием PrEP:">
                    <Radio.Group>
                        <Radio value="После прохождения теста на ВИЧ и консультации с врачом">После
                            прохождения
                            теста на
                            ВИЧ и
                            консультации с врачом</Radio>
                        <Radio value="После теста на ВИЧ">После теста на ВИЧ</Radio>
                        <Radio value="Без каких-либо тестов и консультаций">Без каких-либо тестов и
                            консультаций</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('35_you_have_started_taking_prep')}
            </div>}

            <div>
                <Form.Item
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
                <Form.Item  name="37_hepatitis_test_result"
                           label={`Результат теста на Гепатит С:`}>
                    <Radio.Group>
                        <Radio value="Положительный">Положительный</Radio>
                        <Radio value="Отрицательный">Отрицательный</Radio>
                    </Radio.Group>
                </Form.Item>
                {createResetValue('37_hepatitis_test_result')}
            </div>

            <div>
                <Form.Item  name="38_syphilis_test_result"
                           label={`Результат теста на Сифилис:`}>
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