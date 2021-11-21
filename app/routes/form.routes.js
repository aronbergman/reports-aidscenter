const { authJwt } = require("../middleware");
const controller = require("../controllers/form.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/form/testing",
        controller.testing
    );

    app.post(
        "/api/form/hot-line",
        controller.hotLine
    );

    app.post(
        "/api/form/groups-hiv",
        controller.groupsHiv
    );

    app.post(
        "/api/form/drugstore",
        controller.drugstore
    );

    app.post(
        "/api/form/find/testing",
        [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
        controller.findTesting
    );

    app.post(
        "/api/form/find/drugstore",
        [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
        controller.findDrugstore
    );

    app.post(
        "/api/form/find/hot-line",
        [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
        controller.findHotLine
    );

    app.post(
        "/api/form/find/groups-hiv",
        [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
        controller.findGroupsHiv
    );
}