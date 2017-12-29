// Module dependencies
var express = require('express')
  , router = express.Router();

const User = require('../models/user');
// Middleware
// Routes
router
.get('/', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  })
})
.post('/', function(req, res, next) {
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
  }, function(err, user) {
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
      }, function(err, user) {
        if(err) return next(err);
        res.status(201).json({
          info: 'New user created'      
        });
      })
    }
  })
})

module.exports = router;
