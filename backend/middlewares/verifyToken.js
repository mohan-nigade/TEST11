const jwt=require("jsonwebtoken")
require("dotenv").config()
const verifyToken=(req,res,next)=>{
    //token verification logic
   // console.log(req.headers)
    let bearerToken=req.headers.authorization;
   
    //if req headers do not have bearerToken
    if(bearerToken==undefined){
        res.send({message:"You are not authorized too access this info"})
    }
    //if bearerToken is existed
    else{
        //get token from bearerToken
        let token=bearerToken.split(" ")[1];
       //verify token
       jwt.verify(token,process.env.SECRET,(err,decodedToken)=>{
          //if token is expired
          if(err){
              res.send({message:"Session expired..relogin to continue.."})
          }
          //if token is not expired
          else{
              next()
          }
       })
    }
}
module.exports= verifyToken;