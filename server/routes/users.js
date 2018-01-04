// Module dependencies
import express from 'express';

// Models
import User from '../models/user';
import Team from '../models/team';

// Router
const router = express.Router();
router
.get('/', (req, res, next) => {
  User.find({}, { password: 0 }, (err, users) => {
    if(err) return next(err);
    res.json(users);
  })
})
.get('/:id', (req, res, next) => {
  // Find user by id(id or username)
  const { id } = req.params;
  let query = [{username: id}];
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    query.push({_id: id});
  }
  User.findOne({
    $or: query
  }, { password: 0 }, (err, user) => {
    if(err) return next(err);
    Team.find({ _id: { $in: user.teams }}, (err, teams) => {
      if(err) return next(err);
      res.status(200).json({
        ...user._doc,
        teams
      });
    })
  })
})
.post('/', (req, res, next) => {
  // Create new user
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  // First check if user already exists
  User.findOne({
    $or: [
      { username: username },
      { email: email }
    ]
  }, (err, user) => {
    if(user) {
      // User exists
      res.status(405).json({
        errors: { username: 'User with this username already exists' }
      })
    } else {
      // User does not exist
      User.create({
        username: username,
        password: password,
        email: email
      }, (err, user) => {
        if(err) return next(err);
        res.status(201).json({
          info: 'New user created'      
        });
      })
    }
  })
})

export default router;
