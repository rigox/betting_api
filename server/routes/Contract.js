const express =  require("express")
const router   =  express.Router();
const Contract =  require("../models/Contract")

router.get('/',(req,res)=>{
      console.log("inside route")
      res.send("hello")
});

router.get('/create',(req,res)=>{
     const name = req.query.name;
     const terms= req.query.terms
     const moneyPool= 10
     const dateCreated =  new Date().getDate()

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





module.exports = router;