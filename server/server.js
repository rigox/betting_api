const PORT  =  process.env.PORT || 4000
const express =  require("express")
const bodyParser =  require("body-parser");
const Router =   require("./routes/Contract")
const moongose =  require("./models/mongoose");


const app =  express();
app.use(bodyParser.urlencoded(),bodyParser.json());

app.get('/',(req,res)=>{
     res.send("Welcome")
})

app.use('/Contract',Router)




app.listen(PORT,()=>{
     console.log(`Listening  on port ${PORT}`);
});

