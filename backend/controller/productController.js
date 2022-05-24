const expressErrorHandler = require("express-async-handler")



const getProduct = expressErrorHandler (async(req, res)=>{

    //get usercollection object from req

    let productCollectionObject = req.app.get("productCollectionObject")

    //get users data from usercollection and pack into array

    let products = await productCollectionObject.find().toArray()

    //send response

    res.send({message: "success", payload:products})

})

module.exports={getProduct}