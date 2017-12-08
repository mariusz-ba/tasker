import axios from 'axios';

export function loginRequested(user) {
  return {
    type: 'LOGIN_REQUESTED'
  }
}

/**
 * Action emited whenever user was successfully logged in
 * @param {Object} data 
 */
export function loginSuccess(data) {
  return {
    type: 'LOGIN_SUCCESS',
    data
  }
}

/**
 * Action emited whenever user fails to log in
 * @param {Object} error 
 */
export function loginFailure(error) {
  return {
    type: 'LOGIN_FAILURE',
    error
  }
}

/**
 * Use this action to perform logging in operation
 * @param {Object} user 
 */
export function requestLogin(user) {

  return function(dispatch) {

    dispatch(loginRequested(user));

    return axios.post('/api/auth', {
      action: 'LOGIN',
      ...user
    })
    .then(
      response => response.data,
      error => dispatch(loginFailure(error))
    )
    .then( data =>
      dispatch(loginSuccess(data))
    )

  }

}