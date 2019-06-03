const express  =  require("express")
const router =  express.Router();
const User =  require("../models/User");
const jwt  =   require("jsonwebtoken");
const bcrypt  =  require("bcryptjs");
const keys =  require("../config/keys");


router.get('/fetch_users',(req,res)=>{
      User.find({},(err,records)=>{
            res.send(JSON.stringify(records));
      })
});

router.post('/make_user',(req,res)=>{
      // it is consider that the fields  have been validated  on the  front_en    
      const name =  req.body.name;
      const  funds = req.body.funds;
      const  email = req.body.email;
      const password =  req.body.password;

      User.findOne({email:email})
      .then(user=>{
            if(user){
                res.send("User is Already register")  
            }else{
                  const newUser =  new User({
                        name:name,
                        funds:funds,
                        email:email,
                        password:password,
                        dateJoined:new Date().toUTCString()
                });
            
                bcrypt.genSalt(10,(err,salt)=>{
                      bcrypt.hash(newUser.password,salt,(err,hash)=>{
                            if(err){throw err}
                            newUser.password  =  hash;
                            //save the user
                            newUser.save((err)=>{if(err){res.send(err)}res.sendStatus(200,{message:"Account Created"})});
                      })
                })  
            }
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
//ss



//function to log in

router.post('/login',(req,res)=>{

      //check if the user exist in the DB
      const email =  req.body.email || req.query.email
      const password  = req.body.password || req.query.password
      console.log(password)
      User.find({email:email}).then(user=>{
            bcrypt.compare(password,user[0].password,(err,isMatch)=>{
                  if(err){
                        res.send("Password is incorrect")
                  }
                  if(isMatch){
                        jwt.sign({user:user},keys.secret_key,{expiresIn:'5h'},(err,token)=>{
                              res.json({
                                    token:token
                              });
                       }); 
                  }
            })
           
      }).catch(err=>{res.send(err)})

      //create a web token for the user
      //send the token to the user so is store in the front end


});




module.exports  =  router;