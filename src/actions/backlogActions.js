import axios from "axios"
import {DELETE_PROJECT_TASK, GET_BACKLOG, GET_ERRORS, GET_PROJECT_TASK} from "./types";

export const addProjectTask =
    (backlogId, projectTask, history) => async dispatch =>
    {
        try {
            await axios.post(`http://localhost:8080/api/backlog/${backlogId}`, projectTask)
            history.push(`/projectBoard/${backlogId}`)
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
        } catch (error) {
            dispatch({
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
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

export const getProjectTask = (backlogId, projectTaskId, history) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:8080/api/backlog/${backlogId}/${projectTaskId}`)
        dispatch({
            type: GET_PROJECT_TASK,
            payload: response.data
        })
    }
    catch (error) {
        history.push("/dashboard")
    }
}

export const updateProjectTask = (backlogId, projectTaskId, projectTask, history) => async dispatch => {
    try {
        await axios.patch(`http://localhost:8080/api/backlog/${backlogId}/${projectTaskId}`, projectTask)
        history.push(`/projectBoard/${backlogId}`)

        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    }
    catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

export const deleteProjectTask = (backlogId, projectTaskId) => async dispatch => {
    if (window.confirm(`You are deleting project task ${projectTaskId}, this action cannot be undone`)) {
        await axios.delete(`http://localhost:8080/api/backlog/${backlogId}/${projectTaskId}`)
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: projectTaskId
        })
    }
}