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
      type: Sequelize.STRING,
      allowNull: true,
    },
    medicalFrequency: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    sexFrequency: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    condomUse: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    chemsex: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
  return Patient;
};
