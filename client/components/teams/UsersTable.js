import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class UsersTable extends Component {
  onDeleteUser = (e, user) => {
    e.preventDefault();
    this.props.onDelete(user);
  }

  render() {
    const { users } = this.props;

    return (
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>User name</th>
            <th>User id</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
          users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td><span className="badge badge-primary">{user._id}</span></td>
              <td><button className="btn btn-sm btn-danger" onClick={(e) => this.onDeleteUser(e, user._id)}>Delete</button></td>
            </tr>
          ))
        }
        </tbody>
      </table>
    )
  }
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
};