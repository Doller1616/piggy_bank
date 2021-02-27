const { body} = require('express-validator');
const usermodel = require ('../models/user_model.js')

exports.validate_account = ()=>  {
    return [
        body('user_id', 'User ID is Required')
           .custom((result, {req}) => {
            return  usermodel.findOne({user_id: result}).then(user => {
            if (user) {
            req.userO = user
            } else { throw new Error('User Not Exist')} })
         })
    ];
}