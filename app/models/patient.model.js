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
  });
  return Patient;
};
