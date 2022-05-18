require("dotenv").config();
const bcrypt = require("bcryptjs");

// database
const db = require("./app/models");

const Role = db.role;
const User = db.user;
const UserRole = db.userRoles;
const Subdivision = db.subdivision;
const Visit = db.visits;
const Question = db.questions;
const VisitQuestion = db.visit_quesions;

const visits = [
  {
    num: 1,
    name: "Визит 1",
    comment: 'Старт',
  },
  {
    num: 2,
    name: "Визит 2",
    comment: '1 мес',
  },
  {
    num: 3,
    name: "Визит 3",
    comment: '3 мес',
  },
  {
    num: 4,
    name: "Визит 4",
    comment: '6 мес',
  },
  {
    num: 5,
    name: "Визит 5",
    comment: '9 мес',
  },
  {
    num: 6,
    name: "Визит 6",
    comment: '12 мес',
  },
];

const questions = [
  {
    question: "Откуда вы узнали о проекте по ДКП?",
  },
  {
    question: "Ваш пол?",
  },
  {
    question: "Ваш возраст?",
  },
  {
    question:
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
    question: "Информированное согласие подписано",
  },
  {
    question:
      "Отсутствие симптомов острой ВИЧ-инфекции (гриппоподобный синдром, лимфоаденопатия)",
  },
  {
    question: "Получен неанонимный лабораторный результат ИФА ВИЧ 4 поколения",
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
    question: "Проведена консультация по правилам приема ДКП?",
  },
  {
    question: "Использовали ли вы ранее ДКП?",
  },
  {
    question: "Режим приема ДКП:",
  },
  {
    question: "Выдана ДКП на срок:",
  },
  {
    question:
      "Проведена консультация по вакцинации: Гепатит А, гепатит B, ВПЧ по календарю",
  },
  {
    question: "Консультант",
  },
  {
    question: "Город",
  },
  {
    question: "Комментарий",
  },
];

const roles = [
  {
    id: 1,
    name: "user",
    label: "Консультант",
  },
  {
    id: 2,
    name: "moderator",
    label: "Модератор",
  },
  {
    id: 3,
    name: "admin",
    label: "Администратор",
  },
];

const users = [
  {
    username: "uadmintest",
    password: "ZjPJGw2C5c",
    roles: ["admin", "moderator"],
  },
];

const subdivisions = [
  // {
  //   id: 1,
  //   name: "testing",
  //   label: "Тестирование",
  // },
  // {
  //   id: 2,
  //   name: "groups",
  //   label: "Группы поддержки",
  // },
  // {
  //   id: 3,
  //   name: "hot-line",
  //   label: "Горячая линия",
  // },
];

(async () => {
  await db.sequelize.sync({
    alter: true,
  });
  // db.sequelize.sync({force: true}).then(() => {
  //   console.log('db clear');
  // });

  // subdivisions
  await Promise.all(
    subdivisions.map((info) => {
      const { id, name, label } = info;
      return Subdivision.findOrCreate({
        where: { id, name, label },
      });
    })
  );
  console.log("subdivisions");

  // roles
  await Promise.all(
    roles.map((info) => {
      const { id, name, label } = info;
      return Role.findOrCreate({
        where: { id, name, label },
      });
    })
  );
  console.log("roles");

  // visits
  await Promise.all(
    visits.map(async (info) => {
      const { name, num, comment } = info;
      const [visit] = await Visit.findOrCreate({
        where: { name },
      });
      visit.num = num;
      visit.comment = comment;
      return visit.save();
    })
  );
  console.log("visits");

  // questions
  await Promise.all(
    questions.map((info) => {
      const { question } = info;
      return Question.findOrCreate({
        where: { question },
      });
    })
  );
  console.log("questions");

  // visit questions
  const [visit_1] = await Visit.findOrCreate({
    where: {
      name: visits[0].name,
    },
  });
  await Promise.all(
    questions.map(async (info) => {
      const { question } = info;
      const [qstn] = await Question.findOrCreate({
        where: { question },
      });
      if (qstn && visit_1) {
        return VisitQuestion.findOrCreate({
          where: { visitId: visit_1.id, questionId: qstn.id },
        });
      }
    })
  );
  console.log("visit questions");

  // users
  await Promise.all(
    users.map(async (info) => {
      const { username, password, roles } = info;
      const [user] = await User.findOrCreate({
        where: { username },
      });
      if (user) {
        user.password = bcrypt.hashSync(password, 8);
        await user.save();
        roles.forEach(async (name) => {
          const [role] = await Role.findOrCreate({
            where: {
              name,
            },
          });
          if (role) {
            await UserRole.findOrCreate({
              where: {
                roleId: role.id,
                userId: user.id,
                subdivisionId: "testing",
              },
            });
          }
        });
      }
      return;
    })
  );
  console.log("users");
})();
