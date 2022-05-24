const addToCart = async (req, res) => {

    let cartCollectionObject = req.app.get("cartCollectionObject");

    console.log(req.body)

    let cartObj = {

        username: req.body.username,

        products: [req.body.productObj]

    }



    let userOfCart = await cartCollectionObject.findOne({ username: cartObj.username })



    // console.log("user of cart", userOfCart)



    if (userOfCart !== null) {

       

        //updating user cart

        let result = cartCollectionObject.update({ username: userOfCart.username }, { $push: { products: req.body.productObj } });

        res.status(201).send({ message: "product added successfully" })

    } else {

        //creating new cart for new user

        let result = await cartCollectionObject.insertOne(cartObj)

        res.status(201).send({ message: "product added successfully" })

    }

}



module.exports = {addToCart}