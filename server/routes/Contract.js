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


router.post('/login',verifyUser,(req,res)=>{

      const email =  req.query.email;
      User.find({'email':email},(err,user)=>{
            
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



router.post('/join_contract',checkFunds,(req,res)=>{
      const email  =  req.query.email;
      const amount =  Number(req.query.amount)
      const contract_id =  req.query._id
      const choice =  req.query.choice;

      const position = {
             email:email,
             amount:amount,
             contract_id:contract_id,
             choice:choice
      }

      User.updateOne({email:email},{
             $push:{'positions':position},
             $inc:{"funds":-amount}},{multi:true}).then(a=>{
                   Contract.updateOne({$and:[{_id:contract_id},{'terms.name':choice}]},{
                         $push:{'players':position},
                         $inc:{"money_pool":amount},
                         $inc:{"terms.$.count":1}
                   },{multi:true}).then(a=>{
                         Contract.updateOne({_id:contract_id},{$inc:{"money_pool":amount}}).then(a=>{
                               res.send(a)
                         }).catch(err=>{res.send(err)})
                   });
             })
      
});



router.put('/close_contract',verifyToken,(req,res)=>{
      const  result  =  String(req.query.result)
      const _id  =  req.query._id
      const players  =  [];

      Contract.find({$and :[{"_id":_id},{"players.choice":result}]},function(err,c){
             if(err){res.send(err)}
             res.send(c);
      });


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
      console.log("inside middleware function")

        const  email  = req.query.email;
        const password =  req.query.password;
        console.log(email)
        console.log(password)

      User.find({email:email,password:password},function(err,user){
            if(err){
                  return  res.sendStatus(404,{message:"Error"})
            }else if(!user.length){
                return   res.sendStatus(404,{message:"User  does not exit"});
            }
            next();
      });
}
//function to check if the  User Making the Contract has Enough funds

function checkFunds(req,res,next){
     const email =  req.query.email;
     const amount =  Number(req.query.amount);
     User.find({email:email},function(err,user){
            console.log(user[0])
            const user_funds   = Number(user[0].funds);
            if(user_funds>= amount){
                   next();
            }else{
                  console.log("Not Enough Funds")
                  res.send(404,{"message":"The user does not have  enough funds in the account"})
            }
     });
}






module.exports = router;