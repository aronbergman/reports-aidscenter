import baseUrl from "../baseurl";

const host = baseUrl()

const API_URL = `${host}/api`;

export const API_FETCH_LOAD_FILES = `${API_URL}/upload`

export const API_VIDEO_FIRST_LIST = `${API_URL}/video/first-list`
export const API_FETCH_OFFSET_VIDOES = `${API_URL}/video/offset`
export const API_FETCH_UP_VIDEO_COUNT = `${API_URL}/video/count`
export const API_FETCH_VOTE_VIDEO = `${API_URL}/video/vote`
export const API_UPLOAD_VIDEO = `${API_URL}/upload/video`
export const API_CREATE_VIDEO = `${API_URL}/video/create`

export const API_AUTH_SIGNIN = `${API_URL}/auth/signin`
export const API_ALL_USERS = `${API_URL}/user/all-users-data`
export const API_ALL_ROLES = `${API_URL}/user/all-roles-data`

export const API_ROLES = `${API_URL}/roles`
export const API_SUBDIVISIONS = `${API_URL}/subdivisions`