import { combineReducers } from 'redux';

import authReducer from './authReducer';
import cardsReducer from './cardsReducer';
import tasksReducer from './tasksReducer';
import teamsReducer from './teamsReducer';
import projectsReducer from './projectsReducer';

export default combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
  teams: teamsReducer,
  projects: projectsReducer,
  cards: cardsReducer
});
