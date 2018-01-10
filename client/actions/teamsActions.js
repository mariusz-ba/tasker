import axios from 'axios';

/**
 * Use this action to fetch teams
 * from database
 */
export function fetchTeams(teams) {
  return dispatch => {
    return axios.get('/api/teams', { params: { teams }})
    .then(
      response => dispatch(receiveTeams(response.data)),
      error => console.log('An error occurred', error)
    );
  }
}

/**
 * This action is dispatched every time teams
 * are received from the server
 * 
 * @param {Array} teams - Teams returned from the server
 */
export function receiveTeams(teams) {
  return {
    type: 'RECEIVE_TEAMS',
    teams
  }
}

/**
 * Use this action to fetch data about
 * specific team
 * 
 * @param {ObjectId} id - Team id
 */
export function fetchTeam(id) {
  return dispatch => {
    return axios.get(`/api/teams/${id}`)
    .then(
      response => dispatch(receiveTeam(response.data)),
      error => console.log('An error occurred: ', error)
    );
  }
}

/**
 * This action is dispatched every time 
 * team is received from the server
 * 
 * @param {Object} team - Team received from the server
 */
export function receiveTeam(team) {
  return {
    type: 'RECEIVE_TEAM',
    team
  }
}

/**
 * Use this action to create new team
 * 
 * @param {Object} team - Object that contains team data eg. {name: 'test'}
 */
export function createTeam(team) {
  return dispatch => {
    return axios.put('/api/teams', team)
    .then(
      response => dispatch(createdTeam(response.data)),
      error => console.log('An error occurred', error)
    );
  }
}

/**
 * This action is dispatched every time new
 * team is created
 * 
 * @param {Object} team - Team that has been created
 */
export function createdTeam(team) {
  return {
    type: 'CREATE_TEAM',
    team
  }
}

/**
 * Use this action to delete team specified
 * by its id
 * 
 * @param {ObjectId} id - Id of a team to delete
 */
export function deleteTeam(id) {
  return dispatch => {
    return axios.delete(`/api/teams/${id}`)
    .then(
      response => dispatch(deletedTeam(response.data)),
      error => console.log('An error occurred', error)
    );
  }
}

/**
 * This action is dispatched every time team
 * is deleted
 * 
 * @param {Object} id - Id of a team that has been deleted
 */
export function deletedTeam(id) {
  return {
    type: 'DELETE_TEAM',
    id
  }
}

/**
 * Use this action to modify existing project data
 * 
 * @param {ObjectId} id - Team id
 * @param {Object} team - Object with new team data
 */
export function updateTeam(id, team) {
  return dispatch => {
    return axios.post(`/api/teams/${id}`, team)
    .then(
      response => dispatch(updatedTeam(response.data)),
      error => console.log('An error occurred: ', error)
    )
  }
}

/**
 * This action is dispatched every time team is updated
 * 
 * @param {Object} team - Updated team object
 */
export const updatedTeam = (team) => ({
  type: 'UPDATE_TEAM',
  team
})