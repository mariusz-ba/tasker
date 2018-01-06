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
      collapsed: true,
      dropdown: false
    }

    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.logout = this.logout.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setWraperRef = this.setWraperRef.bind(this);
    this.setPicture = this.setPicture.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(e) {
    if(this.wrappedRef && this.picture && !this.wrappedRef.contains(e.target) && !this.picture.contains(e.target)) {
      this.setState({dropdown: false});
    }
  }

  setWraperRef(node) {
    this.wrappedRef = node;
  }

  setPicture(node) {
    this.picture = node;
  }

  toggleCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  toggleDropdown() {
    this.setState({ dropdown: !this.state.dropdown });
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { username, id } = this.props.auth.user;
    const renderNavbar = !(this.props.location.pathname == '/login' || this.props.location.pathname =='/register');

    if(!renderNavbar)
      return null;

    const collapseClass = this.state.collapsed ? 'collapse' : '';

    const userLinks = (
      <ul className="navbar-nav navbar-right">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbar-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.toggleDropdown}>
            <img ref={this.setPicture} src="/img/profile.jpg"/>
          </a>
          <div ref={this.setWraperRef} className="dropdown-menu dropdown-menu-right" aria-labelledby="navbar-dropdown" style={ this.state.dropdown ? {display: 'block'} : {display: 'none'}}>
            <span className="dropdown-header">Signed in as</span>
            <h6 className="dropdown-header"><b>{username}</b></h6>
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" to={`/profile/${id}`} onClick={this.toggleDropdown}>Your profile</Link>
            <Link className="dropdown-item" to="/projects" onClick={this.toggleDropdown}>Your projects</Link>
            <Link className="dropdown-item" to="/teams" onClick={this.toggleDropdown}>Your teams</Link>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">Help</a>
            <a className="dropdown-item" href="#">Settings</a>
            <a className="dropdown-item" href="#" onClick={this.logout}>Sign out</a>
          </div>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav navbar-right">
        <li className="nav-item"><Link className="nav-link" to="/login">Sign in</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/register">Sign up</Link></li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-md">
        <div className="container">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation" onClick={this.toggleCollapse}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand" to="/">Tasker</Link>
          <input className="navbar-search form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <div className={"navbar-collapse " + collapseClass} id="navigation">
            <ul className="navbar-nav mr-auto"></ul>
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