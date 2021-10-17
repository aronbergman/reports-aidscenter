const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const { NODE_ENV, SERVER_PORT, CORS_DEV_PORT } = process.env;

const app = express();

var corsOptions = {
    origin: `http://localhost:${NODE_ENV === 'production' ? SERVER_PORT : CORS_DEV_PORT}`
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
const Subdivision = db.subdivision;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to reports aids.center." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/form.routes')(app);
require('./app/routes/diagrams.routes')(app);

// set port, listen for requests
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}.`);
});

// initialRole()
// initialSubdivision()

function initialRole() {

    Role.create({
        id: 1,
        name: "user",
        label: "Консультант"
    });

    Role.create({
        id: 2,
        name: "moderator",
        label: "Модератор"
    });

    Role.create({
        id: 3,
        name: "admin",
        label: "Администратор"
    });
}

function initialSubdivision() {

    Subdivision.create({
        id: 1,
        name: "testing",
        label: "Тестирование"
    });

    Subdivision.create({
        id: 2,
        name: "groups",
        label: "Группы поддержки"
    });

    Subdivision.create({
        id: 3,
        name: "hot-line",
        label: "Горячая линия"
    });
}