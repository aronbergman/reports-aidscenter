const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize = sequelize;
db.sequelize = sequelize;
db.sequelize = sequelize;
db.sequelize = sequelize;
db.sequelize = sequelize;
db.sequelize = sequelize;
db.sequelize = sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.subdivision = require("../models/subdivision.model.js")(
  sequelize,
  Sequelize
);
db.userRoles = require("../models/user_roles.model.js")(sequelize, Sequelize);
db.testing = require("../models/testing.model.js")(sequelize, Sequelize);
db.hotLine = require("../models/hot_line.model.js")(sequelize, Sequelize);
db.groupsHiv = require("../models/groups_hiv.model.js")(sequelize, Sequelize);
db.groupsTG = require("../models/groups_tg.model.js")(sequelize, Sequelize);
db.drugstore = require("../models/drugstore.model.js")(sequelize, Sequelize);
db.diagrams = require("../models/diargams.model.js")(sequelize, Sequelize);

// patients
db.visits = require("../models/visit.model.js")(sequelize, Sequelize);
db.patients = require("../models/patient.model.js")(sequelize, Sequelize);
db.patient_visits = require("../models/patient_visits.model.js")(
  sequelize,
  Sequelize
);

// questions
db.questions = require("../models/question.model.js")(sequelize, Sequelize);
db.visit_quesions = require("../models/visit_questions.model.js")(
  sequelize,
  Sequelize
);
db.patient_visit_answers = require("../models/patient_visit_answer.model.js")(
  sequelize,
  Sequelize
);

// patient_visits <-> patients
db.patient_visits.belongsTo(db.patients, {
  sourcekey: "patientId",
});
db.patient_visits.belongsTo(db.visits, {
  sourcekey: "visitId",
});
// patient_visits <-> patient_visit_answers
db.patient_visits.hasMany(db.patient_visit_answers, {
  foreignKey: "patientVisitId",
});
// visits <-> visit_quesions
db.visits.hasMany(db.visit_quesions, {
  foreignKey: "visitId",
});
db.visit_quesions.belongsTo(db.visits);
db.patients.hasMany(db.patient_visits, {
  foreignKey: "patientId",
});

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
