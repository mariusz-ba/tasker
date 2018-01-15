import { fetchProject } from '../projectsActions'; 
import { fetchCards } from '../cardsActions';
import { fetchTask, fetchTasks } from '../tasksActions';
import { fetchUsers } from '../usersActions';
import { fetchTeams } from '../teamsActions';

import { unionBy } from 'lodash';

export const fetchTaskPage = (project, task) => {
  return (dispatch, getState) => {
    return dispatch(fetchTask(project, task)).then(() => {
      const fetchedTask = getState().tasks.tasks[task];
      // Get users
      const users = unionBy(fetchedTask.comments, 'author').map(comment => comment.author);
      console.log(users);
      // Fetch task author and comments authors
      dispatch(fetchUsers(users))
    })
  }
}

export const fetchProjectPage = (project) => {
  return (dispatch, getState) => {
    return dispatch(fetchProject(project)).then(() => {
      const fetchedProject = getState().projects.projects[project];
      //Get teams
      const teams = fetchedProject.teams.length ? fetchedProject.teams : ['000000000000000000000000']; //XD
      dispatch(fetchTeams(teams))
      //Get cards
      dispatch(fetchCards(project));
      //Get tasks
      dispatch(fetchTasks(project));
    })
  }
}