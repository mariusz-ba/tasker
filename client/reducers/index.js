import { combineReducers } from 'redux';

import authReducer from './authReducer';
import cardsReducer from './cardsReducer';
import usersReducer from './usersReducer';
import projectsReducer from './projectsReducer';
import tasksReducer from './tasksReducer';
import teamsReducer from './teamsReducer';

export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  tasks: tasksReducer,
  teams: teamsReducer,
  projects: projectsReducer,
  cards: cardsReducer
});
