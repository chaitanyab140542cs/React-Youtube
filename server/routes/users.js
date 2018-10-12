const express = require('express');
const router = express.Router();
const http = require('http');
const cors = require('cors');
const sql = require("mssql");
const config = require('../databaseconfig');

  

router.get('/',function(req, res) {
  console.log('hi');
    new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request().query("select id from video_likes")
      }).then(result => {
        
        res.send(result.recordset)
       
        sql.close();
      })
    });

   
      
    
  
 module.exports = router;


 

