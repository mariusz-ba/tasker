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

    // Comments - change to use object instead of array
    case 'RECEIVE_COMMENTS': {
      state = {
        ...state,
        tasks: {
          ...state.tasks,
          [action.task]: {
            ...state.tasks[action.task],
            comments: action.comments
          }
        }
      }
      break;
    }
    case 'ADD_COMMENT': {
      state = {
        ...state,
        tasks: {
          ...state.tasks,
          [action.task]: {
            ...state.tasks[action.task],
            comments: [
              ...state.tasks[action.task].comments,
              {
                ...action.comment
              }
            ]
          }
        }
      }
      break;
    }
    case 'DELETE_COMMENT': {
      state = {
        ...state,
        tasks: {
          ...state.tasks,
          [action.task]: {
            ...state.tasks[action.task],
            comments: state.tasks[action.task].comments.filter(comment => comment._id != action.comment._id)
          }
        }
      }
      break;
    }
    case 'UPDATE_COMMENT': {
      state = {
        ...state,
        tasks: {
          ...state.tasks,
          [action.task]: {
            ...state.tasks[action.task],
            comments: [
              ...state.tasks[action.task].comments.filter(comment => comment._id != action.comment._id),
              {
                ...action.comment
              }
            ]
          }
        }
      }
      break;
    }
    default: {}
  }
  return state;
}
