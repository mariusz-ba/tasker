import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default class AuthRequiredRoute extends Route {
  render() {
    const { match } = this.state;
    const isAuthenticated = true;
    if(match) {
      // Check session for authentication
      if(isAuthenticated)
        return <this.props.component/>;
      return <Redirect to="/login"></Redirect>
    } else {
      return null;
    }
  }
}
