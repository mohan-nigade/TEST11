//create express app
const exp=require('express');
const app=exp();
const path=require("path")
require("dotenv").config()

//connecting with angular
app.use(exp.static(path.join(__dirname,'./dist/mean-app')))

//connecting to MONGODB SERVER
//import MongoClient
const mongoClient=require('mongodb').MongoClient;
const dbUrl=process.env.DBURL;
//connect to DB
mongoClient.connect(dbUrl)
.then((client)=>{
    //get database object
    let databaseObject=client.db("CDB22DX009DB");
    //get collection objects
    let userCollectionObject=databaseObject.collection("usercollection");
    let productCollectionObject=databaseObject.collection("productcollection");
    let cartCollectionObject=databaseObject.collection("cartCollection");
    //share collection objects to APIs
    app.set("userCollectionObject",userCollectionObject)
    app.set("productCollectionObject",productCollectionObject)
    app.set("cartCollectionObject",cartCollectionObject)
    console.log('connected to DB succecssfully')
})
.catch(err=>console.log("err in connecting to Database".err))



//import apis
const userApp=require('./backend/APIs/user')
const productApp=require('./backend/APIs/product');
const res = require('express/lib/response');

const adminApp=require('./backend/APIs/adminApi');

//add body parser middleware
app.use(exp.json())

//if path user ,then execute userapi
app.use('/user',userApp)
//if path is product,then execute product api
app.use('/product',productApp)
//if path is admin,then execute product api
/*
app.use('/admin',adminApp)*/

app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/mean-app/index.html'), err=> {
        if (err) {
           next(err)
        }
    })
})

//handling invalid path
app.use((req,res,next)=>{
    res.status(404).send({message:`the path ${req.url} does not exist`})
})



app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})

//assihn port number
const PORT=4000|| process.env.PORT
app.listen(PORT,()=>console.log(`HTTP server listening on port ${PORT}`))