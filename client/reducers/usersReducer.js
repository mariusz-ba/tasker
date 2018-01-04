import _ from 'lodash';

const INITIAL_STATE = {
  fetching: false,
  users: {}
};

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'REQUEST_USER': {
      state = { ...state, fetching: true };
      break;
    }
    case 'RECEIVE_USER': {
      state = { ...state, fetching: false, users: { ...state.users, [action.user._id]: action.user }};
      break;
    }
    case 'REQUEST_USERS': {
      state = { ...state, fetching: true };
      break;
    }
    case 'RECEIVE_USERS': {
      state = { ...state, fetching: false, users: _.mapKeys(action.users, '_id') };
      break;
    }
    case 'UPDATE_USER': {
      break;
    }
    case 'DELETE_USER': {
      break;
    }
    default: {}
  }
  return state;
}