var express = require('express');        // call express
var defaultRouter = express.Router();
var APILink = 'http://localhost:8080/api';
var userManager = require('../LogicLayer/BL/UserManagerBL');

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
defaultRouter.get('/', function(req, res) {
    res.json({ message: 'Welcome to the API Snapchat Saver Backend',
               users: APILink + '/users'
    });
});

defaultRouter.post('/users', function(req, res){
    var newUserObject = req.body;
    var newUser = userManager.createSession(newUserObject.username, parseInt(newUserObject.password));
    res.json({
        message: 'Thank you for posting (' + newUserObject.username + ')'
    }); 
});

module.exports = defaultRouter;
