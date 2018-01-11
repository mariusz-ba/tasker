import React, { Component } from 'react';
import Card from '../../ui/Card';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Projects extends Component {
  // componentDidMount() {
  //   axios.get(`/api/projects`, { params: { user: this.props.user }})
  //   .then(
  //     response => this.setState({ projects: response.data }),
  //     error => console.log('An error occurred: ', error)
  //   )
  // }
  onCardClicked = (id) => {
    this.props.history.push(`/projects/${id}`);
  }
  render() {
    return this.props.projects.map(project => (
      <div key={project._id} className="col-md-6">
        <Card
          image="/img/project.png"
          primaryText={project.name}
          onClick={() => this.onCardClicked(project._id)}
        />
      </div>
    ))
  }
};

export default withRouter(Projects);