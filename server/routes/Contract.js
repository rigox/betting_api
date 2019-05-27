const express =  require("express");
const router   =  express.Router();
const Contract =  require("../models/Contract");
const  User  =  require('../models/User')
const jwt   =  require("jsonwebtoken");
const keys =  require("../config/keys");

router.get('/',(req,res)=>{
      console.log("inside route")
      res.send("hello")
});


router.post('/login',(req,res)=>{

      User.findById('5ce9a34ca87de457fa68efd5',(err,user)=>{
            
           jwt.sign({user:user},keys.secret_key,{expiresIn:'5h'},(err,token)=>{
                  res.json({
                        token:token
                  });
           }); 

      });


});





router.post('/create',verifyToken,(req,res)=>{
     const name = req.query.name;
     const terms= req.query.terms
     const moneyPool= 10
     const  description =  req.query.description
     const dateCreated =  new Date().toUTCString()

      var list =  terms.map(function(record){
               return(
                     {
                           name:record,
                           count:0
                     }
               )
      })
var contract =  new Contract({
        contract_name:name,
        description:description,
        terms:list,
        money_pool:moneyPool,
        player:[],
        dateCreated: dateCreated
});

contract.save((err)=>{
       if(err){throw err}
       res.send("Contract Created")
})
     


});


router.get('/fetch_contracts',(req,res)=>{
        
            Contract.find({},(err,records)=>{
                     if(err){throw err}
                     res.send(JSON.stringify(records));
            })

});


router.delete('/delete_contract',verifyToken,(req,res)=>{
        const _id =  String(req.query._id);
        console.log(_id)
        Contract.deleteOne({'_id':_id},(err)=>{if(err)  res.send(err)});

        res.send("contract deleted")
});

//function to Verify Token
function  verifyToken(req,res,next){
      const bearerHeader= req.headers["authorization"];
      
      if(typeof(bearerHeader)!=="undefined"){
             const bearer  =  bearerHeader.split(' ');
             const bearerToken  = bearer[1];

             req.token  =  bearerToken
             next();
      }else{
             res.sendStatus(403,{message:"Error"})
      }

};

//function to verify the user exist using password and email
function verifyUser(req,res,next){
        const  email  = req.query.email;
        const password =  req.query.password;
        
        User.find({'email':email,'password':password},(err,user)=>{
              if(err){res.sendStatus(404,{message:err})}
              else{
                  next(user);
              }
        });

}





module.exports = router;