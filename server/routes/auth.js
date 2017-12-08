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

        // Check database for given username and password

        req.session.user = {
          username: req.body.username,
          password: req.body.password
        }

        res.json({
          success: true,
          user: {
            id: 1,
            username: req.session.user.username
          }
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
