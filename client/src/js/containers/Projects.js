import React, { Component } from 'react';
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

import NewProject from '../components/projects/NewProject';
import Project from '../components/projects/Project';
import ProjectsHome from '../components/projects/ProjectsHome';

class Projects extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={this.props.match.path} component={ProjectsHome}/>
        <Route path={`${this.props.match.path}/new`} component={NewProject}/>
        <Route path={`${this.props.match.path}/:id`} component={Project}/>
      </Switch>
    )
  }
}

export default withRouter(Projects);