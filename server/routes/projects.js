// Module dependencies
import express from 'express';
import authenticate from '../utils/authenticate';
import { accessProject } from '../utils/permissions';

// Models
import Card from '../models/card';
import Project from '../models/project';
import Task from '../models/task';
import User from '../models/user';

// Router
const router = express.Router();
router
.get('/', authenticate, (req, res, next) => {
  // Return projects for user by body id
  if(req.query.user) {
    User.findOne({ _id: req.query.user })
    .then(user => {
      Project.find({
        $or: [
          {author: user._id},
          {teams: { $in: user.teams }}
        ]
      }, (err, projects) => {
        if(err) return next(err);
        res.status(200).json(projects);
      })
    })
    .catch(err => next(err));
  } else {
    // Return all projects user is assigned to
    console.log('Fetching projects for: ', req.user._id);
    Project.find({
      $or: [
        {author: req.user._id},
        {teams: { $in: req.user.teams }}
      ]
    }, (err, projects) => {
      if(err) return next(err);
      res.status(200).json(projects);
    })
  }
})
.get('/:id', authenticate, accessProject, (req, res, next) => {
  // Return project with specified id
  Project.findOne({ _id: req.params.id }, (err, project) => {
    if(err) return next(err);
    res.status(200).json(project);
  })
})
.put('/', authenticate, (req, res, next) => {
  // Create new project
  Project.create({
    name: req.body.name,
    description: req.body.description,
    teams: (req.body.teams.length ? req.body.teams : []),
    author: req.user._id
  }, (err, project) => {
    if(err) return next(err);
    res.status(201).json(project);
  })
})
.delete('/:id', authenticate, accessProject, (req, res, next) => {
  // Delete project
  const id = req.params.id;
  Project.deleteOne({ _id: id }, (err, projects) => {
    if(err) return next(err);
    // Delete cards and tasks that refer to this project
    Card.remove({ project: id }, (err, cards) => {
      if(err) return next(err);
      Task.remove({ project: id }, (err, tasks) => {
        if(err) return next(err);
        console.log(cards, tasks);
        res.status(200).json({
          id,
          removed: {
            projects: projects.deletedCount,
            cards: cards.n,
            tasks: tasks.n
          }
        })
      })
    })
  })
})
.post('/:id', authenticate, accessProject, (req, res, next) => {
  // Update project
  Project.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      $set: { ...req.body }
    },
    {new: true}, (err, project) => {
      if(err) return next(err);
      res.status(200).json(project);
  })
})
export default router;