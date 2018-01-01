import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTeam } from '../../actions/teamsActions';

class Team extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.fetchTeam(id);
  }
  render() {
    const { id } = this.props.match.params;
    const team = this.props.teams.find(team => team._id == id);

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <h5 className="card-header">{team && team.name} <span className="badge badge-success">{team && team._id}</span></h5>
              <div className="card-body">
                <ul>
                { team && team.users && 
                  team.users.map(user => <li key={user._id}>{user.username}</li>)
                }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ teams }) {
  return { teams }
};

export default connect(mapStateToProps, { fetchTeam })(Team);