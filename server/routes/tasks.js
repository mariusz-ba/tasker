// Module dependencies
var express = require('express')
  , router = express.Router();

const authenticate = require('../utils/authenticate');
const Task = require('../models/task');
// Routes

router.get('/', authenticate, function(req, res) {

  console.log('fetching tasks for user ', req.user);
  
  Task.find({ author: req.user._id }, function(err, tasks) {
    if(err) throw err;

    res.json(tasks);
  })
})

module.exports = router;
