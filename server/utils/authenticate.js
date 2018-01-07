import jwt from 'jsonwebtoken';
import config from '../config';

import User from '../models/user';

export default (req, res, next) => {
  const authorizationHader = req.headers['authorization'];
  let token;

  if(authorizationHader) {
    token = authorizationHader.split(' ')[1];
  }

  if(token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if(err) {
        res.status(401).json({ error: 'Failed to authenticate' });
      } else {
        User.findOne({ _id: decoded._id }, (err, user) => {
          if(err) {
            res.status(404).json({ error: 'No such user' });
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
