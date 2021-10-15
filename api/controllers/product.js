const Product = require('../models/product')

const saveProduct = async(req,res) => {
    console.log("####saveProduct",req.body)
    try{
        const productData = new Product({
            title: req.body.title,
            desc: req.body.desc,
            img: req.body.img,
            categoreis: req.body.categoreis,
            size: req.body.size,
            color: req.body.color,
            price: req.body.price,
        })

        console.log("####productData",productData)
        
        const result= await productData.save()
        res.send(result)
    }catch(error){
        console.log("####error",error)
        res.send(500).status(error)
    }
}

const getProduct =async(req,res) => {
    const qCategory = req.body.qCategory
    console.log("qCategory",qCategory)
    try{
        if(qCategory){
            console.log("it is working properly")
            const result =await Product.find({
                categoreis:{
                    $in:[qCategory]
                }
            })
            console.log("result",result)
            res.status(200).json(result)
        }else{
            const result = await Product.find()
            console.log("result",result)
            res.status(200).json(result)
        }
        
     }catch(err){
         res.status(500).json(err)
     }
}

const updateProduct = async (req, res)=>{
    console.log("updateProduct",req.body)
    try{
        const result = await Product.findByIdAndUpdate(req.params.id,{
            $set: req.body
        })
        console.log("#####updateProduct",updateProduct)
        res.status(200).json(result)
    }catch(error){
        console.log("get error",error)
        res.status(500).json(error)
    }
}

const deleteProduct = async (req, res)=>{
    console.log("####req.params",req.params.id)
    try{
        const result = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("delete the field successfully")
    }catch(error){
        console.log("####error",error)
        res.status(500).json(error)
    }
}

module.exports ={
    saveProduct,
    getProduct,
    updateProduct,
    deleteProduct
}