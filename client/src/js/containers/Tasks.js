import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as TasksActions from '../actions/tasksActions';

class Tasks extends Component {

  componentDidMount() {
    this.props.actions.fetchTasks({completed: false});
  }

  render() {
    return (
      <div>
        <h1>Things need to be done!</h1>
        {
          this.props.tasks.map(task =>
            <div key={task.id} style={{border: '1px solid black', marginBottom: '10px', padding: '10px'}}>
              <h2>{task.text}</h2>
              <p>{ task.completed ? 'Completed' : 'Not completed' }</p>
            </div>
          )
        }
      </div>
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
)(Tasks);
