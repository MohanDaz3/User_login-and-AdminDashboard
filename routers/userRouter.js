const express = require("express")
const path = require("path")
const user_router = express()
const bodyparser = require('body-parser')
const session = require("express-session")
const nocache = require("nocache")
const userController = require('../controller/usercontroller')
const validate = require('../authentication/userAuthentication')



user_router.use(nocache())

user_router.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))

// attaching static files

user_router.use('/static',express.static('public'))
user_router.use('/assets',express.static('/public/assets'))

// setting view Engine

user_router.set('view engine','ejs')
user_router.set('views','./views')


// middleware for parsing incoming requests

user_router.use(express.json())
user_router.use(express.urlencoded({extended:false}))



user_router.get('/',validate.isLogout , userController.loginPage)
user_router.post('/login', userController.login_verify)
user_router.get('/logout',userController.logOut)



user_router.get('/signup',userController.signupPage)
user_router.post('/accountCreated',validate.isPasswordMatch ,validate.goToSignupIfNoValue , userController.accountCreated)

module.exports=user_router