import axios from 'axios';

/**
 * This action is dispatched every time 
 * a project is requested from the server
 */
export function requestProjects() {
  return {
    type: 'REQUEST_PROJECTS'
  }
}

/**
 * This action is dispatched every time projects
 * are successfully fetched from the server
 * 
 * @param {Array} projects 
 */
export function receiveProjects(projects) {
  return {
    type: 'RECEIVE_PROJECTS',
    projects
  }
}

/**
 * Use this action to fetch all projects
 * user has access to
 */
export function fetchProjects() {
  return dispatch => {
    dispatch(requestProjects());
    return axios.get('/api/projects')
    .then(
      response => dispatch(receiveProjects(response.data)),
      error => console.log('An error occurred: ', error)
    );
  }
}

/**
 * This action is dispatched every time a project
 * data is requested from the server
 * 
 * @param {ObjectId} id - Project id
 */
export function requestProject(id) {
  return {
    type: 'REQUEST_PROJECT',
    id
  }
}

/**
 * Use this action to get specific project data
 * 
 * @param {ObjectId} id - Project id
 */
export function fetchProject(id) {
  return dispatch => {
    dispatch(requestProject(id));
    return axios.get(`/api/projects/${id}`)
    .then(
      response => dispatch(receiveProject(response.data)),
      error => console.log('An error occurred: ', error)
    )
  }
}

/**
 * This action is dispatched every time project
 * is received from the server
 * 
 * @param {Object} project - Project object received from database
 */
export function receiveProject(project) {
  return {
    type: 'RECEIVE_PROJECT',
    project
  }
}

/**
 * Use this action to create new projects
 * 
 * @param {Object} project - Object with new project data eg. {name: 'test', description: 'test'}
 */
export function createProject(project) {
  return dispatch => {
    return axios.put('/api/projects', { ...project })
    .then(
      response => dispatch(createdProject(response.data)),
      error => console.log('An error occurred: ', error)
    );
  }
}

/**
 * This action is dispatched every time project
 * is created
 * 
 * @param {Object} project - Project that has been created
 */
export function createdProject(project) {
  return {
    type: 'CREATE_PROJECT',
    project
  }
}

/**
 * Use this action to delete projects
 * 
 * @param {ObjectId} id - Id of a project to delete
 */
export function deleteProject(id) {
  return dispatch => {
    return axios.delete(`/api/projects/${id}`)
    .then(
      response => dispatch(deletedProject(id)),
      error => console.log('An error occurred: ', error)
    );
  }
}

/**
 * This action is dispatched every time project
 * is deleted
 * 
 * @param {ObjectId} id - Id of a deleted project
 */
export function deletedProject(id) {
  return {
    type: 'DELETE_PROJECT',
    id
  }
}

/**
 * Use this action to update project data
 * 
 * @param {ObjectId} id - Project id
 * @param {Object} project - Object with new project data
 */
export function updateProject(id, project) {
  return dispatch => {
    return axios.post(`/api/projects/${id}`, project)
    .then(
      response => dispatch(updatedProject(response.data)),
      error => console.log('An error occurred: ', error)
    )
  }
}

/**
 * This action is dispatched every time project
 * is updated
 * 
 * @param {Object} project - Project returned from the server
 */
export function updatedProject(project) { 
  return {
    type: 'UPDATE_PROJECT',
    project
  }
}