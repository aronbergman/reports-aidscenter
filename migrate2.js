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
    question: "Насколько вы удовлетворены текущими препаратами для профилактики ВИЧ?",
  },
  {
    question: "Испытывали ли вы какие-либо побочные эффекты?",
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
  {
    question: "Готовы ли вы рассказать о своем опыте использования ДКП публично/в соцсетях?",
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
  
  const [visit_2] = await Visit.findOrCreate({
    where: {
      name: 'Визит 2',
    },
  });

  questions.map(async (info, index) => {
    const { question } = info;
    const [qstn] = await Question.findOrCreate({
      where: { question },
    });
    if (qstn && visit_2) {
      const [visitQuestion] = await VisitQuestion.findOrCreate({
        where: { visitId: visit_2.id, questionId: qstn.id },
      });
      if (visitQuestion) {
        visitQuestion.seq = index;
        visitQuestion.save();
      }
    }
  })
})();