import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser, fetchUsers } from '../../actions/usersActions';
import { fetchFriends } from '../../actions/friendsActions';
import { Link, withRouter } from 'react-router-dom';

import { keys } from 'lodash';

import Tabs from './tabs/Tabs';
import Friends from './pages/Friends';
import Teams from './pages/Teams';
import Projects from './pages/Projects';

import axios from 'axios';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    }
    this.id = this.props.match.params.id ? this.props.match.params.id : this.props.auth.user._id;
  }
  componentWillMount() {
    this.props.fetchUser(this.id);
    this.getProjects(this.id);
  }
  componentDidUpdate(prevProps) {
    if(this.props.location !== prevProps.location)
      this.onRouteChanged();
  }
  onRouteChanged() {
    const id = this.props.match.params.id ? this.props.match.params.id : this.props.auth.user._id;
    if(id !== this.id) {
      this.id = id;
      this.props.fetchUser(this.id);
      this.getProjects(this.id);
    }
  }
  getProjects = (id) => {
    axios.get(`/api/projects`, { params: { user: id }})
    .then(
      response => this.setState({ projects: response.data }),
      error => console.log('An error occurred: ', error)
    )
  }
  render() {
    const { users } = this.props.users;
    const user = users[this.id];
    const teams = user ? user.teams : [];
    const friends = (user && user.friends) ? keys(user.friends) : [];

    return (
      <div>
        <div className="container">
          <div className="row profile-row">
            <div className="col-md-4 text-center">
              <img className="profile-picture" src="/img/profile.jpg" alt="Profile picture"/>
            </div>
            <div className="col-md-8">
              <div className="profile-header">
                <h1>
                  {user && user.username}&nbsp;
                  <small>
                    { user && user._id === this.props.auth.user._id &&
                      (<Link className="btn btn-sm btn-dark" to="/settings">Edit</Link>)
                    }
                  </small>
                </h1>
              </div>
              <ul className="profile-overview">
                <li><b>{this.state.projects.length}</b> projects</li>
                <li><b>{teams && teams.length}</b> teams</li>              
                <li><b>{friends && friends.length}</b> friends</li>              
              </ul>
              <div className="profile-description">
                <h6>{user && user.fullName && `${user.fullName} · `}<span>Last Web Developer you will ever need</span></h6>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <Tabs tabs={[
                {name: 'Friends', component: <Friends user={this.id}/>}, 
                {name: 'Teams', component: <Teams teams={teams}/>}, 
                {name: 'Projects', component: <Projects projects={this.state.projects}/>}
              ]}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth, users }) {
  return { auth, users }
};

export default withRouter(connect(mapStateToProps, { fetchUser, fetchUsers, fetchFriends })(User));