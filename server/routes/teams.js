// Module dependencies
import express from 'express';
import authenticate from '../utils/authenticate';
import { accessTeam } from '../utils/permissions';

import * as TeamsController from '../controllers/teamsController';

// Router
const router = express.Router();
router
.get('/', authenticate, (req, res, next) => {
  // Fetching teams user is assigned to. If query.teams
  // param is specified only specified teams are returned.
  if(req.query.teams)
    TeamsController.getTeams(req, res, next);
  else
    TeamsController.getUserTeams(req, res, next);
})
.get    ('/:id' , authenticate, accessTeam, TeamsController.getTeam)
.put    ('/'    , authenticate, TeamsController.createTeam)
.post   ('/:id' , authenticate, accessTeam, TeamsController.updateTeam)
.delete ('/:id' , authenticate, accessTeam, TeamsController.deleteTeam)

export default router;