import React, { Component } from 'react';
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

import EditProject from '../components/projects/EditProject';
import NewProject from '../components/projects/NewProject';
import Project from '../components/projects/Project';
import ProjectsHome from '../components/projects/ProjectsHome';
import Task from '../components/tasks/Task';

class Projects extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={this.props.match.path} component={ProjectsHome}/>
        <Route path={`${this.props.match.path}/new`} component={NewProject}/>
        <Route path={`${this.props.match.path}/:id/tasks/:task`} component={Task}/>
        <Route path={`${this.props.match.path}/:id/edit`} component={EditProject}/>
        <Route path={`${this.props.match.path}/:id`} component={Project}/>
      </Switch>
    )
  }
}

export default withRouter(Projects);