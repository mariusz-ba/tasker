export default function reducer(state = [], action) {
  switch(action.type) {
    case 'REQUEST_CARDS': {
      break;
    }
    case 'RECEIVE_CARDS': {
      state = action.cards
      break;
    }
    case 'CREATED_CARD': {
      state = [
        ...state,
        {
          ...action.card
        }
      ]
      break;
    }
    case 'UPDATED_CARD': {
      state = [
        ...state.filter(card => card._id !== action.card._id),
        {
          ...action.card
        }
      ]
      break;
    }
    case 'DELETED_CARD': {
      state = state.filter(card => card._id !== action.id);
      break;
    }
    default: {}
  }
  return state;
}