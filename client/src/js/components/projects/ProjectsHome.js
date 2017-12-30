import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProjects, createProject } from '../../actions/projectsActions';

class ProjectsHome extends Component {
  componentWillMount() {
    this.props.fetchProjects();
  }

  onCreate = () => {
    this.props.createProject('new project');
  }

  render() {
    const { projects } = this.props;

    return (
      <div className="container">
        <button className="btn btn-primary" onClick={this.onCreate}>Create Project</button>
        <div className="row">
        {
          projects.map(project => (
            <div className="col-md-4" key={project._id}>
              <div className="card">
                <img className="card-img-top" src="/img/prv.jpg" alt="Card image"/>
                <div className="card-block">
                  <h4 className="card-title">{project.name}</h4>
                  <p className="card-text">{project.description}</p>
                  <Link to={`/projects/${project._id}`} className="btn btn-primary">Browse</Link>
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

export default connect(mapStateToProps, { fetchProjects, createProject })(ProjectsHome);