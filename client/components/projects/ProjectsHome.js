import React, { Component } from 'react';
import {
  Link,
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProjects, deleteProject } from '../../actions/projectsActions';

import { values } from 'lodash';

import Card from '../ui/Card';

class ProjectsHome extends Component {
  componentWillMount() {
    this.props.fetchProjects();
  }
  
  onBrowseProject = (id) => {
    this.props.history.push(`/projects/${id}`);
  }

  render() {
    const { projects } = this.props.projects;
  
    return (
      <div className="container">
        <header>
          <Link className="btn btn-sm btn-primary" to="/projects/new" style={{marginTop: 10}}><i className="fa fa-plus" aria-hidden="true"></i> Create Project</Link>
        </header>
        <p className="text-muted" style={{marginBottom: 0}}>Your Projects</p>
        <div className="row">
        {
          values(projects).map(project => (
            <div className="col-md-4" key={project._id}>
              <Card
                image="/img/project.png"
                primaryText={project.name}
                secondaryText={`${project.description.split(' ').slice(0, 40).join(' ')}...`}
                onClick={() => this.onBrowseProject(project._id)}>
              </Card>
            </div>
          ))
        }
        </div>
      </div>
    )
  }
}

function mapStateToProps({ projects }) {
  return {
    projects
  }
}

export default withRouter(connect(mapStateToProps, { fetchProjects, deleteProject })(ProjectsHome));