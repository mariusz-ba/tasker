import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import TasksListItem from './TasksListItem';

export default class TasksList extends Component {
  render() {
    const { tasks, onTaskToggled, onTaskDescriptionChanged } = this.props;

    return (
      <div>
        { tasks &&
          tasks.map(task => (
            <TasksListItem
              key={task._id}
              {...task}
              onTaskToggled={onTaskToggled}
              onTaskDescriptionChanged={onTaskDescriptionChanged}/>
          ))
        }
      </div>
    )
  }
}

TasksList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onTaskToggled: PropTypes.func.isRequired,
  onTaskDescriptionChanged: PropTypes.func.isRequired
};

TasksList.defaultProps = {
  tasks: []
};

