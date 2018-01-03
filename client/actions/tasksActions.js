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
 * This action is dispatched every time a specific
 * taks is requested from the server
 * 
 * @param {ObjectId} project - Project id
 * @param {ObjectId} task - Task id
 */
export function requestTask(project, task) {
  return {
    type: 'REQUEST_TASK',
    project,
    task
  }
}

/**
 * Use this action to get data about specific task
 * 
 * @param {ObjectId} project - Project id
 * @param {ObjectId} task - Task id
 */
export function fetchTask(project, task) {
  return dispatch => {
    dispatch(requestTask(project, task));

    return axios.get(`/api/projects/${project}/tasks/${task}`)
    .then(
      response => dispatch(receiveTask(response.data)),
      error => console.log('An error occurred: ', error)
    )
  }
}

/**
 * This action is dispatched every time task
 * is received from the server
 * 
 * @param {Object} task - Task object received from the server
 */
export function receiveTask(task) {
  return {
    type: 'RECEIVE_TASK',
    task
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
 * @param {ObjectId} project
 * @param {ObjectId} id - Id of a task to update 
 * @param {Object} task 
 */
export function updateTask(project, id, task) {
  return dispatch => {
    return axios.post(`/api/projects/${project}/tasks/${id}`, {...task})
    .then(
      response => dispatch(updatedTask(response.data)),
      error => console.log('An error occurred.', error)
    );
  }
}

/**
 * Action dispatched every time task was successfully updated
 * 
 * @param {Object} task 
 */
export function updatedTask(task) {
  return {
    type: 'UPDATED_TASK',
    task
  }
}

// FIx that
export function deleteTask(project, task) {
  return dispatch => {
    return axios.delete(`/api/projects/${project}/tasks/${task}`)
    .then(
      response => dispatch(deletedTask(task)),
      error => console.log('An error occurred.', error)
    );
  }
}

export function deletedTask(id) {
  return {
    type: 'DELETED_TASK',
    id
  }
}