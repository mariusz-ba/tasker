import React, { Component } from 'react';
import {
  Link,
  withRouter
} from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        password: '',
        confirm: '',
        email: ''
      },
      errors: {},
      info: '',
      created: false
    }

    this.onUsernameChanged = this.onUsernameChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onConfirmChanged = this.onConfirmChanged.bind(this);
    this.onEmailChanged = this.onEmailChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate() {
    if(this.state.created)
      this.props.history.push('/login');
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
      if(data) self.setState({ errors: {}, info: data.info, created: true })
    })
  }

  render() {
    const { username, password, confirm, email } = this.state.user;
    const { errors } = this.state;

    const usernameValid = errors.username ? 'is-invalid' : '';
    const emailValid = errors.email ? 'is-invalid' : '';
    const confirmValid = password == confirm ? '' : 'is-invalid';

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="text-center">
              <img className="logo-image" src="img/favicon.png" />
              <p className="login-header text-center">Create an account</p>
            </div>
            <form method="post" className="login-form">
              { this.state.info && <div className="alert alert-success" style={{color: 'green'}}>{this.state.info}</div> }
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input id="username" name="username" type="text" className={"form-control " + usernameValid} value={username} onChange={this.onUsernameChanged}/>
                { errors.username &&
                  <div className="invalid-feedback">
                    { errors.username }
                  </div>
                }
              </div>
              <div className="form-group">
                <label htmlFor="email">E-Mail address</label>
                <input id="email" name="email" type="email" className={"form-control " + emailValid} value={email} onChange={this.onEmailChanged}/>
                { errors.email &&
                  <div className="invalid-feedback">
                    { errors.email }
                  </div>
                }
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" className="form-control" value={password} onChange={this.onPasswordChanged}/>
              </div>
              <div className="form-group">
                <label htmlFor="confirm">Confirm password</label>
                <input id="confirm" name="confirm" type="password" className={"form-control " + confirmValid} value={confirm} onChange={this.onConfirmChanged}/>
                { password != confirm ? <div className="invalid-feedback">Incorrect password</div> : null }
              </div>
              <button type="submit" className="btn btn-success btn-login" onClick={this.onSubmit}>Sign up</button>
            </form>
            <div className="login-form text-center">
              Already have an account? <Link to="/login">Sign in</Link>.
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Register);