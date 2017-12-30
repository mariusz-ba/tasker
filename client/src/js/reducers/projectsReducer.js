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
    default: {}
  }
  return state;
}