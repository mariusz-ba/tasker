import _ from 'lodash';

const INITIAL_STATE = {
  fetching: false,
  teams: {}
}

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'REQUEST_TEAMS': {
      state = { ...state, fetching: true };
      break;
    }
    case 'RECEIVE_TEAMS': {
      state = { ...state, fetching: false, teams: _.mapKeys(action.teams, '_id')};
      break;
    }
    case 'REQUEST_TEAM': {
      state = { ...state, fetching: true };
      break;
    }
    case 'RECEIVE_TEAM': {
      state = { ...state, fetching: false, teams: { ...state.teams, [action.team._id]: action.team }};
      break;
    }
    case 'CREATE_TEAM': {
      state = { ...state, teams: { ...state.teams, [action.team._id]: action.team }};
      break;
    }
    case 'DELETE_TEAM': {
      state = { ...state, teams: _.omit(state.teams, action.id)};
      break;
    }
    case 'UPDATE_TEAM': {
      state = { ...state, teams: { ...state.teams, [action.team._id]: action.team }};
      break;
    }
    default: {}
  }
  return state;
}