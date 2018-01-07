import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../actions/authActions';

import { omitBy, isEmpty } from 'lodash';

class Settings extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props.auth;
    this.state = {
      username: user.username,
      fullName: user.fullName,
      email: user.email
    }
  }
  onChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  }
  onChangeFullName = (e) => {
    this.setState({ fullName: e.target.value });
  }
  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  }
  onUpdate = () => {
    const user = {
      _id: this.props.auth.user._id,
      ...omitBy(this.state, isEmpty)
    };
    console.log('Updating user: ', user);
    this.props.updateUser(user._id, user);
  }
  render() {
    const { username, fullName, email } = this.state;

    return (
      <div className="container">
        <header>&nbsp;</header>
        <div className="row">
          <div className="col">
            <div className="card settings">
              <div className="row">
                <ul className="col-md-4">
                  <li className="settings-active">Edit Profile</li>
                  <li>Change Password</li>
                </ul>
                <div className="col-md-8 settings-content">
                  <div className="settings-header">
                    <h5>Settings</h5>
                  </div>
                  <div className="form-group">
                    <label htmlFor="full-name">Name</label>
                    <input
                      id="full-name"
                      className="form-control"
                      type="text"
                      value={fullName}
                      onChange={this.onChangeFullName}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      id="username" 
                      className="form-control" 
                      type="text"
                      value={username}
                      onChange={this.onChangeUsername}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">E-Mail</label>
                    <input 
                      id="email" 
                      className="form-control" 
                      type="email"
                      value={email}
                      onChange={this.onChangeEmail}/>
                  </div>
                  <div className="text-center">
                    <button className="btn btn-sm btn-primary" onClick={this.onUpdate}>Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
};

export default connect(mapStateToProps, { updateUser })(Settings);