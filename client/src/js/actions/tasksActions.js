import axios from 'axios';

export function createTask(text, completed) {
  return {
    type: 'CREATE_TASK',
    text,
    completed
  }
}

export function requestTasks(filter) {
  return {
    type: 'REQUEST_TASKS',
    filter
  }
}

export function receiveTasks(filter, tasks) {
  return {
    type: 'RECEIVE_TASKS',
    filter,
    tasks
  }
}

export function fetchTasks(filter) {

  return function (dispatch) {

    dispatch(requestTasks(filter));

    return axios.get('/api/tasks', {
      params: {
        ...filter
      }
    })
      .then(
        response => response.data,
        error => console.log('An error occurred.', error)
      )
      .then(data =>
        dispatch(receiveTasks(filter, data))
      )

  }
  
}
