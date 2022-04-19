const db = require("../models");
const Visit = db.visits;
const VisitQuestion = db.visit_quesions;
const Question = db.questions;

exports.findVisits = (req, res) => {
  Visit.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findVisit = (req, res) => {
  if (req.params.id) {
    Visit.findOne({
      where: { id: req.params.id },
      include: [VisitQuestion],
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else {
    res.status(404).send();
  }
};

exports.createVisit = (req, res) => {
  Visit.create({
    name: req.body.name,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
