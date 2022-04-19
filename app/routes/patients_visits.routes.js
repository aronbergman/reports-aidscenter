const { authJwt } = require("../middleware");
const controller = require("../controllers/patient_visits.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/patient_visits/:id", [authJwt.verifyToken], controller.findPatientVisit);
  app.post("/api/patient_visits/:id", [authJwt.verifyToken], controller.updatePatientVisit);
  app.get("/api/patient_visits", [authJwt.verifyToken], controller.findPatientVisits);
  app.post("/api/patient_visits", [authJwt.verifyToken], controller.createPatientVisit);
};
