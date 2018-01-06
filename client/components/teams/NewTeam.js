import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createTeam,
  removeTeam
} from '../../actions/teamsActions';

class NewTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      user: '',
      users: []
    }
  }
  onNameChange = (e) => {
    this.setState({ name: e.target.value });
  }
  onUserChange = (e) => {
    this.setState({ user: e.target.value });
  }
  onAddUser = (e) => {
    e.preventDefault();
      this.setState({...this.state, users: [...this.state.users, this.state.user]}) 
  }
  onDeleteUser = (e, user) => {
    e.preventDefault();
    let users = this.state.users.slice();
    users.splice(users.indexOf(user), 1);

    this.setState({
      ...this.state,
      users
    })
  }
  onCreateTeam = (e) => {
    e.preventDefault();
    this.props.createTeam({ 
      name: this.state.name, 
      users: this.state.users
    });
  }
  render() {
    const { name, user, users } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <h5 className="card-header">Create new team</h5>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Team name</label>
                    <input 
                      id="name"
                      name="name"
                      className="form-control" 
                      type="text"
                      placeholder="Please specify team name"
                      value={name}
                      onChange={this.onNameChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="user">User id</label>
                    <input 
                      id="user"
                      name="user"
                      className="form-control"
                      type="text"
                      placeholder="Enter user id and press 'enter' to accept"
                      value={user}
                      onChange={this.onUserChange}/>
                    <button className="btn btn-primary" onClick={this.onAddUser}>Add</button>
                  </div>
                  <div>
                    {users.map(user => (
                      <div key={user}>
                        <h6>{user}</h6>
                        <button onClick={(e) => this.onDeleteUser(e, user)}>X</button>
                      </div>
                    ))}
                  </div>
                  <button className="btn btn-primary" onClick={this.onCreateTeam}>Create</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { createTeam, removeTeam })(NewTeam);