const routes = require('express').Router()
const user = require('../controllers/user')
const verify= require('./auth')

routes.post('/register',user.register)
routes.post('/login',user.login)
routes.put('/update/:id',verify.authorizationverifyToken,user.update)
routes.delete('/delete/:id',verify.verifyTokenAndAdmin,user.deleteUser)
module.exports = routes;