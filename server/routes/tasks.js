// Module dependencies
var express = require('express')
  , router = express.Router({ mergeParams: true });

const authenticate = require('../utils/authenticate');
const Task = require('../models/task');
// Routes

router
.get('/', authenticate, function(req, res, next) {
  // Get all tasks for project
  Task.find({ project: req.params.project }, function(err, tasks) {
    if(err) return next(err);

    res.json(tasks);
  })
})
.put('/', authenticate, function(req, res, next) {
  // Create new task
  console.log('Put: ', req.body);
  Task.create({
    description: req.body.description,
    completed: req.body.completed,
    author: req.user._id,
    project: req.params.project,
    card: req.body.card
  }, function(err, task) {
    if(err) return next(err);
    console.log('New task created');
    res.status(201).json(task);
  })
})
.post('/:id', authenticate, (req, res, next) => {
  // Update task
  console.log(`Post: ${req.body}`);
  Task.findOneAndUpdate({ _id: req.params.id }, { $set: { ...req.body.task } }, {new: true}, (err, task) => {
    if(err) return next(err);
    res.status(200).json(task);
  })
})
.delete('/:id', authenticate, function(req, res, next) {
  // Delete task
  console.log('Delete: ', req.params);

  const id = req.params.id;
  Task.deleteOne({
    _id: id
  }, function(err, result) {
    if(err) return next(err);
    console.log('Task deleted: ', id);
    res.status(200).json({
      id: id,
      deletedCount: result.deletedCount 
    })
  })
});

module.exports = router;
