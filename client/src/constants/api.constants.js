import baseUrl from "../baseurl";

const host = baseUrl()

const API_URL = `${host}/api`;

export const API_FETCH_LOAD_FILES = `${API_URL}/upload`

export const API_VIDEO_FIRST_LIST = `${API_URL}/video/first-list`
export const API_FETCH_OFFSET_VIDOES = `${API_URL}/video/offset`
export const API_UPLOAD_VIDEO = `${API_URL}/upload/video`
export const API_CREATE_VIDEO = `${API_URL}/video/create`
