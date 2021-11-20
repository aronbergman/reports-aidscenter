const db = require("../models");
require('dotenv').config()
const { JWT_SECRET } = process.env
const User = db.user;
const Role = db.role;
const UserRoles = db.userRoles;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        appointment: req.body.appointment,
        password: bcrypt.hashSync(req.body.password, 8),
        city: req.body.city
    })
        .then(user => {
            UserRoles.create({
                roleId: 1,
                userId: user.id,
                subdivisionId: "2"
            }).then(() => {
                res.send({ message: "User registered successfully!" });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "Пользователя с таким email не найдено" });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Проверьте правильность логина и пароля"
                });
            }

            var token = jwt.sign({ id: user.id }, JWT_SECRET, {
                expiresIn: 604800 // 7 day
            });

            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    city: user.city,
                    appointment: user.appointment,
                    roles: authorities,
                    accessToken: token,
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.changePassword = (req, res) => {
    User.update(
        { password: bcrypt.hashSync(req.body.password, 8) },
        { where: { username: req.body.username } }
    )
        .then(user => {
            res.send({ message: "User password update successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.changeCity = (req, res) => {
    User.update(
        { city: req.body.city },
        { where: { username: req.body.username } }
    )
        .then(user => {
            res.send({ message: "User city update successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.changeRole = (req, res) => {
    UserRoles.update(
        { roleId: req.body.roleId },
        { where: { userId: req.body.userId } }
    )
        .then(user => {
            res.send({ message: "User role update successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.changeSubdivision = (req, res) => {
    console.log('req', req.body)
    UserRoles.update(
        { subdivisionId: req.body.subdivisionsId },
        { where: { userId: req.body.userId } }
    )
        .then(user => {
            res.send({ message: "User subdivisions update successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};