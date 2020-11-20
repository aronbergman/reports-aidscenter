import axios from 'axios'
import { API_CREATE_VIDEO, API_FETCH_OFFSET_VIDOES, API_VIDEO_FIRST_LIST } from "../../constants/api.constants";
import authHeader from "../../services/auth-header";
import { setVideos, setFirstVideos, isLoading } from "../reducers/video.reducer";

export const createVideoThunks = (data) => async dispatch => {
    const response = await axios.post(API_CREATE_VIDEO, data, {headers: authHeader()})
    return response.data;
}

export const fetchFirstToStore = () => async dispatch => {
    dispatch(isLoading(true));
    const response = await axios.post(API_VIDEO_FIRST_LIST)
    return dispatch(setFirstVideos(response.data));
}

export const fetchOffsetToStore = (data) => async dispatch => {
    const response = await axios.post(API_FETCH_OFFSET_VIDOES, data)
    return dispatch(setVideos(response.data));
}