import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchFriends, addFriend, confirmFriend, deleteFriend } from '../../../actions/friendsActions';
import Card from '../../ui/Card';
import { values } from 'lodash';

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }
  componentDidMount() {
    console.log('Fetching friends for user: ', this.props.user);
    this.props.fetchFriends(this.props.user);
  }
  componentDidUpdate(prevProps) {
    if(this.props.user !== prevProps.user)
      this.props.fetchFriends(this.props.user);
  }
  onUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  }
  onAcceptInvite = (friend, friend_data) => {
    this.props.confirmFriend(this.props.user, friend);
  }
  onDeleteFriend = (friend, friend_data) => {
    this.props.deleteFriend(this.props.user, { friendship_id: friend, friend_id: friend_data });
  }
  onAddFriend = () => {
    console.log('Add friend: [user id]');
    this.props.addFriend(this.props.user, this.state.username);
  }
  render() {
    const user = this.props.users.users[this.props.user];
    let friends = [];
    if(user)
      friends = user.friends;

    const self = user && this.props.auth.user._id == user._id;

    return (
      <div className="col-md-12">
        { self &&
          <div className="row">
            <div className="col">
              <div className="input-group mb-2">
                <div className="input-group-append">  
                  <button className="btn btn-light" onClick={this.onAddFriend} style={{borderRadius: 0}}>Add friend</button>
                </div>
                <input name="username" className="form-control" placeholder="user ID!" type="text" value={this.state.username} onChange={this.onUsernameChange}/>
              </div>
            </div>
          </div>
        }
        <div className="row"> 
        { friends && 
          values(friends).map(friend => {
            const confirmed = friend.confirm1 === friend.confirm2;
            const secondaryText = self ? (confirmed ? '' : 'Not confirmed') : '';

            let friend_data;
            if(user && friend.user1 && user._id == friend.user1._id)
              friend_data = friend.user2;
            else
              friend_data = friend.user1;

            return (
              <div key={friend._id} className="col-md-6">
                <Card
                  image="/img/profile.jpg"
                  primaryText={friend_data.username}
                  secondaryText={secondaryText}
                  clickable={false}>
                  { self && (confirmed === true || user._id === friend.user1._id) &&
                    <button className="btn btn-sm btn-danger" onClick={() => this.onDeleteFriend(friend._id, friend_data._id)}>Delete</button>
                  }
                  { self && confirmed === false && user._id === friend.user2._id &&
                    <div>
                      <button className="btn btn-sm btn-primary" onClick={() => this.onAcceptInvite(friend_data._id)}>Accept invite</button>&nbsp;
                      <button className="btn btn-sm btn-danger" onClick={() => this.onDeleteFriend(friend._id, friend_data._id)}>Decline invite</button>
                    </div>
                  }
                </Card>
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth, users }) {
  return { auth, users }
};

Friends.propTypes = {
  user: PropTypes.string.isRequired
};

export default connect(mapStateToProps, { fetchFriends, addFriend, confirmFriend, deleteFriend })(Friends);