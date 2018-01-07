import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateProject } from '../../actions/projectsActions';

class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      team: '',
      teams: []
    }
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/api/projects/${id}`)
    .then(
      response => {
        this.setState({
          name: response.data.name,
          description: response.data.description,
          teams: response.data.teams
        })
      },
      error => console.log('An error occurred: ', error)
    )
  }
  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  }
  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  }
  onChangeTeam = (e) => {
    this.setState({ team: e.target.value })
  }
  onAddTeam = () => {
    this.setState({ teams: [...this.state.teams, this.state.team], team: ''})
  }
  onDeleteTeam = (team) => {
    const teams = this.state.teams.slice();
    teams.splice(teams.indexOf(team), 1);
    this.setState({
      ...this.state,
      teams
    })
  }
  onUpdateProject = () => {
    // call action for updating project
    console.log(this.state);
    this.props.updateProject(this.props.match.params.id, {
      name: this.state.name,
      description: this.state.description,
      teams: this.state.teams
    });
  }
  render() {
    const { name, description, team, teams } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="name">Project Name</label>
                  <input
                    className="form-control"
                    placeholder="Project name"
                    name="name"
                    id="name"
                    type="text"
                    value={name}
                    onChange={this.onChangeName}/>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    id="description"
                    name="description"
                    placeholder="Project description"
                    value={description}
                    onChange={this.onChangeDescription}/>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-9">
                    <label htmlFor="team">Teams</label>
                    <input
                      className="form-control"
                      placeholder="Add team name"
                      name="team"
                      id="team"
                      type="text"
                      value={team}
                      onChange={this.onChangeTeam}/>
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="button-add">&nbsp;</label>  
                    <button id="button-add" className="btn btn-primary" style={{width: '100%'}} onClick={this.onAddTeam}>Add</button>
                  </div>
                </div>
                <ul>
                  {
                    teams.map(team => (
                      <li key={team}>{team} <button onClick={() => this.onDeleteTeam(team)}>X</button></li>
                    ))
                  }
                </ul>
                <button className="btn btn-primary" onClick={this.onUpdateProject}>Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { updateProject })(EditProject);