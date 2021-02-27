const { body } = require('express-validator');
const accountmodel = require ('../models/user_account.js')

exports.validate_transection = ()=>  {
    return [
        body('account_id', 'User ID is Required')
           .custom((result, {req}) => {
            return  accountmodel.findOne({account_id: result}).then(account_details => {
            if (account_details) {
            req.account_details = account_details
            } else { throw new Error('Account Not Exist')} })
         })
    ];
}