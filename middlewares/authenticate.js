const jwt = require("jsonwebtoken");
require('dotenv').config();


const auth = (req,res,next) => {
  let token = req.headers.authorization.split(" ")[1];
  if (!token || (token==undefined||null)) {
       return res.send({ "Message": "Please Login First" });
     
  }
    jwt.verify(token, process.env.key, function (err, decoded) {
      
        if (err) {
            res.send({ "Message": "Please Login First" });
        } else {
            const userID = decoded.userID;
            req.body.userID=userID;
            next()
        }
    });
  
}
module.exports={auth}