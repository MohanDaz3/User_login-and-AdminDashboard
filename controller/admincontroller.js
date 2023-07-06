const  collection = require('../models/mongodb')

// rendering admin login page

const adminlogin=async(req,res)=>{
    res.render('adminLogin')
    console.log("adminLogin rendering");
}

// admin home page verification

const verifyLogin=async(req,res)=>{
    try {
        const admindata=await collection.findOne({email:req.body.email})
        if(admindata){
            if(admindata.password===req.body.password && admindata.isAdmin===1){
                req.session.admin_id=admindata.email
                console.log(req.session.admin_id);
                const find=await collection.find({})
                res.render('adminhomepage',{find:find})
            }else{
                res.render('adminLogin',{invalid:"incorrect password"})
            }
        }else{
            res.render('adminLogin',{invalid:"Admin not found"})
        }
    } catch (error) {
        console.log(error.message);
    }
}


const  loadadminhomepage=async(req,res)=>{
    try {
        const find=await collection.find({})
        res.render('adminhomepage',{find:find})
    } catch (error) {
        console.log(error.message);
    }
}

const logout= async(req,res)=>{
    try {
        req.session.destroy()
        res.render('adminLogin')
    } catch (error) {
        console.log(error.message);
    }
}
const search=async(req,res)=>{
    try {
        searchdata=req.body.search
        const find=await collection.find({name:req.body.search})
        res.render('adminhomepage',{find:find})
        console.log("adminhomepage loaded");
    } catch (error) {
        console.log(error.message);
    }
}
const reset=async(req,res)=>{
  
    const find=await collection.find({})
    res.render('adminhomepage',{find:find})
   
}

const signuppage=async(req,res)=>{
    res.render('adminadduser')
    console.log('signup page rendered');
}

const accountcreated=async(req,res)=>{
    const data={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        isAdmin:0
    }
    await collection.insertMany([data])
    res.redirect('/admin/newuserupdated')
}

const updateuser=async(req,res)=>{
    try {
        const updateid=req.query.id
        console.log('updateid');
        const userdata=await collection.findOne({_id:updateid})
        res.render('adminedituser',{userdata:userdata})
    } catch (error) {
       console.log(error.message); 
    }
}

const updatedSucess=async(req,res)=>{
    try {
        const updatenew=req.body.id
        console.log(updatedSucess);
        const updateuser=await collection.updateOne({_id:updatenew},{$set:{name:req.body.name,email:req.body.email}})
        res.redirect('/admin/adminupdated')
    } catch (error) {
        console.log(error.message);
    }
}

const adminupdated=async(req,res)=>{
    const find=await collection.find({})
    res.render('adminhomepage',{find:find})
}

const deleteid=async(req,res)=>{
    try {
        const deleteid=req.query.id
        console.log(deleteid);
        await collection.deleteOne({_id:deleteid})
        const find=await collection.find({})
        res.redirect('/admin/adminhomepage')
    } catch (error) {
        console.log(error.message);
    }
}

module.exports={adminlogin,
                verifyLogin,
                 search,
                loadadminhomepage,
                logout,
                reset,
                adminupdated,
                updatedSucess,
                updateuser,
                accountcreated,
                signuppage,
                deleteid}