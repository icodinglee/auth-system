const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      router = require('./router'),
      mongoose = require('mongoose'),
      cors = require('cors'),
      config = require('./config/main');
      path = require('path');

// Database Setup
mongoose.connect(config.database);

// Setting up basic middleware for all Express requests
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(logger('dev')); // Log requests to API using morgan
app.use(express.static(path.join(__dirname, 'public')));

// Import routes to be served
router(app);

// Start the server
app.listen(config.port, function() {
  console.log('Your server is running on port ' + config.port + '.');
});
