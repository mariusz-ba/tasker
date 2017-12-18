import React, { Component } from 'react';
import { 
  Link,
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    }
  }

  toggleCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const renderNavbar = !(this.props.location.pathname == '/login' || this.props.location.pathname =='/register');

    if(!renderNavbar)
      return null;

    const collapseClass = this.state.collapsed ? 'collapse' : '';

    const userLinks = (
      <ul className="navbar-nav navbar-right">
        <li className="nav-item"><a className="nav-link" href="#"><i className="fa fa-plus" aria-hidden="true"></i></a></li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbar-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Profile
          </a>
          <div className="dropdown-menu dropdown-menu-right dropdown" aria-labelledby="navbar-dropdown">
            <span className="dropdown-header">Signed in as</span>
            <h6 className="dropdown-header"><b>mariusz-ba</b></h6>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">Your profile</a>
            <a className="dropdown-item" href="#">Your tasks</a>
            <a className="dropdown-item" href="#">Your friends</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">Help</a>
            <a className="dropdown-item" href="#">Settings</a>
            <a className="dropdown-item" href="#">Sign out</a>
          </div>
        </li>
        <li className="nav-item"><a className="nav-link" href="#" onClick={this.logout.bind(this)}>Sign out</a></li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav navbar-right">
        <li className="nav-item"><Link className="nav-link" to="/login">Sign in</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/register">Sign up</Link></li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation" onClick={this.toggleCollapse.bind(this)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand" to="/">Tasker</Link>

          <div className={"navbar-collapse " + collapseClass} id="navigation">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/tasks">Tasks</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            </ul>
            { isAuthenticated ? userLinks : guestLinks }
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default withRouter(connect(mapStateToProps, { logout })(Navbar));