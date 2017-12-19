// Module dependencies
var express = require('express')
  , router = express.Router();

const authenticate = require('../utils/authenticate');
const Task = require('../models/task');
// Routes

router
.get('/', authenticate, function(req, res) {

  //console.log('fetching tasks for user ', req.user);
  
  Task.find({ author: req.user._id }, function(err, tasks) {
    if(err) throw err;

    res.json(tasks);
  })
})
.put('/', authenticate, function(req, res) {
  console.log('Put: ', req.body);
  
  Task.create({
    description: req.body.description,
    completed: req.body.completed,
    author: req.user._id
  }, function(err, task) {
    if(err) throw err;
    console.log('New task created');
    res.status(201).json(task);
  })
})
.post('/:id', authenticate, function(req, res) {
  console.log('Post:');
  console.log(req.body);
  Task.findOneAndUpdate({_id: req.params.id}, {$set: {completed: req.body.task.completed}}, {new: true}, function(err, task) {
    if(err) throw err;
    res.status(200).json(task);
  })
})
.delete('/:id', authenticate, function(req, res) {
  console.log('Delete: ', req.params);

  const id = req.params.id;
  Task.deleteOne({
    _id: id
  }, function(err, result) {
    if(err) throw err;
    console.log('Task deleted: ', id);
    res.status(200).json({
      id: id,
      deletedCount: result.deletedCount 
    })
  })
})


module.exports = router;
