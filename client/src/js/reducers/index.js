import { combineReducers } from 'redux';

import authReducer from './authReducer';
import tasksReducer from './tasksReducer';
import teamsReducer from './teamsReducer';

export default combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
  teams: teamsReducer
});
