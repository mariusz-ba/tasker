import axios from 'axios';

export function fetchFriends(user) {
  return dispatch => {
    return axios.get(`/api/users/${user}/friends`)
    .then(
      response => dispatch(receiveFriends(user, response.data)),
      error => console.log('An error occurred: ', error)
    )
  }
}

export function receiveFriends(user, friends) {
  return {
    type: 'RECEIVE_FRIENDS',
    user,
    friends
  }
}

export function confirmFriend(user, friend) {
  return dispatch => {
    return axios.post(`/api/users/${user}/friends/${friend}`)
    .then(
      response => dispatch(confirmedFriend(user, friend)),
      error => console.log('An error occurred: ', error)
    )
  }
}

export function confirmedFriend(user, friend) {
  return {
    type: 'CONFIRM_FRIEND',
    user,
    friend
  }
}