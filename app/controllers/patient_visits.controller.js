const db = require("../models");
const PatientVisit = db.patient_visits;
const PatientVisitAnswer = db.patient_visit_answers;
const Patient = db.patients;
const Visit = db.visits;

exports.findPatientVisits = (req, res) => {
  PatientVisit.findAll({
    include: [Patient, Visit],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.createPatientVisit = (req, res) => {
  PatientVisit.create({
    patientId: req.body.patientId,
    visitId: req.body.visitId,
    date: req.body.date,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findPatientVisit = (req, res) => {
  if (req.params.id) {
    PatientVisit.findOne({
      where: { id: req.params.id },
      include: [Patient, Visit, PatientVisitAnswer],
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

exports.updatePatientVisit = async (req, res) => {
  if (req.params.id) {
    const patientVisit = await PatientVisit.findOne({
      where: { id: req.params.id },
      include: [Patient, Visit],
    });
    if (patientVisit) {
      const { status, date, values } = req.body;
      patientVisit.status = status;
      patientVisit.date = date;
      await patientVisit.save();
      for (const [questionId, value] of Object.entries(values)) {
        let answerText = undefined;
        if (typeof value === 'string') {
          answerText = value;
        } else if (Array.isArray(value)) {
          answerText = value.join(', ');
        }
        if (answerText !== undefined) {
          const [patientAnswer] = await PatientVisitAnswer.findOrCreate({
            where: { patientVisitId: patientVisit.id, questionId },
          });
          patientAnswer.answer = answerText;
          patientAnswer.save();
        }
      }
      res.status(201).send(patientVisit);
    } else {
      res.status(404).send();
    }
  } else {
    res.status(404).send();
  }
};
