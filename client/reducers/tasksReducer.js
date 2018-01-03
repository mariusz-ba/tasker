export default function reducer(state = [], action) {
  console.log(action.type);
  switch(action.type) {
    case 'RECEIVE_TASK': {
      state = [
        ...state.filter(task => task._id !== action.task._id),
        {
          ...action.task
        }
      ]
      break;
    }
    case 'RECEIVE_TASKS': {
      state = action.tasks;
      break;
    }
    case 'CREATED_TASK': {
      const { task } = action;
      state = [
        ...state,
        {
          ...task
        }
      ]
      break;
    }
    case 'DELETED_TASK': {
      state = state.filter(task => task._id !== action.id);
      break;
    }
    case 'UPDATED_TASK': {
      state = [
        ...state.filter(task => task._id !== action.task._id),
        {
          ...action.task
        }
      ]
      break;
    }
    default: {}
  }
  return state;
}
