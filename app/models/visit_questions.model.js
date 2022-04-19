module.exports = (sequelize, Sequelize) => {
  const VisitQuestion = sequelize.define(
    "visit_questions",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      visitId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      seq: {
        type: Sequelize.INTEGER,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["visitId", "questionId"],
        },
      ],
    }
  );

  return VisitQuestion;
};
