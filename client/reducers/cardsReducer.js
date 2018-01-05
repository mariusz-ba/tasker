import _ from 'lodash';

const INITIAL_STATE = {
  fetching: false,
  cards: {}
};

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'REQUEST_CARDS': {
      state = { ...state, fetching: true }
      break;
    }
    case 'RECEIVE_CARDS': {
      state = { ...state, fetching: false, cards: _.mapKeys(action.cards, '_id')};
      break;
    }
    case 'CREATE_CARD': {
      state = { ...state, cards: { ...state.cards, [action.card._id]: action.card }};
      break;
    }
    case 'UPDATE_CARD': {
      state = { ...state, cards: { ...state.cards, [action.card._id]: action.card }};
      break;
    }
    case 'DELETE_CARD': {
      state = { ...state, cards: _.omit(state.cards, action.id)};
      break;
    }
    default: {}
  }
  return state;
}