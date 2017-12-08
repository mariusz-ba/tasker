import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import axios from 'axios';

// Components
import Navbar from './components/navigation/Navbar';

import AuthRequiredRoute from './components/auth/AuthRequiredRoute';

// Containers
import Home from './containers/Home';
import Login from './containers/Login';
import Tasks from './containers/Tasks';

export default class App extends Component {
  state = {users: []}

  fetch() {
    axios.get('/api/users')
      .then(res => {
        if(res.data.error)
          console.log(res.data.error)
        else
          this.setState({ users: res.data })
      })
      .catch(err => {
        console.log(err);
      })
  }

  login() {
    axios.post('/api/login', {
      action: 'LOGIN',
      username: 'mariusz',
      password: 'zaq1@WSX'
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  logout() {
    axios.post('/api/login', {
      action: 'LOGOUT'
    })
  }

/*  render() {
    return (
      <div>
        <h1>Application</h1>
        <h2>Users</h2>
        <button onClick={() => this.fetch()}>Fetch</button>
        <button onClick={() => this.login()}>Login</button>
        <button onClick={() => this.logout()}>Logout</button>
        {
          this.state.users.map((user) =>
            <div key={user.id}>{user.username}</div>
          )
        }
      </div>
    )
  } */
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Home} />
          <AuthRequiredRoute path="/tasks" component={Tasks} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    )
  }
}
