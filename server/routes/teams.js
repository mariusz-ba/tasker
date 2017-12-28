// Module dependencies
const express = require('express')
  , router = express.Router();

const authenticate = require('../utils/authenticate');
const Team = require('../models/team');
const Task = require('../models/task');

router
.get('/', authenticate, function(req, res) {
  // Get all teams user is assigned to
  Team.findByMemberId(req.user._id, function(err, teams) {
    if(err) throw(err);
    console.log('Searching teams', teams);
    res.json(teams);
  })
})
.put('/', authenticate, function(req, res) {
  // Create new team
  console.log(req.body);
  Team.create({
    name: req.body.name,
    users: [req.user._id]
  }, function(err, team) {
    if(err) throw err;
    console.log('New team created');
    res.status(201).json(team);
  })
})
.post('/:id', authenticate, function(req, res) {
  // Update team

})
.delete('/:id', authenticate, function(req, res) {
  // Delete team
  console.log('Remove team: ', req.params.id);
  Team.findOne({ _id: req.params.id }, function(err, team) {
    if(err) throw err;
    // Team exists reomve tasks assigned to that team
    team.tasks.forEach(function(id) {
      Task.remove({ _id: id }, function(err) {
        if(err) throw err;
      })
    })
  }).remove(function(err) {
    if(err) throw err;
    res.status(200).json(req.params.id);
  });

})

module.exports = router;