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
  onAcceptInvite = (friend) => {
    this.props.confirmFriend(this.props.user, friend);
  }
  onDeleteFriend = (friend) => {
    this.props.deleteFriend(this.props.user, friend);
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
            const confirmed = friend.confirm_user === friend.confirm_friend;
            const secondaryText = self ? (confirmed ? '' : 'Not confirmed') : '';
            return (
              <div key={friend._id} className="col-md-6">
                <Card
                  image="/img/profile.jpg"
                  primaryText={friend.username}
                  secondaryText={secondaryText}
                  clickable={false}>
                  { self && friend.confirm_user === true &&
                    <button className="btn btn-sm btn-danger" onClick={() => this.onDeleteFriend(friend._id)}>Delete</button>
                  }
                  { self && friend.confirm_user === false &&
                    <div>
                      <button className="btn btn-sm btn-primary" onClick={() => this.onAcceptInvite(friend._id)}>Accept invite</button>&nbsp;
                      <button className="btn btn-sm btn-danger" onClick={() => this.onDeleteFriend(friend._id)}>Decline invite</button>
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