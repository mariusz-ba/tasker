import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Link
} from 'react-router-dom';

import * as AuthActions from '../actions/authActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: ''
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { identifier, password } = this.state;
    this.props.actions.requestLogin({
      identifier,
      password
    });
  }

  onIdentifierChange(e) {
    const identifier = e.target.value;
    this.setState({identifier});
  }

  onPasswordChange(e) {
    const password = e.target.value;
    this.setState({password});
  }

  render() {
    const { errors } = this.props.auth;

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="text-center">
              <img className="logo-image" src="img/favicon.png" />
              <p className="login-header text-center">Sign in to Tasker</p>
            </div>
            <form method="post" className="login-form">

              { errors.form && <div className="alert alert-danger" style={{color: 'red'}}>{errors.form}</div> }

              <div className="form-group">
                <label htmlFor="username">Username or email address</label>
                <input id="username" name="identifier" type="text" className="form-control" value={this.state.identifier} onChange={this.onIdentifierChange.bind(this)} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" className="form-control" value={this.state.password} onChange={this.onPasswordChange.bind(this)} />
                <small className="form-text text-muted"><a href="#">Forgot your password?</a></small>
              </div>
              <button type="submit" className="btn btn-success btn-login" onClick={(e) => this.onSubmit(e)}>Sign in</button>
            </form>
            <div className="login-form text-center">
              New to tasker? <Link to="/register">Create an account</Link>.
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);