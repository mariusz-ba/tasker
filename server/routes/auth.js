// Module dependencies
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

// Models
import User from '../models/user';

//Router
const router = express.Router();
router
.post('/', (req, res, next) => {

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
  }, (error, user) => {
    // if(error) return next(error);
    if(user) {
      if(bcrypt.compareSync(password, user.password)) {
        delete user.password;
        const token = jwt.sign({
          ...user._doc
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
.get('/', (req, res, next) => {

});

export default router;
