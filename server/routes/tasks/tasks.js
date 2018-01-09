// Module dependencies
import express from 'express';
import authenticate from '../../utils/authenticate';

// Models
import Task from '../../models/task';
import User from '../../models/user';

// Router
const router = express.Router({ mergeParams: true });
router
.get('/', authenticate, (req, res, next) => {
  console.log('fetching tasks');
  // Get all tasks for project
  Task.find({ project: req.params.project }, (err, tasks) => {
    if(err) return next(err);

    res.json(tasks);
  })
})
.get('/:id', authenticate, (req, res, next) => {
  // Get task with specified id
  Task.findOne({ _id: req.params.id }, (err, task) => {
    if(err) return next(err);
    User.findOne({ _id: task.author }, {username: 1, fullName: 1}, (err, author) => {
      if(err) return next(err);
      res.status(200).json({
        ...task._doc,
        author
      });
    })
  })
})
.put('/', authenticate, (req, res, next) => {
  // Create new task
  console.log('Put: ', req.body);
  Task.create({
    description: req.body.description,
    completed: req.body.completed,
    author: req.user._id,
    project: req.params.project,
    card: req.body.card
  }, (err, task) => {
    if(err) return next(err);
    console.log('New task created');
    res.status(201).json(task);
  })
})
.post('/:id', authenticate, (req, res, next) => {
  // Update task
  console.log(`Post: ${req.body}`);
  Task.findOneAndUpdate({ _id: req.params.id }, { $set: { ...req.body } }, {new: true}, (err, task) => {
    if(err) return next(err);
    User.findOne({ _id: task.author }, {username: 1, fullName: 1}, (err, author) => {
      if(err) return next(err);
      res.status(200).json({
        ...task._doc,
        author
      });
    })
  })
})
.delete('/:id', authenticate, (req, res, next) => {
  // Delete task
  console.log('Delete: ', req.params);

  const id = req.params.id;
  Task.deleteOne({ _id: id }, (err, result) => {
    if(err) return next(err);
    console.log('Task deleted: ', id);
    res.status(200).json({
      deletedCount: result.deletedCount 
    })
  })
});

export default router;
