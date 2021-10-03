import axios from "axios";
import authHeader from "./auth-header";
import baseurl from "../baseurl";

const host = baseurl()
const API_URL = `${host}/api/diagrams`;

const findDiagram = (type = {}) => {
    return axios.post(API_URL, type, { headers: authHeader() });
};

export default {
    findDiagram
};
