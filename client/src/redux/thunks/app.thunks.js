import axios from "axios";
import { API_FETCH_LOAD_FILES } from "../../constants/api.constants";
import { setLoadedFiles } from "../reducers/app.reducer";

export const handlerLoadFiles = data => async dispatch => {
    await axios.post(API_FETCH_LOAD_FILES, data).then((res) => {
        const urls = []
        for (let i = 0; i < res.data.length; i++) {
            urls.push(res.data[i].filename)
        }
        dispatch(setLoadedFiles(urls));
    })
}
