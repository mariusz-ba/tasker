import axios from 'axios';

export function requestCards() {
  return {
    type: 'REQUEST_CARDS'
  }
}

export function receiveCards(cards) {
  return {
    type: 'RECEIVE_CARDS',
    cards
  }
}

export function fetchCards(project) {
  return dispatch => {
    dispatch(requestCards());
    
    return axios.get(`/api/projects/${project}/cards`).then(response => dispatch(receiveCards(response.data)), error => console.log('An error occurred: ', error));
  }
}

export function createCard(project, name) {
  return dispatch => {
    return axios.put(`/api/projects/${project}/cards`, { name }).then(response => dispatch(createdCard(response.data)), error => console.log('An error occurred: ', error));
  }
}

export function createdCard(card) {
  return {
    type: 'CREATED_CARD',
    card
  }
}