import DiagramService from "../../services/diagram.service";
import { DIAGRAM_FAIL, DIAGRAM_SUCCESS, SET_MESSAGE } from "./types";

export const findDiagram = (filters) => (dispatch) => {
    return DiagramService.findDiagram(filters).then(
        (response) => {
            dispatch({
                type: DIAGRAM_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve(response);
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: DIAGRAM_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};