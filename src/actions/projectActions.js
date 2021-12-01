import axios from "axios"
import {GET_ERRORS, GET_PROJECT, GET_PROJECTS} from "./types";

const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
};

export const createProject = (project, history) => async dispatch => {
    try {
        const response = await axios.post("http://localhost:8080/api/project", project)
        history.push("/dashboard")
    }
    catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

export const getProjects = () => async dispatch => {
    const response = await axios.get("http://localhost:8080/api/project/all")
    dispatch({
        type: GET_PROJECTS,
        payload: response.data
    })
}

export const getProject = (id, history) => async dispatch => {
    const response = await axios.get(`http://localhost:8080/api/project/${id}`)
    dispatch({
        type: GET_PROJECT,
        payload: response.data
    })
}