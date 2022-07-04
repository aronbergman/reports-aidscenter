require("dotenv").config();
const bcrypt = require("bcryptjs");

// database
const db = require("./app/models");

const Patient = db.patients;
const Visit = db.visits;
const Question = db.questions;
const VisitQuestion = db.visit_quesions;
const PatientVisitAnswer = db.patient_visit_answers;

const questions = [
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
    question: "Результат теста на гепатит С (экспресс-тест в случае непредоставления лабораторного)",
  },
  {
    question: "Тест на сифилис (RPR кровь)",
  },
  {
    question: "Результат теста на сифилис (экспресс-тест в случае непредоставления лабораторного)",
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
    question: "Приверженность к ДКП за последний месяц (в процентах от 0 – 100%)",
  },
  {
    question: "Режим приема ДКП:",
  },
  {
    question: "Выдана ДКП на срок:",
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
      name: 'Визит 3',
    },
  });

  questions.map(async (info, index) => {
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
  })
})();