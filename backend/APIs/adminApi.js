
const exp=require('express')
const adminApp =exp.Router();

const{adminLogin,createProduct,updateProduct,deleteProduct,getProducts,}=require('../controller/adminController')

//admin login
adminApp.post("/login",adminLogin)
//create product
adminApp.post("/create-product",createProduct)
//view products
adminApp.get("/view-products",getProducts)
//update products 
