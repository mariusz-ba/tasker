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
    if(req.query.teams) {
      Team.find({
        $and: [
          { _id: { $in: user.teams }},
          { _id: { $in: req.query.teams }}
        ]
      }, (err, teams) => {
        if(err) return next(err);
        res.status(200).json(teams);
      })
    } else {
      Team.find({ _id: { $in: user.teams }}, (err, teams) => {
        if(err) return next(err);
        res.status(200).json(teams);
      })
    }
  })
})
.get('/:id', authenticate, (req, res, next) => {
  Team.findOne({ _id: req.params.id }, (err, team) => {
    if(err) return next(err);
    if(!team) return next(new Error('Team does not exist'));
    User.find({ teams: req.params.id }, { password: false }, (err, users) => {
      res.status(200).json({ _id: team._id, name: team.name, users });
    })
  })
})
.put('/', authenticate, (req, res, next) => {
  // Create new team
  // req.body.users = [id, id, id]
  console.log(req.body);
  Team.create({
    name: req.body.name
  }, (err, team) => {
    if(err) return next(err);
    console.log('New team created');
    // Ad creator and req.body.users to this team
    User.update({
      _id: { $in: [...req.body.users, req.user._id] }
    }, { $push: { teams: team._id }}, {multi: true}, (err) => {
      if(err) return next(err);
      res.status(201).json({
        _id: team._id,
        name: team.name,
        users: [...req.body.users, req.user._id]
      })
    })
  })
})
.post('/:id', authenticate, (req, res, next) => {
  // Update team
  Team.findOneAndUpdate(
    { _id: req.params.id },
    { $set: {
      name: req.body.name,
      updatedAt: Date.now()
    }},
    {new: true}, (err, team) => {
      if(err) return next(err);
      if(team) {
        // Add users to team
        User.update(
          { _id: { $in: req.body.users }},
          { $addToSet: { teams: team._id }},
          {multi: true}, (err) => {
            if(err) return next(err);
            // Remove other users from team
            User.update(
              { _id: { $nin: req.body.users }},
              { $pull: { teams: team._id }},
              {multi: true}, (err, users_removed) => {
                if(err) return next(err);
                User.find({ _id: req.body.users }, (err, users) => {
                  if(err) return next(err);
                  res.status(200).json({
                    ...team._doc,
                    users
                  })
                })
              }
            )
          }
        )
      } else {
        res.status(404).json({ error: 'No such team' });
      }
    }
  )
})
.delete('/:id', authenticate, (req, res, next) => {
  // Delete team
  console.log('Remove team: ', req.params.id);
  Team.deleteOne({ _id: req.params.id }, (err) => {
    if(err) return next(err);
    // Remove users from that team
    User.update({ teams: req.params.id }, { $pull: { teams: req.params.id }}, {multi: true}, (err) => {
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