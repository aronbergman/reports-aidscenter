module.exports = (sequelize, Sequelize) => {
  const Visit = sequelize.define("visits", {
    num: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    comment: {
      type: Sequelize.STRING,
    },
  });
  return Visit;
};
