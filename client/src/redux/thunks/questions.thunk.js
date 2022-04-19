import axios from "axios";
import authHeader from "../../services/auth-header";
import { API_QUESTIONS } from "../../constants/api.constants";

export const getQuestions = async () => {
  return axios
    .get(API_QUESTIONS, { headers: authHeader() })
    .then((response) => response);
};
