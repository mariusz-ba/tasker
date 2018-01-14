import axios from 'axios';

/**
 * This action is dispatched every time users list
 * is requested for user
 * 
 * @param {ObjectId} user User id
 */
export function requestFriends(user) {
  return {
    type: 'REQUEST_FRIENDS',
    user
  }
}

/**
 * Use this function to fetch users friends
 * 
 * @param {ObjectId} user - User id
 */
export function fetchFriends(user) {
  return dispatch => {
    dispatch(requestFriends(user));
    return axios.get(`/api/users/${user}/friends`)
    .then(
      response => dispatch(receiveFriends(user, response.data)),
      error => console.log('An error occurred: ', error)
    )
  }
}

/**
 * This action is dispatched every time friends list
 * is received from the server
 * 
 * @param {ObjectId} user - User id
 * @param {Array} friends - Friends array
 */
export function receiveFriends(user, friends) {
  return {
    type: 'RECEIVE_FRIENDS',
    user,
    friends
  }
}

/**
 * Use this action to accept friend invite
 * 
 * @param {ObjectId} user - User id
 * @param {ObjectId} friend - Friend id
 */
export function confirmFriend(user, friend) {
  return dispatch => {
    return axios.post(`/api/users/${user}/friends/${friend}`)
    .then(
      response => dispatch(confirmedFriend(user, response.data)),
      error => console.log('An error occurred: ', error)
    )
  }
}

/**
 * This action is dispatched every time friend invite
 * is successfully accepted. Note that user may dispatch
 * confirmFriend action but invitation may not be accepted
 * on server side.
 * 
 * @param {ObjectId} user - User id
 * @param {Object} friend - Friend object
 */
export function confirmedFriend(user, friend) {
  return {
    type: 'CONFIRM_FRIEND',
    user,
    friend
  }
}

/**
 * Use this action to add new friend to users list
 * 
 * @param {ObjectId} user - User id
 * @param {ObjectId} friend - Friend id 
 */
export function addFriend(user, friend) {
  return dispatch => {
    return axios.put(`/api/users/${user}/friends/${friend}`)
    .then(
      response => dispatch(addedFriend(user, response.data)),
      error => console.log('An error occurred: ', error)
    )
  }
}

/**
 * This action is dispatched every time new friend
 * is added to users list
 * 
 * @param {ObjectId} user - User id
 * @param {Object} friend - Friend object
 */
export function addedFriend(user, friend) {
  return {
    type: 'ADD_FRIEND',
    user,
    friend
  }
}

/**
 * Use this action to delete users friend
 * 
 * @param {ObjectId} user - User id
 * @param {Object} friend - Friend id
 */
export function deleteFriend(user, friend) {
  return dispatch => {
    console.log('deleting friend: ', friend);
    return axios.delete(`/api/users/${user}/friends/${friend.friend_id}`)
    .then(
      response => dispatch(deletedFriend(user, friend.friendship_id, response.data)),
      error => console.log('An error occurred: ', error)
    )
  }
}

/**
 * This action is dispatched every time friend
 * is deleted
 * 
 * @param {ObjectId} user - User id
 * @param {Object} friend - Friend object
 * @param {Object} confirm - Data returned from the server
 */
export function deletedFriend(user, friend, confirm) {
  return {
    type: 'DELETE_FRIEND',
    user,
    friend,
    confirm
  }
}