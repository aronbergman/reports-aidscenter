const db = require("../models");
const Question = db.questions;

exports.findQuestions = (req, res) => {
  Question.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.createQuestion = (req, res) => {
  Question.create({
    name: req.body.name,
    type: req.body.type,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
