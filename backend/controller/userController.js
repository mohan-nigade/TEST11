
const expressAsyncHandler=require("express-async-handler")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const getUsers=expressAsyncHandler(async(req,res)=>{
    
    //get usercollection Obj from req
    let userCollectionObject=req.app.get("userCollectionObject")
    
    //get users data from usercollection and pack them into an array
    let users= await userCollectionObject.find().toArray()
    //esnd res
    res.status(200).send({message:"list of users",payload:users})
    
   
})


const getUserById=expressAsyncHandler(async(req,res)=>{
    //get usercollection obj from req
    let userCollectionObject=req.app.get("userCollectionObject");
    //get user id from url param id
    let usernameOfUrl=req.params.username;
    //get user by id from usercollection
    let user =await userCollectionObject.findOne({username:usernameOfUrl})
    //send res
    res.send({message:"User data",payload:user})
}
)


const createUser=expressAsyncHandler(async(req,res)=>{
    //get new user obj and convert it into js 
    let userObj=JSON.parse(req.body.userObj)
    //add image CDN link to userObj
    userObj.profilePic=req.file.path
    
      //get userCollection Obj from req
      let userCollectionObject = req.app.get("userCollectionObject");
     
      //check for availabity of username
      let userOfDB=await userCollectionObject.findOne({username:userObj.username})
      console.log(userOfDB)
      //if user already existed
      if(userOfDB!==null){
          res.status(200).send({message:"Username has already taken. Please choose another username"})
      }
      //if user not existed
      else{
          //hash the password
          let hashedPassword= await bcryptjs.hash(userObj.password,5)
          //replace plain password with hashed
          userObj.password=hashedPassword;
          //insert into user colelction
          let result=await userCollectionObject.insertOne(userObj)
          //send res
          res.status(201).send({message:"User created"})
      }
  })



//to login usr
const loginUser=expressAsyncHandler(async(req,res)=>{
    //get userCollection Obj from req
    let userCollectionObject = req.app.get("userCollectionObject");
    //get users credential obj
    let credObject=req.body;
    //search user by username
    let userOfDB=await userCollectionObject.findOne({username:credObject.username})
    // user not found
    if(userOfDB===null){
        res.send({message:"invalid username"})
    }
    //if user existed,compare passwords
    else{
         let status= await bcryptjs.compare(credObject.password,userOfDB.password);
        if(status==false){
            res.send({message:'invalid password'})
        }
        //if password are matched
        else{
           //create JWT token and encrypt it with a secret key
           let signedToken= jwt.sign({username:userOfDB.username},process.env.SECRET,{expiresIn:20})
           //send encrypted JWT token as a res
           res.send({message:"login success",token:signedToken,user:userOfDB})
        }    
    }
})






const updateUser=expressAsyncHandler(async(req,res)=>{
    //get usercollection obj from req
    let userCollectionObject=req.app.get("userCollectionObject");
   //get modifies user obj

   let modifiedUserObj=req.body;
   //update userobj in usercollection
   let result=await userCollectionObject.updateOne({username:modifiedUserObj.username},{$set:{...modifiedUserObj}})
   console.log(result)
   //send res
   if(result.acknowledged==true){
       res.send({message:"user modified successfully"})
   }
   else{
       res.send({message:"error in user modification"})
   }
}
)

const deleteUser=expressAsyncHandler(async(req,res)=>{
    //get usercollection obj from req
    let userCollectionObject=req.app.get("userCollectionObject");
    //get username from url
    let usernameFromUrl=req.params.username;
    //delete user from usercollection
    let result=await userCollectionObject.deleteOne({username:usernameFromUrl})
    console.log(result)
    //send res
    res.send({message:"User removed"})
})

const getProtectedInfo=(req,res)=>{
    res.send({message:"this is private information"})
}
module.exports={getUsers,getUserById,createUser,updateUser,deleteUser,loginUser,getProtectedInfo}