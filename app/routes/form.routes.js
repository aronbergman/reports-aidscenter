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
        "/api/form/find/testing",
        controller.findTesting
    );

    app.post(
        "/api/form/find/hot-line",
        controller.findHotLine
    );
}