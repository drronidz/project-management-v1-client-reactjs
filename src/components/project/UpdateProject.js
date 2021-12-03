import React, {Component} from 'react';
import {createProject, getProject} from "../../actions/projectActions";
import PropTypes from "prop-types";
import { connect } from "react-redux"
import classnames from "classnames"

class UpdateProject extends Component {
    // Set state
    constructor() {
        super();
        this.state = {
            id : "",
            projectName: "",
            projectIdentifier: "",
            description: "",
            startDate: "",
            endDate: "",
            errors: {}
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }

        const {
            id,
            projectName,
            projectIdentifier,
            description,
            startDate,
            endDate
        } = nextProps.project

        this.setState({
            id,
            projectName,
            projectIdentifier,
            description,
            startDate,
            endDate
        })

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        const { projectId } = this.props.match.params
        this.props.getProject(projectId, this.props.history)
    }

    onChange(event) {
        this.setState({ [event.target.name] : event.target.value })
    }

    onSubmit(event) {
        event.preventDefault()

        const updateProject = {
            id : this.state.id,
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
        }

        this.props.createProject(updateProject, this.props.history)
    }

    render() {
        const {errors} = this.state
        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create / Edit Project form</h5>
                            <hr/>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={!errors.projectName
                                            ? "form-control form-control-lg "
                                            : "form-control form-control-lg is-invalid"}
                                        placeholder="Project Name"
                                        name="projectName"
                                        value={this.state.projectName}
                                        onChange={this.onChange}
                                    />
                                    { errors.projectName
                                    && ( <div className="invalid-feedback">{errors.projectName}</div>) }
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={!errors.projectIdentifier
                                            ? "form-control form-control-lg "
                                            : "form-control form-control-lg is-invalid"}
                                        placeholder="Unique ID"
                                        name="projectIdentifier"
                                        value={this.state.projectIdentifier}
                                        onChange={this.onChange}
                                        disabled
                                    />
                                    { errors.projectIdentifier
                                    && ( <div className="invalid-feedback">{errors.projectIdentifier}</div>) }
                                </div>
                                <div className="form-group">
                                    <textarea
                                        className={!errors.description
                                            ? "form-control form-control-lg "
                                            : "form-control form-control-lg is-invalid"}
                                        placeholder="Project Description"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.onChange}
                                    />
                                    {errors.description
                                    && ( <div className="invalid-feedback">{errors.description}</div>) }
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        name="startDate"
                                        value={this.state.startDate}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        name="endDate"
                                        value={this.state.endDate}
                                        onChange={this.onChange}
                                    />
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

UpdateProject.propTypes = {
    getProject: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    project: state.project.project,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { getProject, createProject }
)(UpdateProject);