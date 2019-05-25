const mongoose = require("mongoose");
const keys  = require("../config/keys");

mongoose.Promise =  global.Promise


mongoose.connect(keys.mongo_url,function(err){
     if(err){throw err}
     console.log("Connection Succesful")
});



module.exports  ={mongoose:mongoose}
