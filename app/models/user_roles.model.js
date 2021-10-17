module.exports = (sequelize, Sequelize) => {
  const UserRoles = sequelize.define("user_roles", {
    roleId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    subdivisionId: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    userId: {
      type: Sequelize.INTEGER,
    }
  });

  return UserRoles;
};
