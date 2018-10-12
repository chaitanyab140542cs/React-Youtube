const express = require('express');
const router = express.Router();
const http = require('http');
const cors = require('cors');
var sql = require("mssql");
var config = require('../databaseconfig');
  

router.get('/',function(req, res) {
    //console.log(req);
  var id = req.query.id;
 var query = "select comment from comments where videoId='"+id+"'";
 console.log(query);
  new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query(query)
    }).then(result => {
      
      res.send(result.recordset)
     
      sql.close();
    })
  });

router.post('/',function(req, res) {
    console.log(req);
   var value = req.body.comment;
   var value2 = req.body.videoId;
   new sql.ConnectionPool(config).connect().then(pool => {
     return pool.request().query("insert into comments values('"+value2+"','"+value+"')")
     }).then(results => {
       
       res.send(JSON.stringify(results));
      
       sql.close();
     })
  });
 

  module.exports = router;
