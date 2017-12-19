import axios from 'axios';

/**
 * Action dispatched every time user wants to get tasks
 * from server api
 * 
 * @param {Object} filter 
 */
export function requestTasks(filter) {
  return {
    type: 'REQUEST_TASKS',
    filter
  }
}

/**
 * This action is dispatched when tasks are successfully received
 * from the server
 * 
 * @param {Object} filter 
 * @param {Object} tasks 
 */
export function receiveTasks(filter, tasks) {
  return {
    type: 'RECEIVE_TASKS',
    filter,
    tasks
  }
}

/**
 * This is a thunk action that uses ajax request to get
 * tasks from the server using specified filter
 * 
 * @param {Object} filter 
 */
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
    .then(data => dispatch(receiveTasks(filter, data)))

  }
}

/**
 * Thunk action responsible for creating new tasks
 * 
 * @param {Object} task 
 */
export function createTask(task) {
  return dispatch => {
    console.log('Creating task');
    return axios.put('/api/tasks', task)
    .then(
      response => response.data,
      error => console.log('An error occurred.', error)
    )
    .then(data => dispatch(createdTask(data)));
  }
}

/**
 * Action dispatched by createTask function every time the
 * new task was successfully created
 * 
 * @param {Object} task 
 */
export function createdTask(task) {
  return {
    type: 'CREATED_TASK',
    task
  }
}

/**
 * This action is used to update existing tasks. User must specify
 * id of the task he wants to update and new task data
 * 
 * @param {String} id 
 * @param {Object} task 
 */
export function updateTask(id, task) {
  return dispatch => {
    return axios.post('/api/tasks/' + id, {
      task
    })
    .then(
      response => response.data,
      error => console.log('An error occurred.', error)
    )
    .then(data => dispatch(updatedTask(id, data)))
  }
}

/**
 * Action dispatched every time task was successfully updated
 * 
 * @param {String} id 
 * @param {Object} task 
 */
export function updatedTask(id, task) {
  return {
    type: 'UPDATED_TASK',
    id,
    task
  }
}

export function deleteTask(id) {
  return dispatch => {
    return axios.delete('/api/tasks/' + id)
    .then(
      response => response.data,
      error => console.log('An error occurred.', error)
    )
    .then(
      data => dispatch(deletedTask(data))
    )
  }
}

export function deletedTask(data) {
  return {
    type: 'DELETED_TASK',
    data
  }
}