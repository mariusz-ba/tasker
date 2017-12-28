import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchTeams,
  createTeam,
  removeTeam
} from '../actions/teamsActions';

class Teams extends Component {
  componentWillMount() {
    this.props.fetchTeams();
  }

  onCreate = () => {
    this.props.createTeam({ name: 'My new team' });
  }

  onRemove = (e, id) => {
    this.props.removeTeam(id);
  }

  render() {
    return (
      <div>
        <h1>Your teams</h1>
        {
          this.props.teams.map(team => (
            <div key={team._id}>
              <h1>{team.name} <span className="badge badge-success">{team._id}</span></h1>
              {
                team.users.map(user => <h5 key={user}>{user}</h5>)
              }
              <button className="btn btn-danger" onClick={(e) => this.onRemove(e, team._id)}>Remove team</button>
            </div>
          ))
        }
        <button className="btn btn-primary" onClick={this.onCreate}>Create team</button>
      </div>
    )
  }
}

function mapStateToProps({ teams }) {
  return {
    teams
  }
}

export default connect( mapStateToProps, { fetchTeams, createTeam, removeTeam } )(Teams);