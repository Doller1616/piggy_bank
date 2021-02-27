const mongoose = require("mongoose")

const user_detail = new mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    email:{
        type:String,
        default:""
    },
    mobile_no: {
        type:Number,
        required:true
    },
    country:{
        type:String,
        default:""
    },
    account_details:{
     type: mongoose.Types.ObjectId, 
     ref: 'user_account'
    },
    side_menu:{
        type:[],
        default:["Home","Create Account"]
    },
    password:{
        type:String,
        default: ""
    }
})

module.exports = mongoose.model("user_detail",user_detail)