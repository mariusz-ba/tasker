import React, { Component } from 'react';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      fullName: props.fullName,
      email: props.email
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
    this.props.onSave(this.state);
  }
  render() {
    const { username, fullName, email } = this.state;
    
    return (
      <div>
        <div className="settings-header">
          <h5>Profile settings</h5>
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
    )
  }
}