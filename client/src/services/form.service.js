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

const hotLineForm = (fields) => {
    return axios.post(API_URL + "hot-line", {
        ...fields,
    }, { headers: authHeader() });
};

const groupsHivForm = (fields) => {
    return axios.post(API_URL + "groups-hiv", {
        ...fields,
    }, { headers: authHeader() });
};

const drugsForm = (fields) => {
    return axios.post(API_URL + "drugstore", {
        ...fields,
    }, { headers: authHeader() });
};

const findTesting = (filters = {}) => {
    return axios.post(API_URL + "find/testing", filters, { headers: authHeader() });
};

const findHotLine = (filters = {}) => {
    return axios.post(API_URL + "find/hot-line", filters, { headers: authHeader() });
};

const findGroupsHiv = (filters = {}) => {
    return axios.post(API_URL + "find/groups-hiv", filters, { headers: authHeader() });
};

const findDrugstore = (filters = {}) => {
    return axios.post(API_URL + "find/drugstore", filters, { headers: authHeader() });
};

export default {
    testing,
    findTesting,
    hotLineForm,
    groupsHivForm,
    findHotLine,
    findGroupsHiv,
    drugsForm,
    findDrugstore
};
