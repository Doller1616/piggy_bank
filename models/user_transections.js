const mongoose = require('mongoose');

const user_transections = new mongoose.Schema({

    account_id: {
        type: mongoose.Types.ObjectId,
        ref:"user_account"
    },
    user_id : {
        type: mongoose.Types.ObjectId,
        ref:"user_detail"
    },
    amount: {
        type:String
    },
    to_from : {
        type:String
    },
    action_type:{
        type:String
    },
    transection_date: {
        type: Date
    }

})

module.exports = mongoose.model('user_transections',user_transections);