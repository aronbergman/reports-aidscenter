import React, { useState, useEffect } from "react";
import { Form, Input, Button, Radio, Checkbox, Card, Typography } from "antd";
import { postPatientVisit } from "../redux/thunks/patient_visits.thunk";
import { useNotification } from "../hooks";
import { DatePicker } from "antd";
import { Select } from "antd";
import moment from "moment";

// ToDo вынести это в БД
const questionsOptions = [
  {
    name: "Откуда вы узнали о проекте по ДКП?",
    multiple: true,
    other: true,
    answers: [
      "Знакомые",
      "Поисковые системы",
      "Телеграм",
      "Тестировался здесь ранее",
      "Соцсети/сайт фонда",
      "Хорнет",
      "Аутрич в клубах",
      "Экраны в клубах",
      "Контекстная реклама",
      "в Гугле",
      "Видео-реклама в Инстаграм",
    ],
  },
  {
    name: "Ваш пол?",
    multiple: false,
    answers: ["Мужчина", "Трансгендерный мужчина", "Трансгендерная женщина"],
  },
  {
    name: "Ваш возраст?",
    multiple: false,
    answers: [
      "18-19 лет",
      "20-29 лет",
      "30-39 лет",
      "40-49 лет",
      "50 и старше",
    ],
  },
  {
    name: "Есть ли у вас постоянный/ постоянные сексуальный партнер?",
    multiple: false,
    answers: ["Да", "Нет"],
  },
  {
    name: "Как часто вы занимались сексом в последние 6 месяцев, используя презерватив?",
    multiple: false,
    answers: [
      "Всегда / почти всегда",
      "В большинстве случаев",
      "Примерно в половине случаев",
      "В меньшинстве случаев",
      "Никогда",
    ],
  },
  {
    name: "Используете ли вы презерватив при сексе с постоянным партнером?",
    multiple: false,
    answers: ["Да", "Нет"],
  },
  {
    name: "Используете ли вы презерватив при сексе со случайными партнерами?",
    multiple: false,
    answers: ["Да", "Нет"],
  },
  {
    name: "Вы пользовались презервативом во время последнего секса?",
    multiple: false,
    answers: ["Да", "Нет"],
  },
  {
    name: "Используете ли вы презервативы при (возможны несколько вариантов)",
    multiple: true,
    answers: [
      "Вагинальном сексе",
      "Оральном сексе",
      "Анальном сексе",
      "Не использую",
    ],
  },
  {
    name: "Почему Вы не использовали презерватив со своим последним сексуальным партнером (возможны несколько вариантов)?",
    multiple: true,
    answers: [
      "Я использовал его",
      "У меня его не было",
      "Я был в алкогольном/наркотическом опьянении",
      "Они слишком дорогие",
      "Партнер не хотел пользоваться презервативом",
      "Мы были готовы зачать ребенка",
      "Я не люблю пользоваться презервативами",
      "Мне кажется, в этом не было необходимости",
      "Я доверяю своему партнеру",
      "Я просто не думал об этом",
      "Я использую PrEP",
      "партнер ВИЧ на терапии (Н=Н)",
    ],
  },
  {
    name: "У Вас сейчас есть презерватив с собой?",
    multiple: false,
    answers: ["Да", "Нет"],
  },
  {
    name: "Используете ли вы наркотики для секса?",
    multiple: false,
    answers: ["Да", "Нет"],
  },
  {
    name: "Каким образом вы употребляли наркотики?",
    multiple: false,
    answers: ["Не употреблял", "Интраназально", "Инъекционно", "То и другое"],
  },
  {
    name: "Диагностировали у вас есть хронические формы гепатита? (если да, укажите форму: B, C, D, E)",
    multiple: false,
    answers: ["Нет", "Я не знаю об этой болезни", "B", "C", "D", "E"],
  },
  {
    name: "Приходилось ли вам получать или давать деньги или наркотики в обмен на сексуальные услуги в последние 6 месяцев?",
    multiple: false,
    answers: ["Да, я давал", "Да, я получал", "И то и другое", "Нет"],
  },
  {
    name: "С кем у вас были сексуальные контакты последние 6 месяцев?",
    multiple: true,
    answers: ["Мужчины", "Женщины", "Трансгендерные персоны", "Не было"],
  },
  {
    name: "Вы употребляли наркотики в последние 6 месяцев (если да, то какие)?",
    multiple: true,
    answers: [
      "Не употреблял",
      "Мефедрон",
      "Марихуана",
      "Бутират",
      "Кокаин",
      "Героин",
      "МДМА (экстази)",
      "Амфетамин",
      "Метамфетамин",
      "LSD",
    ],
  },
  {
    name: "За последние 6 месяцев у Вас были заболевания, передаваемые половым путем (гонорея, хламидия, микоплазма, сифилис)?",
    multiple: false,
    answers: ["Да", "Нет"],
  },
  {
    name: "Обращались ли вы за медицинской консультацией по поводу ИППП в последние 6 месяцев?",
    multiple: false,
    answers: ["Да", "Нет"],
  },
  {
    name: "Был ли у вас ранее диагностирован сифилис?",
    multiple: false,
    answers: ["Да", "Нет"],
  },
  {
    name: "Вы когда-нибудь проходили тестирование на ВИЧ?",
    multiple: false,
    answers: ["Да", "Нет"],
  },
  {
    name: "Вы гражданин России?",
    multiple: false,
    answers: ["Да", "Нет"],
  },
  {
    name: "У вас есть регистрация на территории региона проживания?",
    multiple: false,
    answers: [
      "Постоянная регистрация",
      "Временная регистрация",
      "Нет регистрации",
    ],
  },
  {
    name: "Ваше образование?",
    multiple: false,
    answers: [
      "Не получил базового среднего образования (не закончил 8-9 классы школы)",
      "Неполное среднее (закончил 8-9 классы школы или ПТУ / колледжа на базе 8-9 классов)",
      "Общее среднее (закончил 10-11 классы школы или ПТУ / колледжа на базе 10-11 классов)",
      "Общее среднее (закончил 10-11 классы школы или ПТУ / колледжа на базе 10-11 классов)",
      "Среднее специальное (окончил техникум / колледж / колледж со средним специальным образованием)",
      "Неполное высшее образование (закончил 2-4 года университета)",
      "Высшее (получил диплом университета)",
      "Академическая степень (кандидат наук, доктор наук)",
    ],
  },
  {
    name: "Какое из следующих определений лучше всего описывает характер вашей работы на данный момент?",
    multiple: false,
    answers: [
      "Полная занятость",
      "Частичная/неполная занятость",
      "Полная занятость в собственном бизнесе или в приносящей доход индивидуальной деятельности",
      "Случайный заработок, неполная занятость в собственном бизнесе или в приносящей доход индивидуальной деятельности",
      "Безработный (ищу работу)",
      "Я не работаю и не ищу работу",
    ],
  },
  {
    name: "Как часто вы проходите тестирование на ВИЧ?",
    multiple: false,
    answers: [
      "Раз в 3 месяца",
      "Раз в 6 месяцев",
      "Раз в 12 месяцев",
      "Менее одного раза в 12 месяцев",
      "Первый раз",
    ],
  },
  {
    name: "Ваше семейное положение?",
    multiple: false,
    answers: [
      "Никогда не был женат",
      "Я живу вместе с партнером, но отношения не зарегистрированы",
      "Женат/замужем",
      "Женат/замужем, живу отдельно от партнера",
      "В разводе живу отдельно от партнера",
      "В разводе, но живу с партнером",
      "Вдовец/вдова",
    ],
  },
  {
    name: "Мазок микоплазма genitalium (3 локализации)",
    multiple: false,
    answers: [
      "Отрицательно",
      "Положительно (рекомендована консультация дерматовенеролога и последующее лечение)",
      "Не предоставил",
    ],
  },
  {
    name: "Мазок хламидия (3 локализации)",
    multiple: false,
    answers: [
      "Отрицательно",
      "Положительно (рекомендована консультация дерматовенеролога и последующее лечение)",
      "Не предоставил",
    ],
  },
  {
    name: "Мазок гонорея (3 локализации)",
    multiple: false,
    answers: [
      "Отрицательно",
      "Положительно (рекомендована консультация дерматовенеролога и последующее лечение)",
      "Не предоставил",
    ],
  },
  {
    name: "Тест на сифилис (RPR кровь)",
    multiple: false,
    answers: [
      "Отрицательно",
      "Положительно (рекомендована консультация дерматовенеролога и последующее лечение)",
      "Не предоставил",
    ],
  },
  {
    name: "Результат биохимического анализа крови: креатинин",
    multiple: false,
    answers: [
      "Норма",
      "Отклонение (проведена консультация с врачом)",
      "Не предоставил",
    ],
  },
  {
    name: "Результат теста на Hbs Ag (наличие гепатита В)",
    multiple: false,
    answers: [
      "Отрицательно",
      "Положительно (рекомендован только постоянный прием)",
      "Не предоставил",
    ],
  },
  {
    name: "Результат теста на гепатит С (anti-HCV)",
    multiple: false,
    answers: [
      "Отрицательно",
      "Положительно (рекомендована консультация инфекциониста и последующее лечение)",
      "Не предоставил",
    ],
  },
  {
    name: "Получен неанонимный лабораторный результат ИФА ВИЧ 4 поколения",
    multiple: false,
    answers: [
      "Отрицательно",
      "Положительно – включение в программу отказано, проведена консультация по лечению",
    ],
  },
  {
    name: "Информированное согласие подписано",
    multiple: true,
    answers: ["Да"],
  },
  {
    name: "Отсутствие симптомов острой ВИЧ-инфекции (гриппоподобный синдром, лимфоаденопатия)",
    multiple: true,
    answers: ["Да"],
  },
  {
    name: "Проведена консультация по правилам приема ДКП?",
    multiple: true,
    answers: ["Да"],
  },
  {
    name: "Выдана ДКП на срок:",
    multiple: true,
    other: true,
    answers: ["1 месяц", "Другое"],
  },
  {
    name: "Проведена консультация по вакцинации: Гепатит А, гепатит B, ВПЧ по календарю",
    multiple: true,
    answers: ["Да"],
  },
  {
    name: "Использовали ли вы ранее ДКП?",
    multiple: false,
    answers: ["Нет", "Да, постоянный прием", "Да, по требованию"],
  },
  {
    name: "Режим приема ДКП:",
    multiple: false,
    answers: ["Постоянный", "По требованию (2-1-1)", "Смешанный"],
  },
  {
    name: "Комментарий",
    text: true,
  },
];

