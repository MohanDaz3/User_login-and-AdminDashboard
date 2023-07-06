const express = require('express')
const admin_router = express()
const bodyparser = require('body-parser')
const session = require('express-session')
const nocache = require('nocache')
const adminController = require('../controller/admincontroller')
const validate = require('../authentication/adminAuthhentication')


admin_router.use(nocache())

admin_router.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))

// setting view Engine

admin_router.set('view engine','ejs')
admin_router.set('views','./views')

// middlweares for parsing incoming requests

admin_router.use(express.json())
admin_router.use(express.urlencoded({extended:false}))

// attaching static files

admin_router.use('/statics',express.static('public'))
admin_router.use('/assets',express.static('/public/assets'))



admin_router.get('/adminLogin',validate.isLogout, adminController.adminlogin)

admin_router.get('/adminhomepage',validate.isLogin,adminController.loadadminhomepage)

admin_router.post('/adminhomepage',validate.isLogout,adminController.verifyLogin)

admin_router.get('/logout',adminController.logout)

admin_router.post('/search',adminController.search)

admin_router.get('/reset',adminController.reset)

admin_router.get('/adduser',adminController.signuppage)

admin_router.get('/updateuser',adminController.updateuser)

admin_router.get('/delete',adminController.deleteid)

admin_router.post('/update',adminController.updatedSucess)

admin_router.get('/adminupdated',adminController.adminupdated)

admin_router.post('/accountcreated',adminController.accountcreated)

admin_router.get('/newuserupdated',adminController.adminupdated)


module.exports=admin_router

