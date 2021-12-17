import React, {Component} from 'react';
import ProjectTask from "./projecttask/ProjectTask";

class Backlog extends Component {
    render() {
        const {projectTasks} = this.props

        let todoTasks = []
        let inProgressTasks = []
        let doneTasks = []

        projectTasks.forEach(projectTask => {
            const {status} = projectTask
            switch (status) {
                case "TO_DO": todoTasks.push(projectTask)
                    break
                case "IN_PROGRESS": inProgressTasks.push(projectTask)
                    break
                case "DONE": doneTasks.push(projectTask)
                    break
            }
        })

        const projectTasksTodo = todoTasks.map(taskItem =>
            <ProjectTask key={taskItem.id} projectTask={taskItem} />)

        const projectTasksInProgress = inProgressTasks.map(taskItem =>
            <ProjectTask key={taskItem.id} projectTask={taskItem} />)

        const projectTasksDone = doneTasks.map(taskItem =>
            <ProjectTask key={taskItem.id} projectTask={taskItem} />)

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-secondary text-white">
                                <h3>TO DO</h3>
                            </div>
                        </div>
                        {projectTasksTodo}
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-primary text-white">
                                <h3>In Progress</h3>
                            </div>
                        </div>
                        {projectTasksInProgress}
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-success text-white">
                                <h3>Done</h3>
                            </div>
                        </div>
                        {projectTasksDone}
                    </div>
                </div>
            </div>
        );
    }
}

export default Backlog;