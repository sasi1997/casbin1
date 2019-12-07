var express = require("express");
var router = express.Router();
const fs = require("fs");
const http = require("http");
const db = require("../config/db");
const jwt = require('jsonwebtoken');


// router.get('/',function(req, res ,next){
//     db.query("Select * from user", function(err, result){
//       if(err) res.send(err);
//       res.send(result);
//     });
// });

// login
router.get('/login',function(req,res,next){
    db.query("Select * from user",function(err, result){
      if(err) res.send(err);
      res.send(result);
    })
})

router.get('/:userName', function(req, res ,next){
  db.query("Select * from user WHERE userName =?",[req.params.userName], function(err, result){
    if(err) res.send(err);
    let asd = result.filter((data, index)=>{
        const token = jwt.sign({id: data.id},'secret')
        tokenSave(token,data.id);
        // console.log(token);
      })
      res.send(result);
  });
});

 const tokenSave = function(token, id){
  //  console.log(token,id)
     let updateQuery = "UPDATE user SET token= '" +token+ "' WHERE id= '" +id+ "'";
      db.query(updateQuery, function(err, rows){
        if(err) throw err;
          else{
            console.log(rows);
          }
      });
    }

// /* GET users listing. */
// router.get("/", function(req, res, next) {
//   res.send("respond with a resource");
// });

// router.get("/all", function(req, res, next) {
//   db.query("Select * from video", function(err, result) {
//     if (err) res.send(err);
//     res.send(result);
//   });
// });
// router.get("/video", function (req, res) {
//   let query, param;
//   if (req.body.id) {
//      query = "Select * from video WHERE id = ?";
//      param = req.body.id;
//   } else if (req.body.title) {
//     query = "Select * from video WHERE title = ?";
//      param = req.body.title;
//   }
//   db.query(query,param, function (err, result) {
//     if (err) {
//       res.send(err);
//     } else {
//       // console.log(result);
//       let datafilter = result.filter((data, index) => {
//         const video_path = data.videoUrl;
//         const path = video_path;
//       const stat = fs.statSync(path);
//       const fileSize = stat.size;
//       const range = req.headers.range;
//       if (range) {
//         const parts = range.replace(/bytes=/, "").split("-");
//         const start = parseInt(parts[0], 10);
//         const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
//         const chunksize = end - start + 1;
//         const file = fs.createReadStream(path, { start, end });
//         const head = {
//           "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//           "Accept-Ranges": "bytes",
//           "Content-Length": chunksize,
//           "Content-Type": "video/mp4"
//         };
//         res.writeHead(206, head);
//         file.pipe(res);
//       } else {
//         const head = {
//           "Content-Length": fileSize,
//           "Content-Type": "video/mp4"
//         };
//         res.writeHead(200, head);
//         fs.createReadStream(path).pipe(res);
//       }
//     });
//     }
//   });
// });

module.exports = router;
