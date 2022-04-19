module.exports = (sequelize, Sequelize) => {
  const Question = sequelize.define("questions", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    question: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
  });
  return Question;
};
