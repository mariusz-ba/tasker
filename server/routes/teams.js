// Module dependencies
import express from 'express';
import authenticate from '../utils/authenticate';

// Models
import Team from '../models/team';
import Project from '../models/project';
import User from '../models/user';

// Router
const router = express.Router();
router
.get('/', authenticate, (req, res, next) => {
  // Get all teams user is assigned to
  /*Team.findByMemberId(req.user._id, function(err, teams) {
    if(err) return next(err);
    console.log('Searching teams', teams);
    res.json(teams);
  })
  */
  User.findOne({ _id: req.user._id }, (err, user) => {
    if(err) return next(err);
    Team.find({ _id: { $in: user.teams }}, (err, teams) => {
      if(err) return next(err);
      res.status(200).json(teams);
    })
  })
})
.get('/:id', authenticate, (req, res, next) => {
  Team.findOne({ _id: req.params.id }, (err, team) => {
    if(err) return next(err);
    User.find({ teams: req.params.id }, { password: false }, (err, users) => {
      res.status(200).json({ _id: team._id, name: team.name, users });
    })
  })
})
.put('/', authenticate, (req, res, next) => {
  // Create new team
  console.log(req.body);
  Team.create({
    name: req.body.name,
    //users: [req.user._id]
  }, (err, team) => {
    if(err) return next(err);
    console.log('New team created');
    // Ad user to this team
    User.findOneAndUpdate({ _id: req.user._id }, { $push: { teams: team._id }}, {new: true}, (err, user) => {
      if(err) return next(err);
      res.status(201).json({
        _id: team._id,
        name: team.name,
        users: [user._id]
      });
    })
  })
})
.post('/:id', authenticate, (req, res) => {
  // Update team

})
.delete('/:id', authenticate, (req, res, next) => {
  // Delete team
  console.log('Remove team: ', req.params.id);
  Team.deleteOne({ _id: req.params.id }, (err) => {
    if(err) return next(err);
    // Remove users from that team
    User.update({ teams: req.params.id }, { $pull: { teams: req.params.id }}, (err) => {
      if(err) return next(err);
      // Remove that team from projects
      Project.update({ teams: req.params.id }, { $pull: { teams: req.params.id }}, (err) => {
        if(err) return next(err);
        res.status(200).json(req.params.id);
      })
    })
  })
})

export default router;