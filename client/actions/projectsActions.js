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