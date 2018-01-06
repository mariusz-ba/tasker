import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser, fetchUsers } from '../../actions/usersActions';
import { fetchFriends } from '../../actions/friendsActions';
import { withRouter } from 'react-router-dom';

import { values } from 'lodash';

import Tabs from '../tabs/Tabs';
import Friends from './pages/Friends';

const Teams = (props) => {
  return values(props.teams).map(team => (
    <div key={team._id} className="col-md-6">
      <div className="card" style={{background: 'rgba(0,0,0,.03)', padding: 10}}>
        <h6>{team.name}</h6>
        <p className="badge badge-primary">{team._id}</p>
      </div>
    </div>
  ))
};

class User extends Component {
  constructor(props) {
    super(props);
  }
  getUserId = () => {
    const { id } = this.props.match.params;
    const auth_id = this.props.auth.user.id;
    const user = id ? id : auth_id;
    return user ? user : null;
  }
  componentWillMount() {
    const id = this.getUserId();
    if(id)
      this.props.fetchUser(id);
  }
  render() {
    const id = this.getUserId();
    const { users } = this.props.users;
    const user = users[id];
    const teams = user ? user.teams : [];
    const friends = user ? user.friends : {};

    return (
      <div>
        <div className="container">
          <div className="row profile-row">
            <div className="col-md-4 text-center">
              <img className="profile-picture" src="/img/profile.jpg" alt="Profile picture"/>
            </div>
            <div className="col-md-8">
              <div className="profile-header">
                <h1>{user && user.username}</h1>
              </div>
              <ul className="profile-overview">
                <li><b>7</b> projects</li>              
                <li><b>2</b> teams</li>              
                <li><b>20</b> friends</li>              
              </ul>
              <div className="profile-description">
                <h6>Mariusz Baran ·<span> Last Web Developer you will ever need</span></h6>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <Tabs tabs={[
                {name: 'Friends', component: <Friends user={id} friends={values(friends)}/>}, 
                {name: 'Teams', component: <Teams teams={teams}/>}, 
                {name: 'Projects', component: <Teams teams={teams}/>}
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