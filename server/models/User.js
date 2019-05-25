const mongoose = require("mongoose");

const userSchema =  mongoose.Schema({
      name:String,
      contracts=[],
      positions:[],
      funds =  Number

})



const User =   mongoose.Model("Users",userSchema)

module.exports  = User;