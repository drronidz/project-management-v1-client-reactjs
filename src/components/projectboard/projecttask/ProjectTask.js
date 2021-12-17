import React, {Component} from 'react';

class ProjectTask extends Component {
    render() {
        const {
            acceptanceCriteria, createdAt,
            dueDate, id, priority,
            projectIdentifier, projectSequence,
            status, summary, updatedAt} = this.props.projectTask

        let priorityDescription
        let priorityClass

        switch (priority) {
            case 1: {
                priorityDescription = "HIGH"
                priorityClass = "bg-danger text-light"
            }
            break;
            case 2: {
                priorityDescription = "MEDIUM"
                priorityClass = "bg-warning text-light"
            }
            break
            case 3: {
                priorityDescription = "LOW"
                priorityClass = "bg-info text-light"
            }
            break
        }

        return (
        <div className="card mb-1 bg-light">
            <div className={`card-header text-primary ${priorityClass}`}>
                ID: {projectSequence} -- Priority: {priorityDescription}
            </div>
            <div className="card-body bg-light">
                <h5 className="card-title">{summary}</h5>
                <p className="card-text text-truncate ">
                    {acceptanceCriteria}
                </p>
                <a href="#" className="btn btn-primary">
                    View / Update
                </a>
                <button className="btn btn-danger ml-4">
                    Delete
                </button>
            </div>
        </div>
        );
    }
}

export default ProjectTask;