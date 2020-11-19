const { authJwt } = require("../middleware");
const controller = require("../controllers/video.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/video/create',
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.setVideo);

    app.post('/api/video/first-list',
        controller.getFirstList)

}