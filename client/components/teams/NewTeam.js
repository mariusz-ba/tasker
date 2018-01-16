import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  createTeam,
  removeTeam
} from '../../actions/teamsActions';

import axios from 'axios';
import { mapKeys, values, pick, pull } from 'lodash';

import UsersTable from './UsersTable';

class NewTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      user: '',
      friends: {},
      users: [] // Users ids
    }
  }
  componentDidMount() {
    const { _id } = this.props.auth.user;
    axios.get(`/api/users/${_id}/friends`)
    .then(resposne => {
      const friends = resposne.data.filter(friend => friend.confirm1 === friend.confirm2).map(friend => {
        return (friend.user1._id === _id ? friend.user2 : friend.user1);
      });
      this.setState({
        user: (friends.length ? friends[0]._id : null),
        friends: mapKeys(friends, '_id')
      })
    })
  }
  // Form actions
  onNameChange = (e) => {
    this.setState({ name: e.target.value });
  }
  onChangeUser = (e) => {
    this.setState({ user: e.target.value });
  }
  onAddUser = (e) => {
    e.preventDefault();
    this.setState({...this.state, users: [...this.state.users, this.state.user]}) 
  }
  onDeleteUser = (user) => {
    this.setState({
      ...this.state,
      users: pull(this.state.users, user)
    });
  }
  onCreateTeam = (e) => {
    e.preventDefault();
    this.props.createTeam({ 
      name: this.state.name, 
      users: this.state.users
    });
    this.props.history.goBack();
  }

  render() {
    const { name, user, users, friends } = this.state;
    const disabled = user ? '' : 'disabled';

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
                  <div className="form-row">
                    <div className="form-group col-md-9">
                      <label htmlFor="team">Users</label>
                      <select className="form-control" onChange={this.onChangeUser}>
                      {
                        values(friends).map(friend => (
                          <option key={friend._id} value={friend._id}>{friend.username}</option>
                        ))
                      }
                      </select>
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="button-add">&nbsp;</label>  
                      <button id="button-add" className={`btn btn-primary ${disabled}`} style={{width: '100%'}} onClick={this.onAddUser}>Add</button>
                    </div>
                  </div>
                  <UsersTable users={values(pick(friends, users))} onDelete={this.onDeleteUser} />
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

const mapStateToProps = ({ auth }) => ({ auth });

export default withRouter(connect(mapStateToProps, { createTeam, removeTeam })(NewTeam));