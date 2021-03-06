import React, {Component} from 'react';
import {getProjectTask, updateProjectTask} from "../../../actions/backlogActions";
import {connect} from "react-redux";
import PropTypes from "prop-types"
import {getProject} from "../../../actions/projectActions";
import {Link} from "react-router-dom";

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

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onChange (event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault()

        const UpdateProjectTask = {
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

        // console.log(updateProjectTask)
        // this.props.history.push(`/projectBoard/${this.state.projectIdentifier}`)
        this.props.updateProjectTask(
            this.state.projectIdentifier,
            this.state.projectSequence, UpdateProjectTask,
            this.props.history)
    }

    render() {
        const { errors } = this.state

        return (
            <div className="add-PBI">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to={`/projectBoard/${this.state.projectIdentifier}`} className="btn btn-light">
                                Back to Project Board
                            </Link>
                            <h4 className="display-4 text-center">Update or View Project Task</h4>
                            <p className="lead text-center">Project Name: {this.state.projectName}</p>
                            <p className="lead text-center">Project Task ID: {this.state.projectSequence}</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={!errors.summary
                                            ? "form-control form-control-lg "
                                            : "form-control form-control-lg is-invalid"}
                                        name="summary"
                                        placeholder="Project Task summary"
                                        value={this.state.summary}
                                        onChange={this.onChange}
                                    />
                                    {
                                        errors.summary && (
                                            <div className="invalid-feedback">
                                                {errors.summary}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <textarea
                                        className={!errors.acceptanceCriteria
                                            ? "form-control form-control-lg "
                                            : "form-control form-control-lg is-invalid"}
                                        placeholder="Acceptance Criteria"
                                        name="acceptanceCriteria"
                                        value={this.state.acceptanceCriteria}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <h6>Due Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className={!errors.dueDate
                                            ? "form-control form-control-lg "
                                            : "form-control form-control-lg is-invalid"}
                                        name="dueDate"
                                        value={this.state.dueDate}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <select
                                        className={!errors.priority
                                            ? "form-control form-control-lg "
                                            : "form-control form-control-lg is-invalid"}
                                        name="priority"
                                        value={this.state.priority}
                                        onChange={this.onChange}
                                    >
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <select
                                        className={!errors.status
                                            ? "form-control form-control-lg "
                                            : "form-control form-control-lg is-invalid"}
                                        name="status"
                                        value={this.state.status}
                                        onChange={this.onChange}
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
    updateProjectTask: PropTypes.func.isRequired,
    projectTask: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    projectTask: state.backlog.projectTask,
    project: state.project.project,
    errors: state.errors
})

export default connect
(
    mapStateToProps,
    {
        getProjectTask,
        getProject,
        updateProjectTask
    })
(UpdateProjectTask);