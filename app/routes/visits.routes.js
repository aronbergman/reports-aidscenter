const { authJwt } = require("../middleware");
const controller = require("../controllers/visits.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/visits/:id", [authJwt.verifyToken], controller.findVisit);
  app.get("/api/visits", [authJwt.verifyToken], controller.findVisits);
  app.post("/api/visits", [authJwt.verifyToken], controller.createVisit);
};
