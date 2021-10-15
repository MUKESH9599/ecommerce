const routes = require('express').Router()
const user = require('../controllers/user')
const product = require('../controllers/product')
const Cart = require('../controllers/cart')
const verify= require('./auth')

//users
routes.post('/register',user.register)
routes.post('/login',user.login)
routes.put('/update/:id',verify.authorizationverifyToken,user.update)
routes.delete('/delete/:id',verify.authorizationverifyToken,user.deleteUser)
//Admin
routes.get("/getUsers/:id",verify.verifyTokenAndAdmin,user.getUser)
routes.get("/getAllUsers",verify.verifyTokenAndAdmin,user.getAllUser)
//Products
routes.post("/saveProduct",verify.verifyTokenAndAdmin,product.saveProduct)
routes.post('/getProductList',verify.authorizationverifyToken,product.getProduct)
routes.put('/updateProduct/:id',verify.verifyTokenAndAdmin,product.updateProduct)
routes.delete('/deleteProduct/:id',verify.verifyTokenAndAdmin,product.deleteProduct)
//Cart routes
routes.post("/saveCart/:id",verify.authorizationverifyToken,Cart.saveCart)
routes.get('/getCartList',verify.authorizationverifyToken,Cart.getCart)
routes.put('/updateCart/:id',verify.authorizationverifyToken,Cart.updateCart)
routes.delete('/deleteCart/:id',verify.authorizationverifyToken,Cart.deleteCart)
module.exports = routes;