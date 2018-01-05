import _ from 'lodash';

const INITIAL_STATE = {
  fetching: false,
  tasks: {}
}

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'REQUEST_TASK': {
      state = { ...state, fetching: true };
      break;
    }
    case 'RECEIVE_TASK': {
      state = { ...state, fetching: false, tasks: { ...state.tasks, [action.task._id]: action.task }};
      break;
    }
    case 'REQUEST_TASKS': {
      state = { ...state, fetching: true };
      break;
    }
    case 'RECEIVE_TASKS': {
      state = { ...state, fetching: false, tasks: _.mapKeys(action.tasks, '_id')};
      break;
    }
    case 'CREATE_TASK': {
      state = { ...state, tasks: { ...state.tasks, [action.task._id]: action.task }};
      break;
    }
    case 'UPDATE_TASK': {
      state = { ...state, tasks: { ...state.tasks, [action.task._id]: action.task }};
      break;
    }
    case 'DELETE_TASK': {
      state = { ...state, tasks: _.omit(state.tasks, action.id)};
      break;
    }
    default: {}
  }
  return state;
}
