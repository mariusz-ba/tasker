import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTask } from '../../actions/tasksActions';

class NewTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      completed: false
    }
  }

  onCreate = (e) => {
    e.preventDefault();
    this.props.createTask({...this.state});
  }

  toggleCompleted = (e) => {
    this.setState({completed: !this.state.completed});
  }

  handleDescription = (e) => {
    this.setState({description: e.target.value});
  }

  render() {
    const checked = this.state.completed ? 'checked' : '';
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <h3 className="card-header">New Task</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input id="description" type="text" name="description" placeholder="Description of a task" className="form-control" value={this.state.description} onChange={this.handleDescription}/>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" onChange={this.toggleCompleted} checked={checked}/>
                      Completed
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="target">Target</label>
                    <select className="form-control" id="target">
                      <option>Team 1</option>
                      <option>Team 2</option>
                      <option>Team 3</option>
                      <option>User 1</option>
                      <option>User 2</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="card-footer">
                <button className="btn btn-success" onClick={this.onCreate}>Create</button>
              </div> 
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { createTask })(NewTask);