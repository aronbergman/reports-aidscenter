import { fetchRole } from "../reducers/user.reducer";
import axios from "axios";
import {
    API_AUTH_SIGNIN,
    API_ALL_USERS,
    API_ALL_ROLES,
    API_ROLES,
    API_SUBDIVISIONS,
    API_ALL_USERS_FOR_FORMS
} from "../../constants/api.constants";
import authHeader from "../../services/auth-header";

export const setRole = data => async dispatch => {
    dispatch(fetchRole(data))
}

export const fetchLoginForm = async ({ username, password }) => {

    return axios.post(API_AUTH_SIGNIN, { username, password })
        .then(response => {
            if (response.data.accessToken) {

                localStorage.setItem("user", JSON.stringify({
                    accessToken: response.data.accessToken,
                    appointment: response.data.appointment,
                    city: response.data.city,
                    id: response.data.id,
                    roles: response.data.roles,
                    username: response.data.username
                }));

                return response.data;
            }
        });
}

export const findAllUsers = async () => {
    return axios.post(API_ALL_USERS, {}, { headers: authHeader() }).then(response => response)
}

export const findAllUsersForForms = async () => {
    return axios.post(API_ALL_USERS_FOR_FORMS, {}).then(response => response)
}

export const findAllRoles = async () => {
    return axios.post(API_ALL_ROLES, {}, { headers: authHeader() }).then(response => response)
}

export const findRoles = async () => {
    return axios.post(API_ROLES, {}, { headers: authHeader() }).then(response => response)
}

export const findSubdivisions = async () => {
    return axios.post(API_SUBDIVISIONS, {}, { headers: authHeader() }).then(response => response)
}