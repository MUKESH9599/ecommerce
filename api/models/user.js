const mongoose = require('mongoose');

const UserSchema =new mongoose.Schema({
   name :{
    type: String,
    require:[true,"name is require field"],
    minLength:[2,"name can not be less than 2 characters"],
    maxLength:[20,"name can not be greater than 20 characters"]
   },
   email:{
    type: String,
    require:[true,"email is require field"],
    maxLength:[120,"email can not be greater than 120 characters"],
    index: true,
   },
   password:{
    type: String,
    require:[true,"passwords is require field"],
    // maxLength:[120,"password can not be greater than 120 characters"],
   },
   isActive:{
       type: Boolean,
       default: true
   },
   isDelete:{
       type: Boolean,
       default: false
   },
   isAdmin:{
       type: Boolean,
       default: false
   }
},{
    timestamps:true
})

const User = mongoose.model('Users',UserSchema)

module.exports = User;