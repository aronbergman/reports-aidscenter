const { authJwt } = require("../middleware");
const controller = require("../controllers/patients.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/patients/:id", [authJwt.verifyToken], controller.findPatient);
  app.get("/api/patients", [authJwt.verifyToken], controller.findPatients);
  app.post("/api/patients/:id", [authJwt.verifyToken], controller.updatePatient);
  app.post("/api/patients", [authJwt.verifyToken], controller.createPatient);
};
