const { collection } = require("../models/mongodb")

// login page rendering
const loginPage=async(req,res)=>{
    res.render('login')
    console.log("login page is rendering");
}

// logout

const logOut=async(req,res)=>{
    try {
        req.session.destroy();
        res.render('login',{message:"logout successfully..."})
        console.log("logout successfull");
    } catch(error){
        console.log(error.message);
    }
}

//user home page rendering

const userDashboard=async(req,res)=>{
    res.render('dashboard')
}

// user signup page rendering

const signupPage=async(req,res)=>{
    res.render('signup')
    console.log("signup page is rendering");
}


// customer signup(account creation)

const accountCreated=async(req,res)=>{
    const data={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        confirm_password:req.body.Cpassword,
        isAdmin:0
    }
    await collection.insertMany([data])
    res.render('login',{message:"Account created successfully.."})
}



// customer login verification

const login_verify=async(req,res)=>{
    try {
        const userdata= await collection.findOne({email:req.body.email})

      if(userdata){
        console.log(userdata.email);
        if(userdata.password===req.body.password){
            req.session.user_id=userdata.email
            res.render('dashboard')
            console.log("login successfull");
        }else{
            res.render('login',{
            title: "invalid",
            invalid: "invald password",})
            console.log("password incorrect");
        }
      }else{
        console.log("error");
        res.render('login',{ 
        title: "invalid",
        invalid: "User does not exist,create an account",})
      }

    } catch(error) {
        res.send(error.message)
    }
}


module.exports={
                 loginPage,
                 signupPage,
                 accountCreated,
                 login_verify,
                 logOut,
                 userDashboard}