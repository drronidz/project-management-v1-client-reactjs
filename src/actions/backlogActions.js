import axios from "axios"

export const addProjectTask =
    (backlogId, projectTask, history) => async dispacth =>
    {
        await axios.post(`http://localhost:8080/api/backlog/${backlogId}`, projectTask)
        history.push(`/projectBoard/${backlogId}`)
    }