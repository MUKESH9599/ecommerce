var jwt = require('jsonwebtoken');

const verifyTOken =(req,res,next) => {
    const authheader= req.headers.token
    console.log("######authheader",authheader)
    if(authheader){
          jwt.verify(authheader,'secret',(err,user)=>{
              if(err){
                return res.status(401).json("not valid")
              }
              req.user = user
              next()
          })
    }else{
        return res.status(401).json("not  autherized")
    }
}

const authorizationverifyToken =(req,res,next)=>{
    verifyTOken(req,res,()=>{
        console.log("authorization",req.params.id)
        if(req.user.id==req.params.id || req.user.isAdmin){
            console.log("req.params.id",req.params.id)
            next()
        }else{
            return res.status(401).json("not valid")
        }
    })
}

const verifyTokenAndAdmin =(req,res,next)=>{
    verifyTOken(req,res,()=>{
        if(req.user.isAdmin){
            console.log("req.params.id",req.params.id)
            next()
        }else{
            return res.status(401).json("not valid and not autherized")
        }
    })
}

module.exports={verifyTOken,authorizationverifyToken,verifyTokenAndAdmin}