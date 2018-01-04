import React, { Component } from 'react';
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

import User from '../components/profile/User';

class Profile extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.path}/:id?`} component={User}/>
      </Switch>
    )
  }
}

export default withRouter(Profile);