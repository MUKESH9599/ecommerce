const User = require('../models/user')
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const register = async (req,res)=>{
    console.log("####req.body",req.body)
    try{
        const Userdata = new User({
            name:req.body.name, 
            email:req.body.email, 
            password:CryptoJS.AES.encrypt(req.body.password, 'password123').toString(),
           
        })
        console.log("####Userdata",Userdata)
        
        const result= await Userdata.save()
        res.send(result)
    }catch(error){
        console.log("####error",error)
     res.send(500).status(error)
    }
}

const login=async (req,res)=>{
    console.log("####login",req.body)
     try{
         const user = await User.findOne({name:req.body.name})
        console.log("User",user)
         if(!user){
             res.status(401).send("wrong name")
         }

         var bytes  = CryptoJS.AES.decrypt(user.password, 'password123');
         var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

         console.log("decryptedData",decryptedData,req.body.password)

         if(decryptedData!=req.body.password){
             res.status(401).send("wrong password")
         }

        const token = jwt.sign({
            id:user._id,
            isAdmin: user.isAdmin
          }, 'secret', { expiresIn: '1h' });

          console.log("#####token",token)

         res.status(200).json({user,token})

     }catch(error){
    console.log("####error",error)
     res.send(500).status(error)
    }
}

const update = async(req, res) => {
     console.log("####update",req.body,req.params.id)
     try{
        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },
        {new:true})
        console.log("updateUser",updateUser)
        res.status(200).json(updateUser)
     }catch(err){
         res.status(500).json(err)
     }
  
}

const deleteUser = async(req, res) => {
    console.log("####update",req.body,req.params.id)
     try{
        const deleteUser = await User.findByIdAndDelete(req.params.id)
     
        console.log("deleteUser",deleteUser)
        res.status(200).json("user has been deleted")
     }catch(err){
         res.status(500).json(err)
     }
}

const getUser = async(req, res) => {
    console.log("####getUser",req.body,req.params.id)
     try{
        const getUser = await User.findById(req.params.id)
     
        console.log("getUser",getUser)
        res.status(200).json(getUser)
     }catch(err){
         res.status(500).json(err)
     }
}

const getAllUser = async(req, res) => {
     try{
        const result = await User.find()
             res.status(200).json(result)
     }catch(err){
         res.status(500).json(err)
     }
}


module.exports ={
    register,
    login,
    update,
    deleteUser,
    getUser,
    getAllUser
}