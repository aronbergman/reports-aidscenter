import axios from 'axios'
import { API_CREATE_VIDEO } from "../../constants/api.constants";
import authHeader from "../../services/auth-header";

export const createVideoThunks = (data) => async dispatch => {
    const response = await axios.post(API_CREATE_VIDEO, data, {headers: authHeader()})
    return response.data;
}