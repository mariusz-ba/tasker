import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import axios from 'axios';
import { updateProject } from '../../actions/projectsActions';
import { unionBy } from 'lodash';

class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      team: '',
      teams: [],
      options: []
    }
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/api/projects/${id}`)
    .then(
      response => {
        this.setState({
          name: response.data.name,
          description: response.data.description
        })

        axios.get(`/api/teams`, { params: { teams: response.data.teams.length ? response.data.teams : ['000000000000000000000000'] }})
        .then(
          response => this.setState({ teams: response.data }),
          error => console.log('An error occurred: ', error)
        );

        axios.get(`/api/teams`)
        .then(
          response => this.setState({ options: response.data, team: (response.data.length ? response.data[0]._id : null)}),
          error => console.log('An error occurred: ', error)
        );
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
    if(!this.state.team) return;
    this.setState({ teams: unionBy([...this.state.teams, this.state.options.find(option => option._id == this.state.team)], '_id')})
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
      teams: this.state.teams.map(team => team._id)
    });
    this.props.history.goBack();
  }
  render() {
    const { name, description, team, teams } = this.state;
    const disabled = team ? '' : 'disabled';

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
                    <select className="form-control" onChange={this.onChangeTeam}>
                    { this.state.options &&
                      this.state.options.map(option => (
                        <option key={option._id} value={option._id}>{option.name}</option>
                      ))
                    }
                    </select>
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="button-add">&nbsp;</label>  
                    <button id="button-add" className={`btn btn-primary ${disabled}`} style={{width: '100%'}} onClick={this.onAddTeam}>Add</button>
                  </div>
                </div>
                <table className="table table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>Team name</th>
                      <th>Team id</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    teams.map(team => (
                      <tr key={team._id}>
                        <td>{team.name}</td>
                        <td><span className="badge badge-primary">{team._id}</span></td>
                        <td><button className="btn btn-sm btn-danger" onClick={() => this.onDeleteTeam(team)}>Delete</button></td>
                      </tr>
                    ))
                  }
                  </tbody>
                </table>
                <button className="btn btn-primary" onClick={this.onUpdateProject}>Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(null, { updateProject })(EditProject));