import axios from 'axios';
import authHeader from './auth-header';
import baseUrl from '../baseurl';
import { API_VIDEO_FIRST_LIST } from "../constants/api.constants";

class VideoService {
    getFirstListVideos() {
        return axios.post(API_VIDEO_FIRST_LIST);
    }
}

export default new VideoService()