const express =  require("express");
const router   =  express.Router();
const Contract =  require("../models/Contract");
const  User  =  require('../models/User')
const jwt   =  require("jsonwebtoken");


router.get('/',(req,res)=>{
      console.log("inside route")
      res.send("hello")
});


router.post('/login',(req,res)=>{
   res.send("")
});



router.post('/create',(req,res)=>{
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


router.delete('/delete_contract',(req,res)=>{
        const _id =  String(req.query._id);
        console.log(_id)
        Contract.deleteOne({'_id':_id},(err)=>{if(err)  res.send(err)});

        res.send("contract deleted")
})





module.exports = router;