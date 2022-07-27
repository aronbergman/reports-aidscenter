require("dotenv").config();
const bcrypt = require("bcryptjs");

// database
const db = require("./app/models");

const Patient = db.patients;
const Visit = db.visits;
const Question = db.questions;
const VisitQuestion = db.visit_quesions;
const PatientVisitAnswer = db.patient_visit_answers;

const questions_3 = [
  {
    question: "Продолжена ДКП?",
  },
  {
    question: "Причины отказа от ДКП (необязательный вопрос):",
  },
  {
    question: "Получен неанонимный лабораторный результат ИФА ВИЧ 4 поколения",
  },
  {
    question: "Экспресс-тест ВИЧ",
  },
  {
    question: "Результат биохимического анализа крови: креатинин",
  },
  {
    question: "Клиренс креатинина",
  },
  {
    question: "Результат теста на Hbs Ag (наличие гепатита В)",
  },
  {
    question: "Результат теста на гепатит С (anti-HCV)",
  },
  {
    question:
      "Результат теста на гепатит С (экспресс-тест в случае непредоставления лабораторного)",
  },
  {
    question: "Тест на сифилис (RPR кровь)",
  },
  {
    question:
      "Результат теста на сифилис (экспресс-тест в случае непредоставления лабораторного)",
  },
  {
    question: "Мазок гонорея (3 локализации)",
  },
  {
    question: "Мазок хламидия (3 локализации)",
  },
  {
    question: "Мазок микоплазма genitalium (3 локализации)",
  },
  {
    question:
      "Приверженность к ДКП за последний месяц (в процентах от 0 – 100%)",
  },
  {
    question: "Режим приема ДКП:",
  },
  {
    question: "Выдана ДКП на срок:",
  },
];

const questions_4 = [
  {
    question: "Ваш пол?",
  },
  {
    questions: "Ваш возраст?",
  },
  {
    questions:
      "Были ли у вас сексуальные партнеры за последние 6 месяцев (если да, укажите число)?",
  },
  {
    question: "Есть ли у вас постоянный/ постоянные сексуальный партнер?",
  },
  {
    question:
      "Как часто вы занимались сексом в последние 6 месяцев, используя презерватив?",
  },
  {
    question: "Используете ли вы презерватив при сексе с постоянным партнером?",
  },
  {
    question:
      "Используете ли вы презерватив при сексе со случайными партнерами?",
  },
  {
    question: "Вы пользовались презервативом во время последнего секса?",
  },
  {
    question:
      "Используете ли вы презервативы при (возможны несколько вариантов)",
  },
  {
    question:
      "Почему Вы не использовали презерватив со своим последним сексуальным партнером (возможны несколько вариантов)?",
  },
  {
    question: "У Вас сейчас есть презерватив с собой?",
  },
  {
    question: "С кем у вас были сексуальные контакты последние 6 месяцев?",
  },
  {
    question:
      "Вы употребляли наркотики в последние 6 месяцев (если да, то какие)?",
  },
  {
    question: "Используете ли вы наркотики для секса?",
  },
  {
    question: "Каким образом вы употребляли наркотики?",
  },
  {
    question:
      "Приходилось ли вам получать или давать деньги или наркотики в обмен на сексуальные услуги в последние 6 месяцев?",
  },
  {
    question:
      "За последние 6 месяцев у Вас были заболевания, передаваемые половым путем (гонорея, хламидия, микоплазма, сифилис)?",
  },
  {
    question:
      "Обращались ли вы за медицинской консультацией по поводу ИППП в последние 6 месяцев?",
  },
  {
    question:
      "Диагностировали у вас есть хронические формы гепатита? (если да, укажите форму: B, C, D, E)",
  },
  {
    question: "Был ли у вас ранее диагностирован сифилис?",
  },
  {
    question: "Вы когда-нибудь проходили тестирование на ВИЧ?",
  },
  {
    question: "Как часто вы проходите тестирование на ВИЧ?",
  },
  {
    question: "Вы гражданин России?",
  },
  {
    question: "У вас есть регистрация на территории региона проживания?",
  },
  {
    question: "Ваше образование?",
  },
  {
    question:
      "Какое из следующих определений лучше всего описывает характер вашей работы на данный момент?",
  },
  {
    question: "Ваше семейное положение?",
  },
  {
    question: "Режим приема ДКП:",
  },
  {
    question: "Выдана ДКП на срок:",
  },
  {
    question: "Город",
  },
  {
    question: "Консультант",
  },
  {
    question: "Комментарий",
  },
];

const questions_5 = [
  {
    question: "Режим приема ДКП:",
  },
  {
    question: "Выдана ДКП на срок:",
  },
];

