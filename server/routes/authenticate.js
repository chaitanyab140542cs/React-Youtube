var express = require('express');
const app = express();
var router = express.Router();
var jwt = require("jsonwebtoken");
var users = require('../users.json');
app.set('superSecret', "success is inevitable");
router.post('/', function(req, res) { 
    //this will issue token for valid users  
    var username = req.body.user;  
    var password = req.body.password;  
    var isUserFound = false;  
    var foundUser = {};    
    for (var i = 0; i < users.length; i++) {  
        if (users[i].user === req.body.user) {  
            isUserFound = true;  
            foundUser = users[i];  
        }  
    }  
    if (isUserFound) {  
        if (foundUser.password == req.body.password) {  
            var token = jwt.sign(foundUser, app.get('superSecret'), {  
                expiresIn: 60 // expires in 24 hours  
            });  
           console.log('token has been created');
           console.log(token);  
            res.json({  
                success: true,  
                message: 'Enjoy your token!',  
                token: token  
            });  
        } else {  
            res.json({  
                success: false,  
                message: 'Authentication failed. Wrong password.'  
            });  
        }  
       
    } else {  
        res.json({  
            success: false,  
            message: 'Authentication failed. user not found.'  
        });  
    }  
  });
  
  
  
  module.exports = router;
  