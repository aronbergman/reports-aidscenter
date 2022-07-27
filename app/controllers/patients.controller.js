const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = require("../models");
const Patient = db.patients;
const Visit = db.visits;
const PatientVisit = db.patient_visits;

exports.findPatients = (req, res) => {
  const {
    medicalFrequency,
    drugs,
    birthDay,
    code,
    dateStart,
    dateEnd,
    d1,
    d2,
    d3,
    d4,
    d5,
    d6,
  } = req.query;
  const ippp1 = +d1;
  const ippp2 = +d2;
  const ippp3 = +d3;
  const ippp4 = +d4;
  const ippp5 = +d5;
  const ippp6 = +d6;
  const where = {
    ...(medicalFrequency && { medicalFrequency }),
    ...(drugs && { drugs }),
    ...(birthDay && { code: { [Op.like]: `%${birthDay}%` } }),
    ...(code && { code: { [Op.like]: `%${code}%` } }),
    ...(ippp1 === 1 && { ippp1: true }),
    ...(ippp2 === 1 && { ippp2: true }),
    ...(ippp3 === 1 && { ippp3: true }),
    ...(ippp4 === 1 && { ippp4: true }),
    ...(ippp5 === 1 && { ippp5: true }),
    ...(ippp6 === 1 && { ippp6: true }),
  };
  Patient.findAll({
    include: [PatientVisit],
    where,
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
      comment: req.body.comment || "",
      medicalFrequency: req.body.medicalFrequency || "",
      sexFrequency: req.body.sexFrequency || "",
      condomUse: req.body.condomUse || "",
      chemSex: req.body.chemSex || "",
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
      patient.code = req.body.code || "";
      patient.contact = req.body.contact || "";
      patient.comment = req.body.comment || "";
      patient.medicalFrequency = req.body.medicalFrequency || "";
      patient.sexFrequency = req.body.sexFrequency || "";
      patient.condomUse = req.body.condomUse || "";
      patient.chemsex = req.body.chemsex || "";
      await patient.save();
      res.status(201).send(patient);
    } else {
      res.status(404).send();
    }
  } else {
    res.status(404).send();
  }
};
