const moongose =  require("mongoose");
const Schema =   moongose.Schema;


const contractSchema =  new Schema({
    
    contract_name:String,
    terms :[],
    money_pool : Number,
    players :[],
    dateCreated: Date


});

var a = 1
const Contract =  moongose.model('Contract',contractSchema)

module.exports  =  Contract;