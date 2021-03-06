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
import Profile from './containers/Profile';
import Projects from './containers/Projects';
import Register from './containers/Register';
import Teams from './containers/Teams';

import Settings from './containers/Settings';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <AuthRequiredRoute path="/profile" component={Profile} />
          <AuthRequiredRoute path="/projects" component={Projects}/>
          <AuthRequiredRoute path="/settings" component={Settings}/>
          <AuthRequiredRoute path="/teams" component={Teams}/>
        </div>
      </Router>
    )
  }
}