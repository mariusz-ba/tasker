// Module dependencies
import express from 'express';
import authenticate from '../../utils/authenticate';

// Models
import Task from '../../models/task';

const router = express.Router({mergeParams: true});
router
.get('/', (req, res, next) => {
  // Getting comments

  Task.getComments(req.params.task)
  .then(task => res.status(200).json(task.comments))
  .catch(err => next(err));
})
.get('/:id', (req, res, next) => {
  // Gettign comment by id

  Task.getComments(req.params.task)
  .then(task => res.status(200).json(task.comments.find(e => e._id == req.params.id)))
  .catch(err => next(err));
})
.put('/', authenticate, (req, res, next) => {
  // Adding new comment

  Task.addComment(req.params.task, req.user._id, req.body.content)
  .then(task => res.status(201).json(task.comments[task.comments.length - 1]))
  .catch(err => next(err));
})
.post('/:id', authenticate, (req, res, next) => {
  // Updating comment

  Task.updateComment(req.params.task, req.params.id, req.user._id, req.body.content)
  .then(task => res.status(200).json(task.comments.find(e => e._id == req.params.id)))
  .catch(err => next(err));
})
.delete('/:id', authenticate, (req, res, next) => {
  // Deleting comment

  Task.deleteComment(req.params.task, req.params.id)
  .then(task => res.status(200).json({ _id: req.params.id }))
  .catch(err => next(err));
})

export default router;