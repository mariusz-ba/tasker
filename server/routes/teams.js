// Module dependencies
import express from 'express';
import authenticate from '../utils/authenticate';

// Models
import Team from '../models/team';
import Project from '../models/project';
import User from '../models/user';

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
.get  ('/:id' , authenticate, TeamsController.getTeam)
.put  ('/'    , authenticate, TeamsController.createTeam)
.post ('/:id' , authenticate, TeamsController.updateTeam)
.delete('/:id', authenticate, TeamsController.deleteTeam)//(req, res, next) => {
//   // Delete team
//   console.log('Remove team: ', req.params.id);
//   Team.deleteOne({ _id: req.params.id }, (err) => {
//     if(err) return next(err);
//     // Remove users from that team
//     User.update({ teams: req.params.id }, { $pull: { teams: req.params.id }}, {multi: true}, (err) => {
//       if(err) return next(err);
//       // Remove that team from projects
//       Project.update({ teams: req.params.id }, { $pull: { teams: req.params.id }}, (err) => {
//         if(err) return next(err);
//         res.status(200).json(req.params.id);
//       })
//     })
//   })
// })

export default router;