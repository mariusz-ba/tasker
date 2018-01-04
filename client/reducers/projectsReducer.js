const initialState = {
  fetching: false,
  projects: []
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'REQUEST_PROJECTS': {
      state = { ...state, fetching: true }
      break;
    }
    case 'RECEIVE_PROJECTS': {
      state = { fetching: false, projects: action.projects }
      break;
    }
    case 'REQUEST_PROJECT': {
      state = { ...state, fetching: true }
      break;
    }
    case 'RECEIVE_PROJECT': {
      state = {
        fetching: false,
        projects: [
          ...state.projects.filter(project => project._id !== action.project._id),
          {
            ...action.project
          }
        ]
      }
      break;
    }
    case 'CREATED_PROJECT': {
      state = {
        ...state,
        projects: [
          ...state.projects,
          {
            ...action.project
          }
        ]
      }
      break;
    }
    case 'DELETED_PROJECT': {
      state = {
        ...state,
        projects: state.projects.filter(project => project._id !== action.id)
      }
      break;
    }
    default: {}
  }
  return state;
}