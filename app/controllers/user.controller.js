const db = require("../models");
const User = db.user;
const UserRoles = db.userRoles;
const Role = db.role;
const Subdivision = db.subdivision;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.oneUserData = (req, res) => {
    User.findOne({
        where: {
            id: req.body.id
        }
    }).then(data => {
        res.status(200).send(data);
    })
};

exports.allUsersData = (req, res) => {
    User.findAll({
        order: [['createdAt', 'DESC']]
    }).then(data => {
        res.status(200).send(data);
    })
};

exports.allRolesData = (req, res) => {
    UserRoles.findAll({
        order: [['createdAt', 'DESC']]
    }).then(data => {
        res.status(200).send(data);
    })
};

exports.rolesData = (req, res) => {
    Role.findAll({
        order: [['createdAt', 'DESC']]
    }).then(data => {
        res.status(200).send(data);
    })
};

exports.subdivisionsData = (req, res) => {
    Subdivision.findAll({
        order: [['createdAt', 'DESC']]
    }).then(data => {
        res.status(200).send(data);
    })
};
