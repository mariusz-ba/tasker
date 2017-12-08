// Module dependencies
var express = require('express')
  , router = express.Router();

// Middleware
// Routes
router.get('/', function(req, res, next) {
  res.json([
    {
      id: 1,
      username: 'Mariusz'
    },
    {
      id: 2,
      username: 'Krystian'
    }
  ]);
});

module.exports = router;
