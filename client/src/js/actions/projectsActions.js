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

export function createProject(name) {
  return dispatch => {
    return axios.put('/api/projects', { name }).then(response => dispatch(createdProject(response.data)), error => console.log('An error occurred: ', error));
  }
}

export function createdProject(project) {
  return {
    type: 'CREATED_PROJECT',
    project
  }
}