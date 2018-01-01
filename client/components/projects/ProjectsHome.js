import React, { Component } from 'react';
import {
  Link,
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProjects, deleteProject } from '../../actions/projectsActions';

class ProjectsHome extends Component {
  componentWillMount() {
    this.props.fetchProjects();
  }
  
  onDeleteProject = (e, id) => {
    this.props.deleteProject(id);
  }

  render() {
    const { projects } = this.props;

    return (
      <div className="container">
        <Link className="btn btn-sm btn-primary" to="/projects/new" style={{marginTop: 10}}><i className="fa fa-plus" aria-hidden="true"></i> Create Project</Link>
        <div className="row">
        {
          projects.map(project => (
            <div className="col-md-4" key={project._id}>
              <div className="card">
                <img className="card-img-top" src="/img/project.png" alt="Card image"/>
                <div className="card-block">
                  <h4 className="card-title">{project.name}</h4>
                  <p>Teams:
                  { project.teams &&
                    project.teams.map(team => <span key={team} className="badge badge-success">{team}</span>)
                  }</p>
                  <p>Users:
                  { project.users &&
                    project.users.map(user => <span key={user} className="badge badge-danger">{user}</span>)
                  }</p>
                  <p className="card-text">{project.description.split(' ').slice(0, 40).join(' ')}...</p>
                  <Link to={`/projects/${project._id}`} className="btn btn-sm btn-light"><i className="fa fa-search" aria-hidden="true"></i> Browse</Link>&nbsp;
                  <button className="btn btn-sm btn-danger" onClick={(e) => this.onDeleteProject(e, project._id)}><i className="fa fa-trash" aria-hidden="true"></i> Delete</button>
                </div>
              </div>
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