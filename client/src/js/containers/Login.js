import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
      <div>
        <h1>Login page</h1>

        { errors.form && <div className="alert alert-danger" style={{color: 'red'}}>{errors.form}</div> }

        <form method="post">
          <label>Username or email: <input type="text" name="identifier" placeholder="Type your username or password" value={this.state.identifier} onChange={this.onIdentifierChange.bind(this)}/></label>
          <label>Password: <input type="password" name="password" placeholder="Type your password" value={this.state.password} onChange={this.onPasswordChange.bind(this)}/></label>
          <button onClick={(e) => this.onSubmit(e)}>Sign in</button>
        </form>
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