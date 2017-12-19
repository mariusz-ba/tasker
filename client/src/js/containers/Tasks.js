import React, { Component } from 'react';
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

import Task from '../components/tasks/Task';
import TasksHome from '../components/tasks/TasksHome'

class Tasks extends Component {
    render() {
    return (
      <Switch>
        <Route exact path={this.props.match.path} component={TasksHome}/>
        <Route path={`${this.props.match.path}/:id`} component={Task}/>
      </Switch>
    )
  }
}

export default withRouter(Tasks);