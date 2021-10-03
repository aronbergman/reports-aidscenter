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
        [authJwt.verifyToken],
        controller.testing
    );

    app.post(
        "/api/form/find/testing",
        [authJwt.verifyToken],
        controller.findTesting
    );
}