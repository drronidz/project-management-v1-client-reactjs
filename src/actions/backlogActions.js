import axios from "axios"
import {GET_BACKLOG, GET_ERRORS} from "./types";

export const addProjectTask =
    (backlogId, projectTask, history) => async dispacth =>
    {
        try {
            await axios.post(`http://localhost:8080/api/backlog/${backlogId}`, projectTask)
            history.push(`/projectBoard/${backlogId}`)
            dispacth({
                type: GET_ERRORS,
                payload: {}
            })
        } catch (error) {
            dispacth({
                type: GET_ERRORS,
                payload: error.response.data
            })
        }
    }
export const getBacklog = backlogId => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:8080/api/backlog/${backlogId}`)
        dispatch({
            type: GET_BACKLOG,
            payload: response.data
        })
    }
    catch (error) {

    }
}