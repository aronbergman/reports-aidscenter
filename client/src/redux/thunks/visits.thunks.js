import axios from "axios";
import authHeader from "../../services/auth-header";
import { API_VISITS } from "../../constants/api.constants";

export const getVisits = async () => {
  return axios
    .get(API_VISITS, { headers: authHeader() })
    .then((response) => response);
};

export const getVisit = async (id) => {
  return axios
    .get(`${API_VISITS}/${id}`, { headers: authHeader() })
    .then((response) => response);
};

export const postVisits = async (payload) => {
  return axios
    .post(API_VISITS, payload, { headers: authHeader() })
    .then((response) => response);
};
