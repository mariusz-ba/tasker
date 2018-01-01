import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Tabs from '../tabs/Tabs';
import Tab from '../tabs/Tab';
import TasksTable from './TasksTable';

import { fetchTasks } from '../../actions/tasksActions';

class TasksHome extends Component {
  constructor(props) {
    super(props);
    this.onCreate = this.onCreate.bind(this);
  }

  componentDidMount() {
    this.props.fetchTasks({ completed: false });
  }

  onCreate(e) {
    e.preventDefault();
    this.props.history.push('/tasks/new');
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="list-group">
              <a href="#" className="list-group-item list-group-item-action">Profile</a>
              <a href="#" className="list-group-item list-group-item-action active">Tasks</a>
              <a href="#" className="list-group-item list-group-item-action">Messages</a>
              <a href="#" className="list-group-item list-group-item-action">Friends</a>
              <a href="#" className="list-group-item list-group-item-action">Groups</a>
            </div>
          </div>
          <div className="col-md-9">
          <Tabs
            tabs={[
              { name: 'Recent', component: <TasksTable tasks={this.props.tasks}/> },
              { name: 'Completed', component: <TasksTable tasks={this.props.tasks}/> },
              { name: 'Not Completed', component: <TasksTable tasks={this.props.tasks}/> },
            ]}
          />
          </div>
        </div>
        <a className="btn btn-success" href="#" onClick={this.onCreate}>Create</a>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  }
}

export default withRouter(connect(mapStateToProps, { fetchTasks })(TasksHome));