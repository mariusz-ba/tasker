import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';

export function loginRequested(user) {
  return {
    type: 'REQUEST_LOGIN'
  }
}

export function setCurrentUser(user) {
  return {
    type: 'SET_CURRENT_USER',
    user
  }
}

export function setAuthErrors(errors) {
  return {
    type: 'SET_AUTH_ERRORS',
    errors
  }
}

/**
 * Use this action to perform logging in operation
 * @param {Object} user 
 */
export function requestLogin(user) {

  return function(dispatch) {

    dispatch(loginRequested(user));

    return axios.post('/api/auth', user)
    .then(response => {
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    })
    .catch(error => {
      dispatch(setAuthErrors(error.response.data.errors));
    })

  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function updateUser(id, user) {
  return dispatch => {
    return axios.post(`/api/users/${id}`, user)
    .then(
      response => dispatch(updatedUser(response.data)),
      error => console.log('An error occurred: ', error)
    )
  }
}

export function updatedUser(user) {
  return {
    type: 'UPDATE_USER',
    user
  }
}