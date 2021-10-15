const Cart = require('../models/cart')

const saveCart = async(req,res) => {
    console.log("####saveCart",req.user.id)
    try{
        const CartData = new Cart({
            userId:req.user.id,
            products:[
                {
                    productid:req.body.productid,
                    quantity:req.body.quantity,
                }
            ]
        })

        console.log("####CartData",CartData)
        
        const result= await CartData.save()
        res.send(result)
    }catch(error){
        console.log("####error",error)
        res.send(500).status(error)
    }
}

const getCart =async(req,res) => {
    const qCategory = req.body.qCategory
    console.log("qCategory",qCategory)
    try{
            const result = await Cart.find()
            console.log("result",result)
            res.status(200).json(result)
     }catch(err){
         res.status(500).json(err)
     }
}

const updateCart = async (req, res)=>{
    console.log("updateCart",req.body)
    try{
        const result = await Cart.findByIdAndUpdate(req.params.id,{
            $set: req.body
        })
        console.log("#####updateCart",updateCart)
        res.status(200).json(result)
    }catch(error){
        console.log("get error",error)
        res.status(500).json(error)
    }
}

const deleteCart = async (req, res)=>{
    console.log("####req.params",req.params.id)
    try{
        const result = await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("delete the field successfully")
    }catch(error){
        console.log("####error",error)
        res.status(500).json(error)
    }
}

module.exports ={
    saveCart,
    getCart,
    updateCart,
    deleteCart
}