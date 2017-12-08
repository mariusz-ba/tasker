import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer';
import tasksReducer from './tasksReducer';

export default combineReducers({
  session: sessionReducer,
  tasks: tasksReducer
});
