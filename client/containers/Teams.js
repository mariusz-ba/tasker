import React, { Component } from 'react';
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

import EditTeam from '../components/teams/EditTeam';
import NewTeam from '../components/teams/NewTeam';
import TeamsHome from '../components/teams/TeamsHome';
import Team from '../components/teams/Team';

class Teams extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={this.props.match.path} component={TeamsHome}/>
        <Route path={`${this.props.match.path}/new`} component={NewTeam}/>
        <Route path={`${this.props.match.path}/:id/edit`} component={EditTeam}/>
        <Route path={`${this.props.match.path}/:id`} component={Team}/>
      </Switch>
    )
  }
}

export default withRouter(Teams);