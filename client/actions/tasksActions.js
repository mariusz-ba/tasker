import axios from 'axios';

/**
 * Action dispatched every time user wants to get tasks
 * from server api
 * 
 * @param {ObjectId} project 
 */
export function requestTasks(project) {
  return {
    type: 'REQUEST_TASKS',
    project
  }
}

/**
 * This action is dispatched when tasks are successfully received
 * from the server
 * 
 * @param {Object} tasks 
 */
export function receiveTasks(project, tasks) {
  return {
    type: 'RECEIVE_TASKS',
    tasks
  }
}

/**
 * Fetch tasks based on project id
 * 
 * @param {ObjectId} project 
 */
export function fetchTasks(project) {

  return function (dispatch) {

    dispatch(requestTasks(project));

    return axios.get(`/api/projects/${project}/tasks`)
    .then(
      response => dispatch(receiveTasks(project, response.data)),
      error => console.log('An error occurred.', error)
    );
  }
}

/**
 * Thunk action responsible for creating new tasks
 * 
 * @param {ObjectId} project
 * @param {Object} task 
 */
export function createTask(project, task) {
  return dispatch => {
    return axios.put(`/api/projects/${project}/tasks`, task)
    .then(
      response => dispatch(createdTask(response.data)),
      error => console.log('An error occurred.', error)
    );
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
      response => dispatch(updatedTask(id, response.data)),
      error => console.log('An error occurred.', error)
    );
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
      response => dispatch(deletedTask(response.data)),
      error => console.log('An error occurred.', error)
    );
  }
}

export function deletedTask(data) {
  return {
    type: 'DELETED_TASK',
    data
  }
}