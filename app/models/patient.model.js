module.exports = (sequelize, Sequelize) => {
  const Patient = sequelize.define("patients", {
    code: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    contact: {
      type: Sequelize.STRING,
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    medicalFrequency: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    sexFrequency: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    condomUse: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    chemsex: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  });
  return Patient;
};
