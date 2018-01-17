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
                  onClick={() => this.onBrowseTeam(team._id)}>
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