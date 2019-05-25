const moongose =  require("mongoose");
const Schema =   moongose.Schema;


const contractSchema =  new Schema({
    contract_name:String,
    terms :[],
    description:String,
    money_pool : Number,
    players :[],
    dateCreated: Date


});

const Contract =  moongose.model('Contract',contractSchema)

module.exports  =  Contract;