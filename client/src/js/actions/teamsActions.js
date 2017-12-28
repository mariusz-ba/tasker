import axios from 'axios';

// Get teams
export function fetchTeams() {
  return dispatch => {
    console.log('Fetching teams');
    axios.get('/api/teams').then(response => response.data, error => console.log('An error occurred', error)).then(data => dispatch(receiveTeams(data)));
  }
}

export function receiveTeams(teams) {
  return {
    type: 'RECEIVE_TEAMS',
    teams
  }
} 

// Create team
export function createTeam(team) {
  return dispatch => {
    console.log('Creating team');
    axios.put('/api/teams', team).then(response => response.data, error => console.log('An error occurred', error)).then(data => dispatch(teamCreated(data)));
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
    console.log('Creating team');
    axios.delete(`/api/teams/${id}`).then(response => response.data, error => console.log('An error occurred', error)).then(data => dispatch(teamRemoved(data)));
  }
}

export function teamRemoved(team) {
  return {
    type: 'TEAM_REMOVED',
    team
  }
}