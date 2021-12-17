import axios from "axios"
import {GET_ERRORS} from "./types";

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