const findOptions = (question) =>
  questionsOptions.find((opts) => opts.name === question);

const Question = (props) => {
  const {
    question: { id, question },
  } = props;
  const options = findOptions(question);
  const label = `№${id}. ${question}`;
  let input = <Input />;
  if (options) {
    const { answers, multiple, other, text } = options;
    if (answers && answers.length !== 0) {
      if (multiple) {
        // множественный выбор
        input = (
          <Checkbox.Group>
            {answers.map((answer, index) => (
              <Checkbox
                value={answer}
                key={index}
                style={{ display: "block", marginLeft: 0 }}
              >
                {answer}
              </Checkbox>
            ))}
          </Checkbox.Group>
        );
      } else {
        // выбор одного варианта
        input = (
          <Radio.Group>
            {answers.map((answer, index) => (
              <Radio
                value={answer}
                key={index}
                style={{ display: "block", marginLeft: 0 }}
              >
                {answer}
              </Radio>
            ))}
          </Radio.Group>
        );
      }
    }
    if (text) {
      // текстовое поле
      input = <Input.TextArea />;
    }
  }

  return (
    <Card title={label}>
      <Form.Item name={id}>{input}</Form.Item>
    </Card>
  );
};

export const PatientVisitQuestionnaire = (props) => {
  const { patientVisit, questions } = props;
  const { id, patient, visit, patient_visit_answers, status, date } =
    patientVisit;
  const { openNotification } = useNotification();

  const questionsWithAnswers = questions.map((question) => {
    const answer = patient_visit_answers.find(
      (ans) => ans.questionId === question.id
    );
    return {
      ...question,
      ...(answer && { answer: answer.answer }),
    };
  });

  const initialValues = {
    status,
    date: date ? moment(date) : moment(),
  };
  questionsWithAnswers.forEach((qstn) => {
    const { id, question, answer } = qstn;
    const options = findOptions(question);
    if (options) {
      const { answers, multiple, other } = options;
      if (answers && answers.length !== 0) {
        if (multiple) {
          initialValues[id] = answer ? answer.split(", ") : [];
        } else {
          initialValues[id] = answer ?? "";
        }
      } else {
        initialValues[id] = answer ?? "";
      }
    } else {
      initialValues[id] = answer ?? "";
    }
  });

  const onFinish = (values) => {
    const { status, date, ...answers } = values;
    postPatientVisit(id, {
      status,
      date,
      values: answers,
    })
      .then(() => {
        openNotification("Анкета обновлена");
      })
      .catch(() => {
        openNotification("При обновлении анкеты произошла ошибка");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={initialValues}
      autoComplete="off"
    >
      <Typography.Title level={3}>
        {patient.code} ({visit.name})
      </Typography.Title>
      <Card title="Статус">
        <Form.Item name="status">
          <Select>
            <Select.Option value={0}>Новый</Select.Option>
            <Select.Option value={1}>Назначен</Select.Option>
            <Select.Option value={2}>Заполнен</Select.Option>
          </Select>
        </Form.Item>
      </Card>
      <Card title="Дата">
        <Form.Item name="date">
          <DatePicker format={"DD.MM.YYYY"} />
        </Form.Item>
      </Card>

      <br />
      <Typography.Title level={3}>Анкета</Typography.Title>
      {questionsWithAnswers.map((question) => (
        <Question question={question} key={question.id} />
      ))}
      <Card>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Card>
    </Form>
  );
};
