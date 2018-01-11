import React, { Component } from 'react';
import { values } from 'lodash';
import { withRouter } from 'react-router-dom';
import Card from '../../ui/Card';

class Teams extends Component {
  onCardClicked = (id) => {
    this.props.history.push(`/teams/${id}`);
  }
  render() {
    return values(this.props.teams).map(team => (
      <div key={team._id} className="col-md-6">
        <Card
          image="/img/team.png"
          primaryText={team.name}
          onClick={() => this.onCardClicked(team._id)}
        />
      </div>
    ))
  }
};

export default withRouter(Teams);