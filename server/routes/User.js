const express  =  require("express")
const router =  express.Router();
const User =  require("../models/User");
const  bcrypt  = require("bcryptjs");



router.get('/fetch_users',(req,res)=>{
      User.find({},(err,records)=>{
            res.send(JSON.stringify(records));
      })
});

router.post('/make_user',(req,res)=>{
      const name =  req.body.name;
      const  funds = req.body.funds;
      const  email = req.body.email;
      const password =  req.body.password;
    console.log(req.body)
    const user =  new User({
            name:name,
            funds:funds,
            email:email,
            password:password,
            dateJoined:new Date().toUTCString()
    });

    bcrypt.genSalt(10,(err,salt)=>{
          bcrypt.hash(user.password,salt,(err,hash)=>{
                if(err){throw err}
                user.password  =  hash;

                //save the user
                user.save((err)=>{if(err){res.send(err)}res.sendStatus(200,{message:"Account Created"})});



          })
    })

       
});


router.delete('/delete_user',(req,res)=>{

      const email  = req.query.email;

      User.deleteOne({email:email},(err)=>{if(err){res.sendStatus(403)}
      else{
           res.send(200,{message:'Account deleted'})
      }
    })
});

router.put('/add_funds',(req,res)=>{
       var temp  = Number(req.query.amount);
       User.update({email:req.query.email},{$inc:{'funds':temp}},function(err,docs){if(err){res.send(err)}res.send(200,{"message":"Funds Added"})})
});



module.exports  =  router;