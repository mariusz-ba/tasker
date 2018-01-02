import axios from 'axios';

// Get teams
export function fetchTeams() {
  return dispatch => {
    console.log('Fetching teams');
    return axios.get('/api/teams').then(response => dispatch(receiveTeams(response.data)), error => console.log('An error occurred', error));
  }
}

export function receiveTeams(teams) {
  return {
    type: 'RECEIVE_TEAMS',
    teams
  }
}

// Get team
export function fetchTeam(id) {
  return dispatch => {
    return axios.get(`/api/teams/${id}`)
    .then(
      response => dispatch(receiveTeam(response.data)),
      error => console.log('An error occurred: ', error)
    );
  }
}

export function receiveTeam(team) {
  return {
    type: 'RECEIVE_TEAM',
    team
  }
}

// Create team
export function createTeam(team) {
  return dispatch => {
    return axios.put('/api/teams', team).then(response => dispatch(teamCreated(response.data)), error => console.log('An error occurred', error));
  }
}

export function teamCreated(team) {
  return {
    type: 'TEAM_CREATED',
    team
  }
}

// Remove team
export function removeTeam(id) {
  return dispatch => {
    return axios.delete(`/api/teams/${id}`).then(response => dispatch(teamRemoved(response.data)), error => console.log('An error occurred', error));
  }
}

export function teamRemoved(team) {
  return {
    type: 'TEAM_REMOVED',
    team
  }
}