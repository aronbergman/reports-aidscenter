import axios from "axios";
import authHeader from "../../services/auth-header";
import { API_PATIENT_VISITS } from "../../constants/api.constants";

export const getPatientVisits = async (params = {}) => {
  return axios
    .get(API_PATIENT_VISITS, { params, headers: authHeader() })
    .then((response) => response);
};

export const getPatientVisit = async (id) => {
  return axios
    .get(`${API_PATIENT_VISITS}/${id}`, { headers: authHeader() })
    .then((response) => response);
};

export const postPatientVisits = async (payload) => {
  return axios
    .post(API_PATIENT_VISITS, payload, { headers: authHeader() })
    .then((response) => response);
};

export const postPatientVisit = async (id, payload) => {
  return axios
    .post(`${API_PATIENT_VISITS}/${id}`, payload, { headers: authHeader() })
    .then((response) => response);
};
