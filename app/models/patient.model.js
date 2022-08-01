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
    drugs: {
      type: Sequelize.STRING,
    },
    ippp1: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    ippp2: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    ippp3: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    ippp4: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    ippp5: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    ippp6: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });
  return Patient;
};
