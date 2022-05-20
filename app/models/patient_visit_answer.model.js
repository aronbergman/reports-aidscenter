module.exports = (sequelize, Sequelize) => {
  const PatientVisitAnswer = sequelize.define(
    "patient_visit_answer",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      patientVisitId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      answer: {
        type: Sequelize.STRING,
      },
      other: {
        type: Sequelize.STRING,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["patientVisitId", "questionId"],
        },
      ],
    }
  );

  return PatientVisitAnswer;
};
