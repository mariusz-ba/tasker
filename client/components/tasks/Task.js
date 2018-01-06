import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTask } from '../../actions/tasksActions';
import Card from '../ui/Card';

class Task extends Component {
  componentDidMount() {
    const { id, task } = this.props.match.params;
    this.props.fetchTask(id, task);
  }

  render() {
    const { tasks } = this.props.tasks;
    const task = tasks[this.props.match.params.task];
    const completed = task && task.completed ? <span className="badge badge-success">Completed</span> : <span className="badge badge-danger">Not Completed</span>;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <p className="text-muted" style={{marginBottom: 8}}>Status</p>
            <div className="card">
              <img className="card-img-top" src="/img/task.png"/>
              <div className="card-block">
                <h6 className="card-title">Author</h6>
                <p className="card-text text-muted">{task && task.author}</p>
              { task &&
                task.completed ?
                  (<button className="btn btn-sm btn-primary"><span class="fa fa-check" aria-hidden="true"></span> Completed</button>) :
                  (<button className="btn btn-sm btn-warning"><span class="fa fa-times" aria-hidden="true"></span> Not Completed</button>)
              }
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <p className="text-muted" style={{marginBottom: 8}}>Description</p>
            <div className="card">
              <div className="card-body">
                <h5>{task && task.description}</h5>
              </div>
            </div>
            <p className="text-muted" style={{marginBottom: 8}}>Comments</p>
            <div className="card">
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