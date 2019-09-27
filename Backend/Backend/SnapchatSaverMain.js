// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var app = express();
var APILink = 'http://localhost:8080/api';

// configure app to use bodyParser()
// this will let us get the data from a POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        //set the port

// get an instance of the express Router
var defaultRouter = require('./ServiceLayer/defaultRouter');        

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api 
app.use('/api', defaultRouter);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server is listening on port' + port); 