const questions_6 = [
  {
    question: "Ваш пол?",
  },
  {
    questions: "Ваш возраст?",
  },
  {
    questions:
      "Были ли у вас сексуальные партнеры за последние 6 месяцев (если да, укажите число)?",
  },
  {
    question: "Есть ли у вас постоянный/ постоянные сексуальный партнер?",
  },
  {
    question:
      "Как часто вы занимались сексом в последние 6 месяцев, используя презерватив?",
  },
  {
    question: "Используете ли вы презерватив при сексе с постоянным партнером?",
  },
  {
    question:
      "Используете ли вы презерватив при сексе со случайными партнерами?",
  },
  {
    question: "Вы пользовались презервативом во время последнего секса?",
  },
  {
    question:
      "Используете ли вы презервативы при (возможны несколько вариантов)",
  },
  {
    question:
      "Почему Вы не использовали презерватив со своим последним сексуальным партнером (возможны несколько вариантов)?",
  },
  {
    question: "У Вас сейчас есть презерватив с собой?",
  },
  {
    question: "С кем у вас были сексуальные контакты последние 6 месяцев?",
  },
  {
    question:
      "Вы употребляли наркотики в последние 6 месяцев (если да, то какие)?",
  },
  {
    question: "Используете ли вы наркотики для секса?",
  },
  {
    question: "Каким образом вы употребляли наркотики?",
  },
  {
    question:
      "Приходилось ли вам получать или давать деньги или наркотики в обмен на сексуальные услуги в последние 6 месяцев?",
  },
  {
    question:
      "За последние 6 месяцев у Вас были заболевания, передаваемые половым путем (гонорея, хламидия, микоплазма, сифилис)?",
  },
  {
    question:
      "Обращались ли вы за медицинской консультацией по поводу ИППП в последние 6 месяцев?",
  },
  {
    question:
      "Диагностировали у вас есть хронические формы гепатита? (если да, укажите форму: B, C, D, E)",
  },
  {
    question: "Был ли у вас ранее диагностирован сифилис?",
  },
  {
    question: "Вы когда-нибудь проходили тестирование на ВИЧ?",
  },
  {
    question: "Как часто вы проходите тестирование на ВИЧ?",
  },
  {
    question: "Город",
  },
  {
    question: "Консультант",
  },
  {
    question: "Комментарий",
  },
];

(async () => {
  await Patient.sync({
    alter: true,
  });
  await VisitQuestion.sync({
    alter: true,
  });
  await PatientVisitAnswer.sync({
    alter: true,
  });

  const [visit_3] = await Visit.findOrCreate({
    where: {
      name: "Визит 3",
    },
  });

  const [visit_4] = await Visit.findOrCreate({
    where: {
      name: "Визит 4",
    },
  });

  const [visit_5] = await Visit.findOrCreate({
    where: {
      name: "Визит 5",
    },
  });

  const [visit_6] = await Visit.findOrCreate({
    where: {
      name: "Визит 6",
    },
  });

  // 3
  questions_3.map(async (info, index) => {
    const { question } = info;
    const [qstn] = await Question.findOrCreate({
      where: { question },
    });
    if (qstn && visit_3) {
      const [visitQuestion] = await VisitQuestion.findOrCreate({
        where: { visitId: visit_3.id, questionId: qstn.id },
      });
      if (visitQuestion) {
        visitQuestion.seq = index;
        visitQuestion.save();
      }
    }
  });

  // 4
  questions_4.map(async (info, index) => {
    const { question } = info;
    const [qstn] = await Question.findOrCreate({
      where: { question },
    });
    if (qstn && visit_4) {
      const [visitQuestion] = await VisitQuestion.findOrCreate({
        where: { visitId: visit_4.id, questionId: qstn.id },
      });
      if (visitQuestion) {
        visitQuestion.seq = index;
        visitQuestion.save();
      }
    }
  });

  // 5
  questions_5.map(async (info, index) => {
    const { question } = info;
    const [qstn] = await Question.findOrCreate({
      where: { question },
    });
    if (qstn && visit_5) {
      const [visitQuestion] = await VisitQuestion.findOrCreate({
        where: { visitId: visit_5.id, questionId: qstn.id },
      });
      if (visitQuestion) {
        visitQuestion.seq = index;
        visitQuestion.save();
      }
    }
  });

  // 6
  questions_6.map(async (info, index) => {
    const { question } = info;
    const [qstn] = await Question.findOrCreate({
      where: { question },
    });
    if (qstn && visit_6) {
      const [visitQuestion] = await VisitQuestion.findOrCreate({
        where: { visitId: visit_6.id, questionId: qstn.id },
      });
      if (visitQuestion) {
        visitQuestion.seq = index;
        visitQuestion.save();
      }
    }
  });
})();
