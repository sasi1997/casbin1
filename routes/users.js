var express = require("express");
var router = express.Router();
const fs = require("fs");
const http = require("http");
const db = require("../config/db");
const jwt = require('jsonwebtoken');


// login
router.post('/login',function(req,res,next){
  db.query("Select userName,password,id from user WHERE userName=? and password =?",[req.body.userName, req.body.password],function(err, result){
   if(err) res.send(err);

  let filterData = result.filter((data, index)=>{
    const token = jwt.sign('5','secret')
    tokenSave(token,data.id);
  })
   res.send(result);
  });
});

const tokenSave = function(token, id){
  // console.log(token ,id )
  let updateQuery = "UPDATE user SET token= '" +token+ "' WHERE id= '" +id+ "'";
   db.query(updateQuery, function(err, rows){
     if(err) throw err;
       else{
        //  console.log(rows);
       }
   });
 }

 router.get('/:userName',function(req, res ,next){
  db.query("Select * from user WHERE userName =?",[req.params.userName], function(err, result){
    if(err) res.send(err);
    // for(resu of result){

    // }
    // let token = jwt.sign({id:resu.id},'secret');
      
    //   const decode = jwt.verify(resu.token,'secret')

      res.send(result);
  });
});

module.exports = router;