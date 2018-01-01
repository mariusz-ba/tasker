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

import Card from '../ui/Card';

class TeamsHome extends Component {
  componentWillMount() {
    this.props.fetchTeams();
  }

  onRemove = (e, id) => {
    this.props.removeTeam(id);
  }

  render() {
    return (
      <div className="container">
        <Link className="btn btn-sm btn-primary" to="/teams/new" style={{marginTop: 10}}><i className="fa fa-plus" aria-hidden="true"></i> Create team</Link>
        <div className="row">
          {
            this.props.teams.map(team => (
              <div key={team._id} className="col-md-4">
                <Card 
                  image="/img/team.png"
                  primaryText={team.name}
                  secondaryText={team._id}>
                  <Link className="btn btn-sm btn-light" to={`/teams/${team._id}`}><i className="fa fa-search" aria-hidden="true"></i> Browse</Link>&nbsp;
                  <button className="btn btn-sm btn-danger" onClick={(e) => this.onRemove(e, team._id)}>Remove team</button>
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

export default withRouter(connect(mapStateToProps, { fetchTeams, removeTeam })(TeamsHome));