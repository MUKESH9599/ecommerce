const mongoose = require('mongoose');

const ProductSchema =new mongoose.Schema({
   title :{
    type: String,
    require:[true,"name is require field"],
    unique :true,
   },
   desc:{
    type: String,
    require:[true,"desc is require field"],
    index: true,
   },
   img:{
    type: String,
    required: true
   },
   categoreis:{
       type: Array,
       default: true
   },
   size:{
       type: String,

   },
   color:{
    type: String,
},
price:{
    type: Number,
    required: true
}
},{
    timestamps:true
})

const Product = mongoose.model('Products',ProductSchema)

module.exports = Product;