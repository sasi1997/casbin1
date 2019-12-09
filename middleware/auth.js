const jwt = require('jsonwebtoken');
const db = require("../config/db");

const User = function(req, res ,next){
    db.query("Select * from user", function(err, result){
      if(err) res.send(err);
      return result;
    });
};

const auth = async (req,res,next) =>{
    try {
        const token = req.header('Authorization').replace('Bearer', '');
        const decoded = jwt.verify(token, 'secret')
        const user = await User 
    } catch (e) {
        
    }
}