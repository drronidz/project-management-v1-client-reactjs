import axios from "axios"

export const addProjectTask =
    (backlogId, projectTask, history) => async dispacth =>
    {
        await axios.post(`/api/backlog/${backlogId}`, projectTask)
        history.push(`/projectBoard/${backlogId}`)
    }