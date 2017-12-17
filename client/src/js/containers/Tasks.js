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
        <div className="col-md-6">
        <Tabs
          tabs={[
            { name: 'Recent', component: <TasksTable/> },
            { name: 'Completed', component: <TasksTable/> }
          ]}
        />
        </div>
        <a className="btn btn-success" href="#" onClick={this.onCreate}>Create</a>
      </div>
    )
  }
}

export default connect(null, { createTask })(Tasks);