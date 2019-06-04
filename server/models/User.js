const mongoose = require("mongoose");

const userSchema =  mongoose.Schema({
      name:String,
      password:String,
      email:String,
      funds : Number,
      contracts:[],
      positions:[],
      isAdmin:Boolean,
      dateJoined :String  
});



const User =   mongoose.model("User",userSchema)

module.exports  = User;