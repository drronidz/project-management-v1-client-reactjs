import React, {Component} from 'react';
import ProjectItem from "./project/ProjectItem";
import CreateProjectButton from "./project/CreateProjectButton";
import { connect } from "react-redux"
import PropTypes from "prop-types";
import { getProjects } from "../actions/projectActions";


class Dashboard extends Component {
    componentDidMount() {
        this.props.getProjects()
    }

    render() {
        const { projects } = this.props.project
        console.log(this.props)
        return (
            <div className="projects">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Projects</h1>
                            <br/>
                            <CreateProjectButton/>
                            <br/>
                            <hr/>
                            {
                                projects.map(project => (
                                    <ProjectItem key={project.id}
                                                 projectId={project.id}
                                                 projectIdentifier={project.projectIdentifier}
                                                 projectName={project.projectName}
                                                 projectDescription={project.description}
                                                 projectCreatedAt={project.createdAt}
                                                 projectStartDate={project.startDate}
                                                 projectEndDate={project.endDate}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    project: PropTypes.object.isRequired,
    getProjects: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    project: state.project
})

export default connect(
    mapStateToProps,
    { getProjects })
(Dashboard);