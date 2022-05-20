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
      comment: req.body.comment ?? '',
      medicalFrequency: req.body.medicalFrequency ?? '',
      sexFrequency: req.body.sexFrequency ?? '',
      condomUse: req.body.condomUse ?? '',
      chemSex: req.body.chemSex ?? '',
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

exports.deletePatient = async (req, res) => {
  try {
    if (req.params.id) {
      const patientId = +req.params.id;
      await PatientVisit.destroy({ where: { patientId } });
      await Patient.destroy({ where: { id: patientId } });
      res.status(200).send();
    } else {
      res.status(404).send();
    }
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
      patient.code = req.body.code ?? '';
      patient.contact = req.body.contact ?? '';
      patient.comment = req.body.comment ?? '';
      patient.medicalFrequency = req.body.medicalFrequency ?? '';
      patient.sexFrequency = req.body.sexFrequency ?? '';
      patient.condomUse = req.body.condomUse ?? '';
      patient.chemsex = req.body.chemsex ?? '';
      await patient.save();
      res.status(201).send(patient);
    } else {
      res.status(404).send();
    }
  } else {
    res.status(404).send();
  }
};
