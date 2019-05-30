const PORT  =  process.env.PORT || 4000
const express =  require("express")
const bodyParser =  require("body-parser");
const Router =   require("./routes/Contract")
const UserRoutes =  require("./routes/User");
const moongose =  require("./models/mongoose");
const jwt  = require("jsonwebtoken")
const cors =  require("cors")

const app =  express();
app.use(bodyParser.urlencoded(),bodyParser.json());
app.use(cors())
app.get('/',(req,res)=>{
     res.send("Welcome")
});


app.post('api/posts',(req,res)=>{
      res.json({
            message:"Post Created"
      });
})


app.post('/api/login',(req,res)=>{
      //mock_user
      var  user = {
          id:1,
          username:'rigoberto',
          email:"rigoc1994@gmail.com"
            }
      jwt.sign({user:user},'secret',{expiresIn:'10h'},(err,token)=>{
          res.json({
                token:token
          })
      });  
});

app.post('/api/posts',verifyToken,(req,res)=>{
     jwt.verify(req.token,'secret',(err,authData)=>{
         if(err){res.sendStatus(403)}
         else{
            res.json({
                message:"Post Created",
                authData,
          }); 
         }
     });
    
});


function verifyToken(req,res,next){
    // get auth token
    const bearerHeader  = req.headers["authorization"];
    // check if bearer is undefined
    if(typeof(bearerHeader)!=="undefined"){
          const bearer   = bearerHeader.split(' ')
          const bearerToken =  bearer[1];
          //set Token
          req.token   = bearerToken
          // next middleware
          next();
    }else{
            //Forbidenn
            res.sendStatus(403)
    }
}

app.use('/Contract',Router)
app.use("/User",UserRoutes);



app.listen(PORT,()=>{
     console.log(`Listening  on port ${PORT}`);
});

