import axios from "axios";
import authHeader from "./auth-header";
import baseurl from "../baseurl";

const host = baseurl()
const API_URL = `${host}/api/form/`;

const testing = (fields) => {
    return axios.post(API_URL + "testing", {
        ...fields,
    }, { headers: authHeader() });
};

const findTesting = (filters = {}) => {
    return axios.post(API_URL + "find/testing", filters, { headers: authHeader() });
};

export default {
    testing,
    findTesting
};
