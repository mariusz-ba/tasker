import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as SessionActions from '../actions/sessionActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.actions.requestLogin({
      username,
      password
    });
  }

  onUsernameChange(e) {
    const username = e.target.value;
    this.setState({username});
  }

  onPasswordChange(e) {
    const password = e.target.value;
    this.setState({password});
  }

  render() {
    return (
      <div>
        <h1>Login page</h1>
        <form method="post">
          <label>Username: <input type="text" name="username" placeholder="Type your username" value={this.state.username} onChange={this.onUsernameChange.bind(this)}/></label>
          <label>Username: <input type="password" name="password" placeholder="Type your password" value={this.state.password} onChange={this.onPasswordChange.bind(this)}/></label>
          <button onClick={(e) => this.onSubmit(e)}>Sign in</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    session: state.session
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SessionActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);