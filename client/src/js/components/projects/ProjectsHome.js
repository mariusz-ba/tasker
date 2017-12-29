import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

export default class ProjectsHome extends Component {
  render() {
    const projects = [
      { _id: 1, name: 'First Project', description: 'lorem ipsum dolor sit amet...' },
      { _id: 2, name: 'Second Project', description: 'lorem ipsum dolor sit amet...' },
      { _id: 3, name: 'Third Project', description: 'lorem ipsum dolor sit amet...' },
      { _id: 4, name: 'Fourth Project', description: 'lorem ipsum dolor sit amet...' }
    ];

    return (
      <div className="container">
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