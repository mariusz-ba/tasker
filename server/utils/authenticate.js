const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/user');

module.exports = function(req, res, next) {
  const authorizationHader = req.headers['authorization'];
  let token;

  if(authorizationHader) {
    token = authorizationHader.split(' ')[1];
  }

  if(token) {
    jwt.verify(token, config.jwtSecret, function(err, decoded) {
      if(err) {
        res.status(401).json({ error: 'Failed to authenticate' });
      } else {
        User.findOne({ _id: decoded.id }, function(err, user) {
          if(err) {
            res.status(404).json({ errro: 'No such user' });
          } else {
            req.user = user;
            next();
          }
        })
      }
    })
  } else {
    res.status(403).json({
      error: 'No token provided'
    });
  }
}