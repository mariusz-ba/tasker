import axios from 'axios';

export function requestProjects() {
  return {
    type: 'REQUEST_PROJECTS'
  }
}

export function receiveProjects(projects) {
  return {
    type: 'RECEIVE_PROJECTS',
    projects
  }
}

export function fetchProjects() {
  return dispatch => {
    dispatch(requestProjects());

    return axios.get('/api/projects').then(response => dispatch(receiveProjects(response.data)), error => console.log('An error occurred: ', error));
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

export function createProject(project) {
  return dispatch => {
    return axios.put('/api/projects', { ...project }).then(response => dispatch(createdProject(response.data)), error => console.log('An error occurred: ', error));
  }
}

export function createdProject(project) {
  return {
    type: 'CREATED_PROJECT',
    project
  }
}

export function deleteProject(id) {
  return dispatch => {
    return axios.delete(`/api/projects/${id}`)
    .then(
      response => dispatch(deletedProject(id)),
      error => console.log('An error occurred: ', error)
    );
  }
}

export function deletedProject(id) {
  return {
    type: 'DELETED_PROJECT',
    id
  }
}