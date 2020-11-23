import { fetchRole } from "../reducers/user.reducer";
import axios from "axios";
import { API_AUTH_SIGNIN } from "../../constants/api.constants";

export const setRole = data => async dispatch => {
    dispatch(fetchRole(data))
}

export const fetchLoginForm = ({ email, password }) => async dispatch => {

    axios.post(API_AUTH_SIGNIN, { email, password })
        .then(response => {
            if (response.data.accessToken) {

                localStorage.setItem("user", JSON.stringify({
                    accessToken: response.data.accessToken,
                    email: response.data.email,
                    id: response.data.id,
                    roles: response.data.roles,
                    username: response.data.username
                }));
                localStorage.setItem("votes", JSON.stringify(response.data.votes));

                return response.data;
            }
        });
}