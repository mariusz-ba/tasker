import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTeam, deleteTeam } from '../../actions/teamsActions';

import Dropdown from '../ui/Dropdown';
import Card from '../ui/Card';

class Team extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.fetchTeam(id);
  }

  onUserClicked = (id) => {
    this.props.history.push(`/profile/${id}`);
  }

  render() {
    const { id } = this.props.match.params;
    const team = this.props.teams.teams[id];

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h4>{team && team.name}</h4>
            <Dropdown className="btn btn-dark" label="Options" options={[
              { action: () => {this.props.history.push(`/teams/${id}/edit`)}, label: 'Edit' },
              { action: () => {this.props.deleteTeam(id); this.props.history.push('/teams')}, label: 'Delete' }
            ]}/>
            <hr/> 
          </div>
          { team && team.users &&
            team.users.map(user => (
              <div key={user._id} className="col-md-4">
                <Card 
                  image="/img/profile.jpg"
                  primaryText={user.fullName ? user.fullName : user.username}
                  onClick={() => this.onUserClicked(user._id)}/>
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

export default withRouter(connect(mapStateToProps, { fetchTeam, deleteTeam })(Team));