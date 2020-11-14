import baseUrl from "../baseurl";

const host = baseUrl()

const API_URL = `${host}/api`;

export const API_FETCH_LOAD_FILES = `${API_URL}/upload`

export const API_CREATE_RENT_ADS = `${API_URL}/rent/create-ad`