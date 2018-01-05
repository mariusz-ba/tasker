import axios from 'axios';

/**
 * This action is dispatched every time cards
 * are requested from the server
 */
export function requestCards() {
  return {
    type: 'REQUEST_CARDS'
  }
}

/**
 * This action is dispatched every time cards
 * are successfully received from the server
 * 
 * @param {Array} cards 
 */
export function receiveCards(cards) {
  return {
    type: 'RECEIVE_CARDS',
    cards
  }
}

/**
 * Use this action to fetch cards from the server
 * 
 * @param {ObjectId} project - Project id
 */
export function fetchCards(project) {
  return dispatch => {
    dispatch(requestCards()); 
    return axios.get(`/api/projects/${project}/cards`)
    .then(
      response => dispatch(receiveCards(response.data)),
      error => console.log('An error occurred: ', error)
    );
  }
}

/**
 * Use this action to create new cards
 * 
 * @param {ObjectId} project 
 * @param {String} name 
 */
export function createCard(project, name) {
  return dispatch => {
    return axios.put(`/api/projects/${project}/cards`, { name })
    .then(
      response => dispatch(createdCard(response.data)),
      error => console.log('An error occurred: ', error)
    );
  }
}

/**
 * This action is dispatched every time a new
 * card is created
 * 
 * @param {Object} card - Card object received from the server
 */
export function createdCard(card) {
  return {
    type: 'CREATE_CARD',
    card
  }
}

/**
 * Use this action to update existing card inside project.
 * 
 * @param {ObjectId} project - Id of a project that contains this card
 * @param {ObjectId} id - Id of a card to update
 * @param {Object} card - Object with new card values
 */
export function updateCard(project, id, card) {
  return dispatch => {
    return axios.post(`/api/projects/${project}/cards/${id}`, {...card})
    .then(
      response => dispatch(updatedCard(response.data)),
      error => console.log('An error occurred: ', error)
    )
  }
}

/**
 * This action is dispatched every time card id
 * successfully updated.
 * 
 * @param {Object} card - Card object returned from the server
 */
export function updatedCard(card) {
  return {
    type: 'UPDATE_CARD',
    card
  }
}

/**
 * Use this action to delete card from an
 * existing project
 * 
 * @param {ObjectId} project - Id of a project card is assigned to
 * @param {ObjectId} id - Card id
 */
export function deleteCard(project, id) {
  return dispatch => {
    return axios.delete(`/api/projects/${project}/cards/${id}`)
    .then(
      response => dispatch(deletedCard(id)),
      error => console.log('An error occurred: ', error)
    )
  }
}

/**
 * This action is dispatched every time card is
 * successfully deleted
 * 
 * @param {ObjectId} id - Deleted card id
 */
export function deletedCard(id) {
  return {
    type: 'DELETE_CARD',
    id
  }
}