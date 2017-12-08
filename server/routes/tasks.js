// Module dependencies
var express = require('express')
  , router = express.Router();

// Routes

router.get('/', function(req, res) {

  const tasks = [
    { id: 1234, text: 'Some Task', completed: false },
    { id: 1334, text: 'Other Task', completed: false }
  ];

  const result = tasks.filter(function(element) {
    const completed = (req.query.completed === 'true' ? true : false);
    return element.completed == completed;
  })

  res.json(result);
})

module.exports = router;
