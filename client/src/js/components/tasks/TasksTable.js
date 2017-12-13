import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TasksActions from '../../actions/tasksActions';

class TasksTable extends Component {

  componentDidMount() {
    this.props.actions.fetchTasks({ completed: false });
  }

  render() {
    const { tasks } = this.props;
    
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Completed</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
          tasks.map(task => (
            <tr key={task.id}>
              <td>{task.text}</td>
              <td>{task.completed ? 'Completed' : 'Not completed'}</td>
              <td>Actions</td>
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