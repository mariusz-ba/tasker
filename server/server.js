// Module dependencies
var express = require('express')
  , bodyParser = require('body-parser')
  , mongoose = require('mongoose')
  , app = express();

// Database
mongoose.connect('mongodb://127.0.0.1:27017/tasker');

// router
var users = require('./routes/users')
  , auth = require('./routes/auth')
  , tasks = require('./routes/tasks')
  , teams = require('./routes/teams');

// Configuration
app.disable('x-powered-by');
app.set('port', process.env.PORT || 3001);
app.set('json spaces', 2);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

// Configure routes
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/tasks', tasks);
app.use('/api/teams', teams);

// Run server
app.listen(app.get('port'), function(error) {
  if(error) throw error;
  console.log('Listenning on port: ' + app.get('port'));
})

// Error handling middleware
app.use(function(err, req, res, next) {
  res.json({
    error: err.message
  })
})
