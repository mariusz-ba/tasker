import axios from 'axios';
/**
 * Use this action to fetch users
 * 
 * @param {Array} users - Array with users ids [1, 2, 3]...
 */
export function fetchUsers(users) {
  return dispatch => {
    dispatch(requestUsers());
    return axios.get('/api/users', { params: { users }})
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

/**
 * Use this action to fetch data about user
 * specified by his id
 * 
 * @param {ObjectId} id - User id
 */
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

/**
 * This action is dispatched every time user
 * is requested from the server
 * 
 * @param {ObjectId} id - User id
 */
export function requestUser(id) {
  return {
    type: 'REQUEST_USER',
    id
  }
}

/**
 * This action is dispatched every time user
 * data is received from the server
 * 
 * @param {Object} user - User object received from the server
 */
export function receiveUser(user) {
  return {
    type: 'RECEIVE_USER',
    user
  }
}