// Module dependencies
const express = require('express')
  , router = express.Router();

const authenticate = require('../utils/authenticate');
const Team = require('../models/team');
const Project = require('../models/project');
const User = require('../models/user');

router
.get('/', authenticate, function(req, res, next) {
  // Get all teams user is assigned to
  /*Team.findByMemberId(req.user._id, function(err, teams) {
    if(err) return next(err);
    console.log('Searching teams', teams);
    res.json(teams);
  })
  */
  User.findOne({ _id: req.user._id }, function(err, user) {
    if(err) return next(err);
    Team.find({ _id: { $in: user.teams }}, function(err, teams) {
      if(err) return next(err);
      res.status(200).json(teams);
    })
  })
})
.put('/', authenticate, function(req, res, next) {
  // Create new team
  console.log(req.body);
  Team.create({
    name: req.body.name,
    //users: [req.user._id]
  }, function(err, team) {
    if(err) return next(err);
    console.log('New team created');
    // Ad user to this team
    User.findOneAndUpdate({ _id: req.user._id }, { $push: { teams: team._id }}, {new: true}, function(err, user) {
      if(err) return next(err);
      res.status(201).json({
        _id: team._id,
        name: team.name,
        users: [user._id]
      });
    })
  })
})
.post('/:id', authenticate, function(req, res) {
  // Update team

})
.delete('/:id', authenticate, function(req, res, next) {
  // Delete team
  console.log('Remove team: ', req.params.id);
  Team.deleteOne({ _id: req.params.id }, function(err) {
    if(err) return next(err);
    // Remove users from that team
    User.update({ teams: req.params.id }, { $pull: { teams: req.params.id }}, function(err) {
      if(err) return next(err);
      // Remove that team from projects
      Project.update({ teams: req.params.id }, { $pull: { teams: req.params.id }}, function(err) {
        if(err) return next(err);
        res.status(200).json(req.params.id);
      })
    })
  })
})

module.exports = router;