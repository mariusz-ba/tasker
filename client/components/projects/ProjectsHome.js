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
  
  onDeleteProject = (e, id) => {
    this.props.deleteProject(id);
  }

  render() {
    const { projects } = this.props.projects;
  
    return (
      <div className="container">
        <Link className="btn btn-sm btn-primary" to="/projects/new" style={{marginTop: 10}}><i className="fa fa-plus" aria-hidden="true"></i> Create Project</Link>
        <div className="row">
        {
          values(projects).map(project => (
            <div className="col-md-4" key={project._id}>
              <Card
                image="/img/project.png"
                primaryText={project.name}
                secondaryText={`${project.description.split(' ').slice(0, 40).join(' ')}...`}>
                <p>Teams:
                { project.teams &&
                  project.teams.map(team => <span key={team} className="badge badge-success">{team}</span>)
                }</p>
                <p>Users:
                { project.users &&
                  project.users.map(user => <span key={user} className="badge badge-danger">{user}</span>)
                }</p>
                <Link to={`/projects/${project._id}`} className="btn btn-sm btn-light"><i className="fa fa-search" aria-hidden="true"></i> Browse</Link>&nbsp;
                <button className="btn btn-sm btn-danger" onClick={(e) => this.onDeleteProject(e, project._id)}><i className="fa fa-trash" aria-hidden="true"></i> Delete</button>
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