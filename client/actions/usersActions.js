import axios from 'axios';
/**
 * Use this action to fetch users
 * 
 * @param {Object} filter - Filter eg. { username: /\.*john/ }
 */
export function fetchUsers(filter) {
  return dispatch => {
    dispatch(requestUsers());
    return axios.get('/api/users', ...filter)
    .then(
      response => dispatch(receiveUsers(response.data)),
      error => console.log('An error occurred: ', error)
    )
  }
}

/**
 * This action is dispatched every time a users
 * list is requested from the server
 */
export function requestUsers(filter) {
  return {
    type: 'REQUEST_USERS',
    filter
  }
}

/**
 * This action is dispatched every time users
 * list is successfully received from the server
 * 
 * @param {Array} users 
 */
export function receiveUsers(users) {
  return {
    type: 'RECEIVE_USERS',
    users
  }
}

export function fetchUser(id) {
  return dispatch => {
    console.log('id: ', id);
    dispatch(requestUser(id));
    return axios.get(`/api/users/${id}`)
    .then(
      response => dispatch(receiveUser(response.data)),
      error => console.log('An error occurred: ', error)
    )
  }
}

export function requestUser(id) {
  return {
    type: 'REQUEST_USER',
    id
  }
}

export function receiveUser(user) {
  return {
    type: 'RECEIVE_USER',
    user
  }
}