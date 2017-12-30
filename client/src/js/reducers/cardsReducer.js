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
    default: {}
  }
  return state;
}