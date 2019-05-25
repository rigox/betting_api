const mongoose = require("mongoose");

const userSchema =  mongoose.Schema({
      name:String,
      funds :  Number,
      contracts:[],
      positions:[],
      dateJoined :String  
});



const User =   mongoose.model("User",userSchema)

module.exports  = User;