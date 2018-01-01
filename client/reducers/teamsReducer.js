export default function reducer(state = [], action) {
  switch(action.type) {
    case 'RECEIVE_TEAMS': {
      state = action.teams;
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
      state = state.filter(team => team._id !== action.team);
      break;
    }
    default: {}
  }
  return state;
}