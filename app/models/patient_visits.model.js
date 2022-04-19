module.exports = (sequelize, Sequelize) => {
  const PatientVisit = sequelize.define(
    "patient_visits",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      visitId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["patientId", "visitId"],
        },
      ],
    }
  );

  return PatientVisit;
};
