const express = require('express');
const http = require('http');
const cors = require('cors');
var sql = require("mssql");
const app = express();
const server = http.createServer(app);
const router = express.Router();
const bodyParser = require('body-parser');
server.listen(3000);
server.on('listening', () => {
  console.log('Server is listening on port: 3000');
});


app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cors());



console.log(cors());
var config = {
  user: 'sa',
  password: 'Welcome@1234',
  server: 'ggku3ser2', 
  database: 'Chaitanya_DB' ,

  
options: {
  encrypt: true 
}
};



app.get('/users',function(req, res) {

   
  
  new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query("select id from video_likes")
    }).then(result => {
      
      res.send(result.recordset)
     
      sql.close();
    })
  });
  


   

   

  

 

 app.post('/postdata',function(req, res) {
  var value = req.body.id;
  var value2 = req.body.title;
  new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query("insert into video_likes values('"+req.body.id+"')")
    }).then(results => {
      
      res.send(JSON.stringify(results));
     
      sql.close();
    })
 



 });

 