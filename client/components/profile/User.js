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
    console.log('getUserId()', id);

    return (
      <div>
        <div className="profile-container">
          <div className="container">
            <div className="row" style={{marginTop: 0}}>
              <div className="col">
                <div className="profile-bg"></div>
                <div className="profile-user">
                  <img className="profile-picture" src="https://scontent-dft4-2.cdninstagram.com/t51.2885-19/22277616_340453526415691_8667380059302002688_n.jpg" alt="image"/>
                  <div className="profile-description"><h5>{user && user.username}</h5></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <Tabs tabs={[
                {name: 'About'},
                {name: 'Teams', component: <Teams teams={teams}/>}, 
                {name: 'Friends', component: <Friends user={user && user._id} friends={values(friends)}/>}, 
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