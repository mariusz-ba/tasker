import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTask } from '../../actions/tasksActions';
import Card from '../ui/Card';

class Task extends Component {
  componentWillMount() {
    const { id, task } = this.props.match.params;
    this.props.fetchTask(id, task);
  }

  render() {
    //const { task } = this.props.match.params;
    const task = this.props.tasks.find(task => task._id === this.props.match.params.task);
    const completed = task && task.completed ? <span className="badge badge-success">Completed</span> : <span className="badge badge-danger">Not Completed</span>;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Card image="/img/task.png" primaryText="Task" secondaryText={task && task._id}/>
          </div>
          <div className="col-md-9">
            <div className="card">
              <h5 className="card-header">Task details</h5>
              <div className="card-body">
                <p>Description: {task && task.description}</p>
                <p>Status: {completed}</p>
              </div>
            </div>
            <div className="card">
              <h5 className="card-header">Comments</h5>
              <div className="card-body">
                <p>[Comments here]</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ tasks }) {
  return { tasks }
};

export default connect(mapStateToProps, { fetchTask })(Task);