const db = require("../models");
const Patient = db.patients;
const Visit = db.visits;
const PatientVisit = db.patient_visits;

exports.findPatients = (req, res) => {
  Patient.findAll({
    include: [PatientVisit],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findPatient = (req, res) => {
  if (req.params.id) {
    Patient.findOne({
      where: { id: req.params.id },
      include: [PatientVisit],
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

exports.createPatient = async (req, res) => {
  try {
    const visits = await Visit.findAll();
    const patient = await Patient.create({
      code: req.body.code,
      contact: req.body.contact,
    });
    if (patient) {
      visits.forEach(async (visit) => {
        const [patientVisit] = await PatientVisit.findOrCreate({
          where: { patientId: patient.id, visitId: visit.id },
        });
        patientVisit.status = 0;
        patientVisit.save();
      });
    }
    res.send(patient);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updatePatient = async (req, res) => {
  if (req.params.id) {
    const patient = await Patient.findOne({
      where: { id: req.params.id },
    });
    if (patient) {
      const { code, contact } = req.body;
      patient.code = code;
      patient.contact = contact;
      await patient.save();
      res.status(201).send(patient);
    } else {
      res.status(404).send();
    }
  } else {
    res.status(404).send();
  }
};
