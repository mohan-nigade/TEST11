//create mini express app(user app)
const exp=require('express')
const userApp =exp.Router()
const {getUsers,getUserById,createUser,updateUser,deleteUser,loginUser,getProtectedInfo}=require('../controller/userController');
require("dotenv").config()
//
const verifyToken = require("../middlewares/verifyToken")


const cloudinary=require('cloudinary').v2;
const {CloudinaryStorage}=require('multer-storage-cloudinary')
const multer=require('multer')
//confi cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})
//configure multer-storage-cloudinary
const cloudStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'Mnj',
        public_id:(req,file)=>file.fieldname+'-'+Date.now(),

    },
});
const upload=multer({storage:cloudStorage})
/*
const middleware1=(req,res,next)=>{
    console.log('middleware-1 executed')
    //res.send({message:'Rhis reply is from middleware-1})
    next()
}
const middleware2=(req,res,next)=>{
    console.log('middleware-2 executed')
    next()
}

//make middleware1 to exeute for every req
userApp.use(middleware1)

//Sample user data
let users=[]
//create user api*/


//get users
userApp.get('/get-users',getUsers)
/*
//get users
userApp.get('/get-users',(req,res)=>{
    res.send({message:users})
})
*/

//get user by username
userApp.get('/get-user/:username',getUserById)



/*
//get user by id
userApp.get('/get-user/:id',middleware2,(req,res)=>{
    //get user id from url param id
    let userId=(+req.params.id);
    try{
    //find user by userId
    let userObj=users.find(userObj=>userObj.id===userId)
    //if user not existed
    if(userObj==undefined){
        res.send({message:'User not found'})
    }
    //if user existed
    else{
        res.send({message:userObj})
    }
} catch(err){
    res.send({message:err.message})
}

})*/

//creare users
userApp.post('/create-user',upload.single('profilePic'),createUser)
//new login user
userApp.post('/login-user',loginUser)

/*
//create user
userApp.post('/create-user',(req,res)=>{
    //get user obj
    let userObj =req.body;
    //push userObj to users
    users.push(userObj);
    //send res
    res.send({message:'user created successfully'})


})*/


//update user
userApp.put("/update-user",updateUser)







//update user

/*
userApp.put("/update-user",(req,res)=>{
    //get modifies user obj
    let modifiedUserObj=req.body;
    //replace old user obj with modified user obj
    let indexOfUser=users.findIndex(userObj=>userObj.id==modifiedUserObj.id)
    //if user not existed
    if(indexOfUser==-1){
        res.send({message:"User not existed to update"})
        
    }
    //if user existed
    else{
        users.splice(indexOfUser,0,modifiedUserObj);
        res.send({message:"user modified successfully"})
    }
})*/


//delete
userApp.delete("/delete-user/:username",deleteUser)

//protected route
userApp.get("/get-protected-data", verifyToken, getProtectedInfo)






///delete

/*
userApp.delete("/delete-user/:id",(req,res)=>{
    let userId=(+req.params.id);
    //find user by userId
    let userObj=users.find(userObj=>userObj.id===userId)
   
   //if user not existed
   if(userObj==undefined){
    res.send({message:'User not found'})
}
//if user existed
else{
    users.splice(userObj,1);
    res.send({message:'user deleted'})
}

})*/

//export userApp
module.exports=userApp;