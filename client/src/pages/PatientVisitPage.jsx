import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getQuestions } from "../redux/thunks/questions.thunk";
import { getPatientVisit } from "../redux/thunks/patient_visits.thunk";
import { getVisit } from "../redux/thunks/visits.thunks";
import { PatientVisitQuestionnaire } from './PatientVisitQuestionnaire';

export const PatientVisitPage = () => {
  const { id } = useParams();
  const [allQuestions, setAllQuestions] = useState([]);
  const [visitQuestions, setVisitQuestions] = useState([]);
  const [patientVisit, setPatientVisit] = useState();
  const [visit, setVisit] = useState();

  useEffect(() => {
    getQuestions().then((res) => setAllQuestions(res.data));
  }, []);

  useEffect(() => {
    getPatientVisit(id).then((res) => setPatientVisit(res.data));
  }, [id]);

  useEffect(() => {
    if (patientVisit) {
      getVisit(patientVisit.visitId).then((res) => setVisit(res.data));
    }
  }, [patientVisit]);

  useEffect(() => {
    if (visit && allQuestions.length !== 0) {
      const questions = visit.visit_questions.map(({ questionId }) => allQuestions.find((qstn) => qstn.id === questionId));
      setVisitQuestions(questions);
    }
  }, [visit, allQuestions]);

  if (patientVisit) {
    return <PatientVisitQuestionnaire patientVisit={patientVisit} questions={visitQuestions}/>
  }

  return <></>;
};
