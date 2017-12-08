// Module dependencies
var express = require('express')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , app = express();

// router
var users = require('./routes/users')
  , login = require('./routes/login')
  , tasks = require('./routes/tasks');

// Configuration
app.disable('x-powered-by');
app.set('port', process.env.PORT || 3001);
app.set('json spaces', 2);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(session({
  secret: 'verysecretString123!',
  resave: true,
  saveUninitialized: true
}))

// Configure routes
app.use('/api/login', login);
/*
app.use(function(req, res, next) {
  if(req.session.user)
    return next()
  return next(new Error('Nie jestes zalogowany'))
});
*/
app.use('/api/users', users);
app.use('/api/tasks', tasks);

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
