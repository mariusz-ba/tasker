export default function reducer(state = [], action) {
  console.log(action.type);
  switch(action.type) {
    case 'CREATE_TASK': {
      const { text, completed } = action;
      state = [
        ...state,
        {
          id: Date.now(),
          text,
          completed
        }
      ]
      break;
    }
    case 'RECEIVE_TASKS': {
      state = action.tasks;
      break;
    }
    default: {}
  }
  console.log(state);
  return state;
}
