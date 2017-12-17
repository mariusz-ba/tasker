import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TasksActions from '../../actions/tasksActions';

class TasksTable extends Component {

  constructor(props) {
    super(props);

    this.onUpdate = this.onUpdate.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchTasks({ completed: false });
  }

  onUpdate(e, id) {
    e.preventDefault();
    console.log(id);
  }

  onDelete(e, id) {
    e.preventDefault();
    console.log(id);
    this.props.actions.deleteTask(id);
  }

  render() {
    const { tasks } = this.props;
    
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Completed</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
          tasks.map((task, index) => (
            <tr key={task._id ? task._id : index}>
              <td>{task._id}</td>
              <td>{task.description}</td>
              <td>{task.completed ? 'Completed' : 'Not completed'}</td>
              <td>
                <a className="btn btn-primary" href="#" onClick={(e) => this.onUpdate(e, task._id)}>Edit</a>
                <a className="btn btn-danger" href="#" onClick={(e) => this.onDelete(e, task._id)}>Delete</a>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    )
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TasksActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksTable);