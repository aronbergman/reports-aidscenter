import axios from 'axios'
import {
    API_CREATE_VIDEO,
    API_FETCH_OFFSET_VIDOES,
    API_FETCH_UP_VIDEO_COUNT,
    API_VIDEO_FIRST_LIST,
    API_FETCH_VOTE_VIDEO
} from "../../constants/api.constants";
import authHeader from "../../services/auth-header";
import { setVideos, setFirstVideos, isLoading, setSingleVideo } from "../reducers/video.reducer";

export const createVideoThunks = data => async () => {
    const response = await axios.post(API_CREATE_VIDEO, data, { headers: authHeader() })
    return response.data;
}

export const fetchFirstToStore = () => async dispatch => {
    dispatch(isLoading(true));
    const response = await axios.post(API_VIDEO_FIRST_LIST)
    return dispatch(setFirstVideos(response.data));
}

export const fetchOffsetToStore = data => async dispatch => {
    const response = await axios.post(API_FETCH_OFFSET_VIDOES, data)
    return dispatch(setVideos(response.data));
}

export const fetchUpVideoCount = data => async dispatch => {
    dispatch(isLoading(true));
    const response = await axios.post(API_FETCH_UP_VIDEO_COUNT, data)
    dispatch(setSingleVideo(response.data))

}

export const fetchVoteVideo = data => async dispatch => {
    const response = await axios.post(API_FETCH_VOTE_VIDEO, data)
    console.log(data)
    return dispatch(setVideos(response.data.video))
}