import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        password: '',
        confirm: '',
        email: ''
      },
      errors: {}
    }

    this.onUsernameChanged = this.onUsernameChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onConfirmChanged = this.onConfirmChanged.bind(this);
    this.onEmailChanged = this.onEmailChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onUsernameChanged(e) {
    this.setState({ user: { ...this.state.user, username: e.target.value }});
  }

  onPasswordChanged(e) {
    this.setState({ user: { ...this.state.user, password: e.target.value }});
  }

  onConfirmChanged(e) {
    this.setState({ user: { ...this.state.user, confirm: e.target.value }});
  }

  onEmailChanged(e) {
    this.setState({ user: { ...this.state.user, email: e.target.value }});
  }

  onSubmit(e) {
    e.preventDefault();

    let self = this;

    axios.post('/api/users', this.state.user)
    .then(
      response => response.data,
      error => self.setState({ errors: error.response.data.errors })
    )
    .then(data => {
      if(data) self.setState({ errors: {} })
    })
  }

  render() {
    const { username, password, confirm, email } = this.state.user;
    console.log(password + ' = ' + confirm);
    const { errors } = this.state;
    return (
      <div>
        <form method="post" action="/api/users">
          <label>Username: <input type="text" name="username" value={username} onChange={this.onUsernameChanged}/></label>
          { errors.username && <p>This username already exists in database</p> }
          <label>Password: <input type="text" name="password" value={password} onChange={this.onPasswordChanged}/></label>
          <label>Confirm password: <input type="text" name="confirm" value={confirm} onChange={this.onConfirmChanged}/></label>
          { password != confirm ? <p>Incorrect password</p> : null }
          <label>E-Mail: <input type="email" name="email" value={email} onChange={this.onEmailChanged}/></label>
          { errors.email && <p>This email already exists in database</p> }
          <button type="submit" onClick={this.onSubmit}>Register</button>
        </form>
      </div>
    )
  }
}