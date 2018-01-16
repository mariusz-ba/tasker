import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateTeam } from '../../actions/teamsActions';

import { unionBy } from 'lodash';

import UsersTable from './UsersTable';

class EditTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      user: '',
      users: [],
      friends: []
    }
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/api/teams/${id}`)
    .then(
      response => {
        this.setState({
          name: response.data.name,
          users: response.data.users
        })

        axios.get(`/api/users/${this.props.auth.user._id}/friends`)
        .then(
          response => {
            const friends = response.data.filter(friend => friend.confirm1 === friend.confirm2).map(friend => {
              return (friend.user1._id === this.props.auth.user._id ? friend.user2 : friend.user1);
            });
            this.setState({ 
              friends, 
              user: (friends.length ? friends[0]._id : null)
            })
          },
          error => console.log('An error occurred: ', error)
        )
      },
      error => console.log('An error occurred: ', error)
    )
  } 
  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  }
  onChangeUser = (e) => {
    this.setState({ user: e.target.value })
  }
  onAddUser = () => {
    if(!this.state.user) return;
    const user = this.state.friends.find(friend => friend._id == this.state.user);
    console.log('this.state.user: ', this.state.user);
    console.log('adding user: ', user);
    this.setState({ users: unionBy([...this.state.users, this.state.friends.find(friend => friend._id == this.state.user)], '_id')})
  }
  onDeleteUser = (user) => {
    const users = this.state.users.slice();
    users.splice(users.indexOf(user), 1);
    this.setState({
      ...this.state,
      users
    })
  }
  onUpdateTeam = () => {
    // call action for updating team
    console.log(this.state);
    this.props.updateTeam(this.props.match.params.id, {
      name: this.state.name,
      users: this.state.users.map(user => user._id)
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
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="name">Team name</label>
                  <input
                    className="form-control"
                    placeholder="Team name"
                    name="name"
                    id="name"
                    type="text"
                    value={name}
                    onChange={this.onChangeName}/>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-9">
                    <label htmlFor="team">Users</label>
                    <select className="form-control" onChange={this.onChangeUser}>
                    {
                      friends.map(friend => (
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
                <UsersTable users={users} onDelete={this.onDeleteUser} />
                <button className="btn btn-primary" onClick={this.onUpdateTeam}>Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default withRouter(connect(mapStateToProps, { updateTeam })(EditTeam));