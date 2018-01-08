import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateTeam } from '../../actions/teamsActions';

class EditTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      user: '',
      users: []
    }
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/api/teams/${id}`)
    .then(
      response => {
        this.setState({
          name: response.data.name,
          users: response.data.users.map(user => user._id)
        })
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
    this.setState({ users: [...this.state.users, this.state.user], user: ''})
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
    // call action for updating project
    console.log(this.state);
    this.props.updateTeam(this.props.match.params.id, {
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
                    <input
                      className="form-control"
                      placeholder="Add user name"
                      name="user"
                      id="user"
                      type="text"
                      value={user}
                      onChange={this.onChangeUser}/>
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="button-add">&nbsp;</label>  
                    <button id="button-add" className="btn btn-primary" style={{width: '100%'}} onClick={this.onAddUser}>Add</button>
                  </div>
                </div>
                <ul>
                  {
                    users.map(user => (
                      <li key={user}>{user} <button onClick={() => this.onDeleteUser(user)}>X</button></li>
                    ))
                  }
                </ul>
                <button className="btn btn-primary" onClick={this.onUpdateTeam}>Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { updateTeam })(EditTeam);