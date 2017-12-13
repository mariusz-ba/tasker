import React, { Component } from 'react';

import Tabs from '../components/tabs/Tabs';
import Tab from '../components/tabs/Tab';
import TasksTable from '../components/tasks/TasksTable';

export default class Tasks extends Component {
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
      </div>
    )
  }
}