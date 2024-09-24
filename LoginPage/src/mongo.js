const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/Logindata")
.then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.log("faied to connect")
})

const loginschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

const collection=new  mongoose.model("Collection", loginschema)

module.exports=collection