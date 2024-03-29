const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.post(
      "/api/user/one-user-data",
      [authJwt.verifyToken],
      controller.oneUserData
  );

  app.post(
      "/api/user/all-users-data",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.allUsersData
  );

  app.post(
      "/api/user/all-users-for-forms-data",
      controller.allUsersForFormsData
  );

  app.post(
      "/api/user/all-roles-data",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.allRolesData
  );

  app.post(
      "/api/roles",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.rolesData
  );

  app.post(
      "/api/subdivisions",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.subdivisionsData
  );
};
