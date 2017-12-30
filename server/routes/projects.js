const express = require('express')
  , router = express.Router();

const authenticate = require('../utils/authenticate');
const Card = require('../models/card');
const Project = require('../models/project');

router
.get('/', authenticate, function(req, res, next) {
  // Return all projects user is assigned to
  Project.find({}, function(err, projects) {
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
    users: [req.user._id]
  }, function(err, project) {
    if(err) return next(err);
    res.status(201).json(project);
  })
})
.delete('/:id', authenticate, function(req, res, next) {
  // Delete project
  Project.deleteOne({ _id: req.params.id }, function(err, result) {
    if(err) return next(err);
    res.status(200).json({
      id: req.params.id,
      deletedCount: result.deletedCount
    })
  })
})
/*
.put('/:id', authenticate, function(req, res, next) {
  // Create new card
  Card.create({ name: req.body.name }, function(err, card) {
    if(err) return next(err);
    Project.addCard(req.params.id, card._id, function(err, project) {
      res.status(200).json(project);
    })
  })
})
.delete('/:id/cards/:card', authenticate, function(req, res, next) {
  // Delete card
  Cards.remove({ _id: req.params.card }, function(err) {
    if(err) return next(err);
    Project.deleteCard(req.params.id, req.params.card, function(err, project) {
      if(err) return next(err);
      res.status(200).json(project);
    })
  })
})
.post('/:id/cards/:card', authenticate, function(req, res, next) {
  // Add task to card
  Card.findOneAndUpdate({ _id: req.params.card }, { $push: {tasks: req.body.task}}, {new: true}, function(err, card) {
    if(err) return next(err);
    // return project card what ?
  })
})
*/

module.exports = router;