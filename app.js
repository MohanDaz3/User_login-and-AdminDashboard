
const express=require("express")
const app=express()
const port=process.env.PORT||8000

const collection = require('./models/mongodb')

// user path

const userRouter = require("./routers/userRouter")
app.use('/',userRouter)

const adminRouter = require("./routers/adminRouter")
app.use('/admin',adminRouter)




app.listen(port,()=>{
  console.log("server started");
})