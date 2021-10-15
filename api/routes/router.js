const routes = require('express').Router()
const user = require('../controllers/user')
const verify= require('./auth')

routes.post('/register',user.register)
routes.post('/login',user.login)
routes.put('/update/:id',verify.authorizationverifyToken,user.update)
routes.delete('/delete/:id',verify.authorizationverifyToken,user.deleteUser)
routes.get("/getUsers/:id",verify.verifyTokenAndAdmin,user.getUser)
routes.get("/getAllUsers",verify.verifyTokenAndAdmin,user.getAllUser)
module.exports = routes;