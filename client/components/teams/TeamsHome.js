import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Link,
  withRouter
} from 'react-router-dom';
import {
  fetchTeams,
  removeTeam
} from '../../actions/teamsActions';

class TeamsHome extends Component {
  componentWillMount() {
    this.props.fetchTeams();
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
            <div key={team._id} style={{border: '1px solid black'}}>
              <h1>{team.name} <span className="badge badge-success">{team._id}</span></h1>
              {
                //team.users.map(user => <h5 key={user}>{user}</h5>)
              }
              <button className="btn btn-danger" onClick={(e) => this.onRemove(e, team._id)}>Remove team</button>
            </div>
          ))
        }
        <Link className="btn btn-primary" to="/teams/new">Create team</Link>
      </div>
    )
  }
}

function mapStateToProps({ teams }) {
  return { teams }
};

export default withRouter(connect(mapStateToProps, { fetchTeams, removeTeam })(TeamsHome));