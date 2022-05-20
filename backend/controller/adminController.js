
const jwt=require("jsonwebtoken")
require("dotenv").config()

const adminLogin=(req,res)=>{
    let adminObj=req.body;
    if(adminLogin.username=="admin"){
        res.send({message:"Invalid username"})
    }
    else if(adminLogin.password=="admin"){
        res.send({message:"Invalid password"})
    }
    else{
        //create token
        let signedToken=jwt.sign({username:admin},process.env.SECRET,{expiresIn:100})
        //send token
        res.send({message:"success",token:signedToken,admin:adminObj})
    }
}

const createProduct=(req,res)=>{
//get productcollectionobj
}

const getProducts=(req,res)=>{

}

const updateProduct=(req,res)=>{

}

const deleteProduct=(req,res)=>{

}

module.exports={adminLogin,createProduct,updateProduct,deleteProduct,getProducts};