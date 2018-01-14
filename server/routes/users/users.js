// Module dependencies
import express from 'express';
import authenticate from '../../utils/authenticate';

// Models
import User from '../../models/user';
import Team from '../../models/team';

// Router
const router = express.Router();
router
.get('/', (req, res, next) => {
  if(req.query.users) { // Get users from by array of ids
    User.find({_id: { $in: req.query.users }}, { password: 0 }, (err, users) => {
      if(err) return next(err);
      res.json(users);
    })
  } else if(req.query.text) { // Get users by text (username, name)
    const regex = new RegExp(`${req.query.text}`);
    User.find({
      $or: [
        {username: regex},
        {fullName: regex}
      ]
    }, {username: 1, fullName: 1}, (err, users) => {
      if(err) return next(err);
      res.json(users);
    })
  } else { // Get all users
    User.find({}, { password: 0 }, (err, users) => {
      if(err) return next(err);
      res.json(users);
    })
  }
})
.get('/:id', (req, res, next) => {
  // Find user by id(id or username)
  console.log('fetching user data');
  const { id } = req.params;
  let query = [{username: id}];
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    query.push({_id: id});
  }
  User.findOne({
    $or: query
  }, { password: 0 }, (err, user) => {
    if(err) return next(err);
    // Teams
    Team.find({ _id: { $in: user.teams }}, (err, teams) => {
      if(err) return next(err);
      res.status(200).json({
        ...user._doc,
        teams
      })
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
.post('/:id', authenticate, (req, res, next) => {
  // Update user data
  User.findOneAndUpdate({ _id: req.params.id }, { $set: { ...req.body }}, {new: true}, (err, user) => {
    if(err) return next(err);
    res.status(200).json(user);
  })
})

export default router;
