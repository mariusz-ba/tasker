import React, { Component } from 'react';
import {
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTasks, updateTask } from '../../actions/tasksActions';

import TasksTable from './TasksTable';

function prettyDate(date) {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskid: this.props.match.params.id
    }
    this.toggleCompleted = this.toggleCompleted.bind(this);
  }

  toggleCompleted(e) {
    e.preventDefault();
    let task = Object.assign({}, this.props.tasks.find(x => x._id == this.props.match.params.id));
    task.completed = !task.completed;
    this.props.updateTask(this.state.taskid, task);
  }

  render() {
    // If task doesnt exist in store, try to get it from the server
    const task = this.props.tasks.find(x => x._id == this.props.match.params.id);
    if(task === undefined)
      this.props.fetchTasks({ completed: false });

    if(task)
      console.log(prettyDate(new Date(task.createdAt)));

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <img className="card-img-top" src="https://scontent-dft4-2.cdninstagram.com/t51.2885-19/22277616_340453526415691_8667380059302002688_n.jpg"/>
              <div className="card-body">
                <h6 className="card-title">Author:</h6>
                <p className="badge badge-success">{task && task.author}</p>
                <h6 className="card-text">Target:</h6>
                <p className="card-text"><span className="badge badge-primary">{task && task.author}</span></p>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="card">
              <h5 className="card-header">Details</h5>
              <div className="card-body">
                <p>Description: { task && task.description }</p>
                <p>Status: { task && task.completed ? 'Completed' : 'Not completed' }</p>
                <p>Updated at: { task && prettyDate(new Date(task.updatedAt)) }</p>
                <a href="#" className="btn btn-primary" onClick={this.toggleCompleted}>Toggle completed</a>
              </div>
              <div className="card-footer text-muted">Created at: { task && prettyDate(new Date(task.createdAt)) }</div>
            </div>
            <div className="card">
              <h5 className="card-header">Subtasks</h5>
              <div className="card-body">
                <div>
                  <TasksTable tasks={null}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  }
}

export default withRouter(connect(mapStateToProps, { fetchTasks, updateTask })(Task));