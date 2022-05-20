
//create mini express app
const exp=require('express');
const productApp =exp.Router();

const middleware1=(req,res,next)=>{
    console.log('middleware-1 executed')
}
const middleware2=(req,res,next)=>{
    console.log('middleware-2 executed')
}


//Sample product data
let products=[]
//create product api

//get products
productApp.get('/get-products',(req,res)=>{
    res.send({message:products})
})

//get product by id
productApp.get('/get-product/:id',(req,res)=>{
    //get product id from url param id
    let productId=(+req.params.id);
    //find product by productId
    let productObj=products.find(productObj=>productObj.id===productId)
    //if product not existed
    if(productObj==undefined){
        res.send({message:'product not found'})
    }
    //if product existed
    else{
        res.send({message:productObj})
    }

})
//create product
productApp.post('/create-product',(req,res)=>{
    //get product obj
    let productObj =req.body;
    //push productObj to users
    products.push(productObj);
    //send res
    res.send({message:'product created successfully'})


})

//update product
productApp.put("/update-product",(req,res)=>{
    //get modifies product obj
    let modifiedProductObj=req.body;
    //replace old product obj with modified product obj
    let indexOfProduct=products.findIndex(productObj=>productObj.id==modifiedProductObj.id)
    //if product not existed
    if(indexOfProduct==-1){
        res.send({message:"product not existed to update"})
        
    }
    //if product existed
    else{
        products.splice(indexOfProduct,0,modifiedProductObj);
        res.send({message:"product modified successfully"})
    }
})

///delete
productApp.delete("/delete-product/:id",(req,res)=>{
    let productId=(+req.params.id);
    //find product by productId
    let productObj=products.find(productObj=>productObj.id===productId)
   
   //if user not existed
   if(productObj==undefined){
    res.send({message:'product not found'})
}
//if product existed
else{
    products.splice(productObj,1);
    res.send({message:'product deleted'})
}

})

//export productApp
module.exports=productApp;