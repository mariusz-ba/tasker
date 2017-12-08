import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div>
        <h1>Login page</h1>
        <form method="post">
          <label>Username: <input type="text" name="username" placeholder="Type your username"/></label>
          <label>Username: <input type="password" name="password" placeholder="Type your password"/></label>
          <button type="submit">Sign in</button>
        </form>
      </div>
    )
  }
}
