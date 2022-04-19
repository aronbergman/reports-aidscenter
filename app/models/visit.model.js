module.exports = (sequelize, Sequelize) => {
  const Visit = sequelize.define("visits", {
    name: {
      type: Sequelize.STRING,
    },
  });
  return Visit;
};
