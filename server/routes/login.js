// Module dependencies
var express = require('express')
  , router = express.Router();

// Middleware
// Routes
router.post('/', function(req, res, next) {

  switch(req.body.action) {
    case 'LOGIN': {
      req.session.regenerate(function(err) {
        if(err) return next(err);

        req.session.user = {
          username: req.body.username,
          password: req.body.password
        }

        console.log(req.session.user);

        res.json({
          success: true
        })
      })
      break;
    }
    case 'LOGOUT': {
      req.session.destroy();
      break;
    }
  }

});

module.exports = router;
