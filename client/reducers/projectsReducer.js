import _ from 'lodash';

const INITIAL_STATE = {
  fetching: false,
  projects: {}
}

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'REQUEST_PROJECTS': {
      state = { ...state, fetching: true }
      break;
    }
    case 'RECEIVE_PROJECTS': {
      state = { ...state, fetching: false, projects: _.mapKeys(action.projects, '_id') }
      break;
    }
    case 'REQUEST_PROJECT': {
      state = { ...state, fetching: true }
      break;
    }
    case 'RECEIVE_PROJECT': {
      state = { ...state, fetching: false, projects: { ...state.projects, [action.project._id]: action.project }};
      break;
    }
    case 'CREATE_PROJECT': {
      state = { ...state, projects: { ...state.projects, [action.project._id]: action.project }};
      break;
    }
    case 'DELETE_PROJECT': {
      state = { ...state, projects: _.omit(state.projects, action.id)}
      break;
    }
    case 'UPDATE_PROJECT': {
      state = { ...state, projects: { ...state.projects, [action.project._id]: action.project }}
      break;
    }
    default: {}
  }
  return state;
}