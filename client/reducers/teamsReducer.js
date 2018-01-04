export default function reducer(state = [], action) {
  switch(action.type) {
    case 'RECEIVE_TEAMS': {
      state = action.teams;
      break;
    }
    case 'RECEIVE_TEAM': {
      state = [
        ...state.filter(team => team._id !== action.team._id),
        {
          ...action.team
        }
      ]
      break;
    }
    case 'TEAM_CREATED': {
      state = [
        ...state,
        {
          ...action.team
        }
      ]
      break;
    }
    case 'TEAM_REMOVED': {
      state = state.filter(team => team._id !== action.id);
      break;
    }
    default: {}
  }
  return state;
}