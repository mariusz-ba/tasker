import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Link,
  withRouter
} from 'react-router-dom';
import { fetchTeams, deleteTeam } from '../../actions/teamsActions';

import Card from '../ui/Card';

import { values } from 'lodash';

class TeamsHome extends Component {
  componentWillMount() {
    this.props.fetchTeams();
  }

  onBrowseTeam = (id) => {
    this.props.history.push(`/teams/${id}`);
  }
  onDeleteTeam = (id) => {
    this.props.deleteTeam(id);
  }

  render() {
    const { teams } = this.props.teams;
    return (
      <div className="container">
        <header>
          <Link className="btn btn-sm btn-primary" to="/teams/new" style={{marginTop: 10}}><i className="fa fa-plus" aria-hidden="true"></i> Create team</Link>
        </header>
        <p className="text-muted" style={{marginBottom: 0}}>Teams</p>
        <div className="row">
          {
            values(teams).map(team => (
              <div key={team._id} className="col-md-4">
                <Card 
                  image="/img/team.png"
                  primaryText={team.name}
                  secondaryText={team._id}
                  onClick={() => this.onBrowseTeam(team._id)}>
                  <button className="btn btn-sm btn-danger" onClick={() => this.onDeleteTeam(team._id)}><i className="fa fa-trash" aria-hidden="true"></i> Delete</button>
                </Card>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps({ teams }) {
  return { teams }
};

export default withRouter(connect(mapStateToProps, { fetchTeams, deleteTeam })(TeamsHome));