export default function reducer(state = [], action) {
  switch(action.type) {
    case 'REQUEST_PROJECTS': {
      break;
    }
    case 'RECEIVE_PROJECTS': {
      state = action.projects
      break;
    }
    case 'CREATED_PROJECT': {
      state = [
        ...state,
        {
          ...action.project
        }
      ]
      break;
    }
    case 'DELETED_PROJECT': {
      state = state.filter(project => project._id !== action.id);
      break;
    }
    default: {}
  }
  return state;
}