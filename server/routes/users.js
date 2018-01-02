// Module dependencies
import express from 'express';

// Models
import User from '../models/user';

// Router
const router = express.Router();
router
.get('/', (req, res) => {
  User.find({}, (err, users) => {
    res.json(users);
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
