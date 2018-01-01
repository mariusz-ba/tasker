import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
/**
 * AuthRequiredRoute component allows or not user to enter certain route.
 * Example usage:
 * <AuthRequiredRoute path="/secret" component={SecretComponent} />
 */

class AuthRequiredRoute extends Route {
  render() {
    const { match } = this.state;
    const { isAuthenticated } = this.props.auth;
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


function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default withRouter(connect(
  mapStateToProps
)(AuthRequiredRoute));