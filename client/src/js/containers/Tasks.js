import React, { Component } from 'react';

import { connect } from 'react-redux';

import Tabs from '../components/tabs/Tabs';
import Tab from '../components/tabs/Tab';
import TasksTable from '../components/tasks/TasksTable';

import { createTask } from '../actions/tasksActions';

class Tasks extends Component {
  constructor(props) {
    super(props);
    
    this.onCreate = this.onCreate.bind(this);
  }

  onCreate(e) {
    e.preventDefault();
    this.props.createTask({description: 'New task', completed: false });
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
              { name: 'Recent', component: <TasksTable/> },
              { name: 'Completed', component: <TasksTable/> },
              { name: 'Not Completed', component: <TasksTable/> },
            ]}
          />
          </div>
        </div>
        <a className="btn btn-success" href="#" onClick={this.onCreate}>Create</a>
      </div>
    )
  }
}

export default connect(null, { createTask })(Tasks);