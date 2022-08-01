import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Spin } from "antd";
import { getQuestions } from "../redux/thunks/questions.thunk";
import { getPatientVisit } from "../redux/thunks/patient_visits.thunk";
import { getVisit } from "../redux/thunks/visits.thunks";
import { PatientVisitQuestionnaire } from "./PatientVisitQuestionnaire";

const orderBySeq = (qs1, qs2) => (qs1.seq > qs2.seq ? 1 : -1);

export const PatientVisitPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
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
      const questions = visit.visit_questions.map((visitQuestion) => {
        const question = allQuestions.find(
          (qstn) => qstn.id === visitQuestion.questionId
        );
        return {
          ...question,
          seq: visitQuestion.seq,
        };
      }).sort(orderBySeq);
      setVisitQuestions(questions);
      setLoading(false);
    }
  }, [visit, allQuestions]);

  if (loading) {
    return <Spin />;
  } else {
    return (
      <PatientVisitQuestionnaire
        patientVisit={patientVisit}
        questions={visitQuestions}
      />
    );
  }
};
