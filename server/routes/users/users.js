// Module dependencies
import express from 'express';
import authenticate from '../../utils/authenticate';
import bcrypt from 'bcrypt';

// Models
import User from '../../models/user';
import Team from '../../models/team';
import Friend from '../../models/friend';
import config from '../../config';

// Router
const router = express.Router();
router
.get('/', authenticate, (req, res, next) => {
  if(req.query.users) { // Get users from by array of ids
    User.find({_id: { $in: req.query.users }}, { password: 0 }, (err, users) => {
      if(err) return next(err);
      res.json(users);
    })
  } else if(req.query.text) { // Get users by text (username, name)
    // if req.query.isFriend isset check if that user is a friend of req.user
    const { isFriend } = req.query;
    const regex = new RegExp(`${req.query.text}`);
    User.find({
      $or: [
        {username: regex},
        {fullName: regex}
      ]
    }, {username: 1, fullName: 1})
    .then(users => {
      if(isFriend) {
        console.log('taking user ids');
        // Take users ids
        const ids = users.map(user => user._id);
        return Friend.find({
          $or: [
            { user1: req.user._id, user2: { $in: ids }},
            { user2: req.user._id, user1: { $in: ids }}
          ]
        })
        .then(friends => {
          const result = users.map(user => {
            if(friends.find(friend => friend.user1.equals(user._id) || friend.user2.equals(user._id))) {
              console.log('they are friends');
              // They are friends or invitation have been sent
              return {
                ...user._doc,
                isFriend: true
              }
            }
            return {
              ...user._doc,
              isFriend: false
            };
          });
          res.status(200).json(result);
        })
        .catch(err => next(err));
      }
      else
        res.json(users);
    })
    .then(err => next(err));
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
  if(req.user._id.toString() !== req.params.id) {
    res.status(403).json({ error: 'Action not allowed' });
    return;
  }

  if(!req.body.password) { // Dont chagne password
    User.findOneAndUpdate({ _id: req.params.id }, { $set: { ...req.body }}, {new: true}, (err, user) => {
      if(err) return next(err);
      delete user.password;
      res.status(200).json(user);
    })
  } else { // Change user password
    bcrypt.hash(req.body.password, config.saltRounds, (error, hash) => {
      if(error) return next(error);
      User.findOneAndUpdate({ _id: req.params.id }, { $set: { password: hash }}, {new: true})
      .then(user => {
        delete user.password;
        res.status(200).json(user);
      })
      .catch(err => next(err));
    })
  }
})

export default router;
