import axios from "axios";
import authHeader from "../../services/auth-header";
import { API_PATIENTS } from "../../constants/api.constants";

export const getPatients = async (filter) => {
  return axios
    .get(API_PATIENTS, { params: filter, headers: authHeader() })
    .then((response) => response);
};

export const getPatient = async (id) => {
  return axios
    .get(`${API_PATIENTS}/${id}`, { headers: authHeader() })
    .then((response) => response);
};

export const postPatients = async (payload) => {
  return axios
    .post(API_PATIENTS, payload, { headers: authHeader() })
    .then((response) => response);
};

export const postPatient = async (id, payload) => {
  return axios
    .post(`${API_PATIENTS}/${id}`, payload, { headers: authHeader() })
    .then((response) => response);
};

export const deletePatient = async (id) => {
  return axios
    .delete(`${API_PATIENTS}/${id}`, { headers: authHeader() })
    .then((response) => response);
};
