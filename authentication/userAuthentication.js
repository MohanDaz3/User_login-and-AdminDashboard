const isLogin=async(req,res,next)=>{
    try {
        if(req.session.user_id){
            next()
        }else{
            res.render('login')
        }
    } catch (error) {
        console.log(error.message);
    }
}

const isLogout=async(req,res,next)=>{
    try {
        if(req.session.user_id){
            res.render('dashboard')
        }else{
            next()
        }
    } catch (error) {
        console.log(error.message);
    }
}

const isPasswordMatch=(req,res,next)=>{
    if(req.body.Cpassword!==req.body.password){
        res.render('signup',{invalid:"password does not match"})
    }else{
        next()
    }
}

const goToSignupIfNoValue=(req,res,next)=>{
    if(req.body.email=="" && req.body.password==""){
       res.render('signup',{invalid:"*fields required"})
    }else{
        next()
    }
}

module.exports={isLogin,
                isLogout,
                isPasswordMatch,
              goToSignupIfNoValue}