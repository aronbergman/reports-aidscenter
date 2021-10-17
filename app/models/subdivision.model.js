module.exports = (sequelize, Sequelize) => {
  const Subdivision = sequelize.define("subdivision", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    label: {
      type: Sequelize.STRING
    }
  });

  return Subdivision;
};
