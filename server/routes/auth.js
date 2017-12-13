// Module dependencies
var express = require('express')
  , router = express.Router()
  , bcrypt = require('bcrypt')
  , User = require('../models/user')
  , jwt = require('jsonwebtoken')
  , config = require('../config');

// Middleware
// Routes
router
.post('/', function(req, res, next) {

  const { identifier, password } = req.body;
  console.log({
    identifier,
    password
  });

  User.findOne({
    $or: [
      { 'username': identifier },
      { 'email': identifier }
    ]
  }, function(error, user) {
    // if(error) return next(error);
    if(user) {
      if(bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({
          id: user._id,
          username: user.username,
          email: user.email
        }, config.jwtSecret);
        res.json({ token });
      } else {
        res.status(401).json({ errors: { form: 'Invalid Credentials' } });
      }
    } else {
      res.status(401).json({ errors: { form: 'Invalid Credentials' } });
    }
  })

})
.get('/', function(req, res, next) {

});

module.exports = router;
