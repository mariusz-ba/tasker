const express = require('express')
  , router = express.Router();

const authenticate = require('../utils/authenticate');
const Card = require('../models/card');
const Project = require('../models/project');
const Task = require('../models/task');

router
.get('/', authenticate, function(req, res, next) {
  // Return all projects user is assigned to
  console.log('Fetching projects for: ', req.user);
  Project.find({
    $or: [
      {users: req.user._id},
      {teams: { $in: req.user.teams }}
    ]
  }, function(err, projects) {
    if(err) return next(err);
    res.status(200).json(projects);
  })
})
.get('/:id', authenticate, function(req, res, next) {
  // Return project with specified id
  Project.findOne({ _id: req.params.id }, function(err, project) {
    if(err) return next(err);
    res.status(200).json(project);
  })
})
.put('/', authenticate, function(req, res, next) {
  // Create new project
  Project.create({
    name: req.body.name,
    description: req.body.description,
    teams: (req.body.teams.length ? req.body.teams : []),
    users: [req.user._id]
  }, function(err, project) {
    if(err) return next(err);
    res.status(201).json(project);
  })
})
.delete('/:id', authenticate, function(req, res, next) {
  // Delete project
  const id = req.params.id;
  Project.deleteOne({ _id: id }, function(err, projects) {
    if(err) return next(err);
    // Delete cards and tasks that refer to this project
    Card.remove({ project: id }, function(err, cards) {
      if(err) return next(err);
      Task.remove({ project: id }, function(err, tasks) {
        if(err) return next(err);
        res.status(200).json({
          id,
          removed: {
            projects: projects.deletedCount,
            cards: cards.result.n,
            tasks: tasks.result.n
          }
        })
      })
    })
  })
})

module.exports = router;