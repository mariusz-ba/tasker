import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchFriends, confirmFriend } from '../../../actions/friendsActions';

class Friends extends Component {
  componentWillMount() {
    this.props.fetchFriends(this.props.user);
  }
  onAcceptInvite = (friend) => {
    console.log('Accepting: ', friend);
    this.props.confirmFriend(this.props.user, friend);
  }
  render() {
    const { friends } = this.props;
    return (
      friends.map(friend => {
        const confirmed = friend.confirm_user === friend.confirm_friend;
        return (
          <div key={friend._id} className="col-md-6">
            <div className="card" style={{background: 'rgba(0,0,0,.03)', padding: 10}}>
              <h6>{friend.username}</h6>
              <p className="badge badge-primary">{friend._id}</p>
              { confirmed == false &&
                <p className="alert alert-danger">Not confirmed</p>
              }
              { friend.confirm_user == false &&
                <button className="btn btn-sm btn-primary" onClick={() => this.onAcceptInvite(friend._id)}>Accept invite</button>
              }
            </div>
          </div>
        )
       })
    )
  }
}

Friends.propTypes = {
  user: PropTypes.string.isRequired,
  friends: PropTypes.array.isRequired
};

export default connect(null, { fetchFriends, confirmFriend })(Friends);