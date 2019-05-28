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
    const  email = req.query.email;
    const password =  req.query.password;

    const user =  new User({
            name:name,
            funds:funds,
            email:email,
            password:password,
            dateJoined:new Date().toUTCString()
    });

    user.save((err)=>{if(err){res.send(err)}res.sendStatus(200,{message:"Account Created"})});
       
});


router.delete('/delete_user',(req,res)=>{

      const email  = req.query.email;

      User.deleteOne({email:email},(err)=>{if(err){res.sendStatus(403)}
      else{
           res.send(200,{message:'Account deleted'})
      }
    })
});



module.exports  =  router;