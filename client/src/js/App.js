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