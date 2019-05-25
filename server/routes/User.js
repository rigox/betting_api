const express  =  require("express")
const router =  express.Router();
const User =  require("../models/User");

router.get('/fetch_users',(req,res)=>{
      User.find({},(err,records)=>{
            res.send(JSON.stringify(records));
      })
});

router.post('/make_user',(req,res)=>{
    const name =  req.query.name;
    const  funds = req.query.funds;
    
    const user =  new User({
            name:name,
            funds:funds,
            dateJoined:new Date().toUTCString()
    });

    user.save((err)=>{if(err){res.send(err)}});
       
});


router.delete('/delete_user',(req,res)=>{
     const _id =  String(req.query._id);
     User.deleteOne({'_id':_id},(err)=>{if(err){res.sendStatus(403)}
      else{
           res.send(200,{message:'Account deleted'})
      }
    })
});


module.exports  =  router;