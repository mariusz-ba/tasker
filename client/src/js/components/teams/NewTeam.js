import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createTeam,
  removeTeam
} from '../../actions/teamsActions';

class NewTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }
  onNameChange = (e) => {
    this.setState({ name: e.target.value });
  }
  onCreateTeam = (e) => {
    e.preventDefault();
    this.props.createTeam({ name: this.state.name });
  }
  render() {
    const { name } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <h5 className="card-header">Create new team</h5>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Team name</label>
                    <input 
                      id="name"
                      name="name"
                      className="form-control" 
                      type="text"
                      placeholder="Please specify team name"
                      value={name}
                      onChange={this.onNameChange}/>
                  </div>
                  <button class="btn btn-primary" onClick={this.onCreateTeam}>Create</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { createTeam, removeTeam })(NewTeam);