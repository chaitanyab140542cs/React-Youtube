const express = require('express');
const router = express.Router();
const http = require('http');
const cors = require('cors');
const sql = require("mssql");
const config = require('../databaseconfig');

  
  
  router.post('/',function(req, res) {
    var value = req.body.id;
    var value2 = req.body.title;
    new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request().query("insert into video_likes values('"+req.body.id+"')")
      }).then(results => {
        
        res.send(JSON.stringify(results));
       
        sql.close();
      })
   
  
  
  
   });

   module.exports = router;