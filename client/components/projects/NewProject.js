import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTeams } from '../../actions/teamsActions';
import { createProject } from '../../actions/projectsActions';

import { withRouter } from 'react-router-dom';
import { values } from 'lodash'; 

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      team: '',
      //teams: [],
      //users: []
    }
  }
  componentWillMount() {
    this.props.fetchTeams();
  }
  onCreateProject = (e) => {
    e.preventDefault();
    const { name, description, team } = this.state;
    this.props.createProject({
      name,
      description,
      teams: (team.length ? [team] : [])
    });
    this.props.history.push('/projects');
  }
  onNameChange = (e) => {
    this.setState({ name: e.target.value });
  }
  onDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  }
  onSelectTeam = (e) => {
    this.setState({ team: e.target.value });
  }
  render() {
    const { teams } = this.props.teams;
    const { name, description, team } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <h5 className="card-header">Create new project</h5>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="inputName">Project name</label>
                    <input 
                      id="inputName" 
                      className="form-control" 
                      type="text" 
                      name="name" 
                      placeholder="Please enter a name of the project" 
                      value={name} 
                      onChange={this.onNameChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="textareaDescription">Description</label>
                    <textarea
                      id="textareaDescription" 
                      className="form-control" 
                      rows="3" 
                      name="description" 
                      placeholder="What's this project about"
                      value={description}
                      onChange={this.onDescriptionChange}>
                    </textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="selectTeams">Teams</label>
                    <select id="selectTeams" className="form-control" name="teams" onChange={this.onSelectTeam} value={team}>
                      <option value="">Chose team for this project...</option>
                      { teams &&
                        values(teams).map(team => <option key={team._id} value={team._id}>{team.name}</option>)
                      }
                    </select>
                  </div>
                  <button className="btn btn-primary" onClick={this.onCreateProject}>Create Project</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ teams }) {
  return { teams };
}

export default withRouter(connect(mapStateToProps, { fetchTeams, createProject })(NewProject));