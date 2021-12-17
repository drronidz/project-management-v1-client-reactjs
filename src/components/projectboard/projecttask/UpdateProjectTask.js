import React, {Component} from 'react';
import {getProjectTask} from "../../../actions/backlogActions";
import {connect} from "react-redux";
import PropTypes from "prop-types"
import {getProject} from "../../../actions/projectActions";

class UpdateProjectTask extends Component {

    constructor() {
        super();

        this.state = {
            id: "",
            projectName: "",
            projectSequence:"",
            summary: "",
            acceptanceCriteria: "",
            status: "",
            priority: "",
            dueDate: "",
            projectIdentifier: "",
            createdAt:"",
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        const { backlogId, projectTaskId } = this.props.match.params
        this.props.getProject(backlogId, this.props.history)
        this.props.getProjectTask(backlogId, projectTaskId, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        const {
            id,
            projectSequence,
            summary,
            acceptanceCriteria,
            status,
            priority,
            dueDate,
            projectIdentifier,
            createdAt
        } = nextProps.projectTask

        const { projectName } = nextProps.project

        this.setState({
            id,
            projectName,
            projectSequence,
            summary,
            acceptanceCriteria,
            status,
            priority,
            dueDate,
            projectIdentifier,
            createdAt
        })
    }

    onChange (event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault()

        const updateProjectTask = {
            id: this.state.id,
            projectSequence: this.state.projectSequence,
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate,
            projectIdentifier: this.state.projectIdentifier,
            createdAt: this.state.createdAt
        }

        console.log(updateProjectTask)
    }

    render() {
        return (
            <div className="add-PBI">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <a href="#" className="btn btn-light">
                                Back to Project Board
                            </a>
                            <h4 className="display-4 text-center">Update or View Project Task</h4>
                            <p className="lead text-center">Project Name: {this.state.projectName}</p>
                            <p className="lead text-center">Project Task ID: {this.state.projectSequence}</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        name="summary"
                                        placeholder="Project Task summary"
                                        value={this.state.summary}
                                        onChange={this.state.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
                                        placeholder="Acceptance Criteria"
                                        name="acceptanceCriteria"
                                        value={this.state.acceptanceCriteria}
                                        onChange={this.state.onChange}
                                    />
                                </div>
                                <h6>Due Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        name="dueDate"
                                        value={this.state.dueDate}
                                        onChange={this.state.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <select
                                        className="form-control form-control-lg"
                                        name="priority"
                                        value={this.state.priority}
                                        onChange={this.state.onChange}
                                    >
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <select
                                        className="form-control form-control-lg"
                                        name="status"
                                        value={this.state.status}
                                        onChange={this.state.onChange}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>
                                <input type="submit" className="btn btn-primary btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UpdateProjectTask.propTypes = {
    getProjectTask: PropTypes.func.isRequired,
    getProject: PropTypes.func.isRequired,
    projectTask: PropTypes.object.isRequired,
    project:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    projectTask: state.backlog.projectTask,
    project: state.project.project
})

export default connect
(
    mapStateToProps,
    {
        getProjectTask,
        getProject
    })
(UpdateProjectTask);