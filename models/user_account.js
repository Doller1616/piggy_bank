const mongoose = require('mongoose');

const user_account = new mongoose.Schema({

    user_id : {
        type:String,
        required:true
    },
    account_no: {
        type:String,
        default:"556565446600005"
    },
    account_type: {
        type:String,
        required:true
    },
    transection_history:[{
        type: mongoose.Types.ObjectId, 
        ref: 'user_transections'
    }],
    balance: {
        type: Number
    },
    created_at: {
        type: Date
    },
})

module.exports = mongoose.model('user_account',user_account);
