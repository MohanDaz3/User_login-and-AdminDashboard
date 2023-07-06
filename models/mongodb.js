const mongoose = require('mongoose')


mongoose.connect("mongodb://127.0.0.1:27017/customers")
.then(()=>{
    console.log("mongodb is connected");
}).catch(()=>{
    console.log("failed to connect");
})

const LoginSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Number,
        required: true
    }

})

const collection = mongoose.model("loginDetail",LoginSchema)
 
module.exports = collection;