const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const sql = require("mssql");
const jwt = require("jsonwebtoken");
const server = http.createServer(app);
var router = express.Router();
const bodyParser = require('body-parser');
const users = require('./routes/users');
const comments = require('./routes/comments');
const authenticate = require('./routes/authenticate');
const postlikes = require('./routes/postlikes');
server.listen(3000);
server.on('listening', () => {
 console.log('Server is listening on port: 3000');
});

app.set('superSecret', "success is inevitable");
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cors());
app.use('/authenticate',authenticate);
app.use(function(req, res, next) {
      
   
    // check header or url parameters or post parameters for token  
    var token = req.body.token || req.query.token || req.headers['x-access-token'];  
    
    // decode token  
    if (token) {  
        // verifies secret and checks exp  
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {  
            if (err) {  
                return res.json({  
                    success: false,  
                    message: 'Failed to authenticate token.'  
                });  
            } else {  
                // if everything is good, save to request for use in other routes 
                 
                console.log(token);
                console.log('token has matched');
                req.decoded = decoded;  
                next();  
            }  
        });  
    } else {  
        // if there is no token  
        // return an error  
      
        return res.status(403).send({  
            success: false,  
            message: 'No token provided.'  
        });  
    }  
  }); 

app.use('/users',users);
app.use('/postlikes',postlikes)
app.use('/comments',comments);
