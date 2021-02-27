const { body,query, check } = require('express-validator');
const usermodel = require ('../models/user_model.js')

exports.user_register = ()=>  {
    return [
        body('email', 'Email is Required').isEmail()
           .custom((result, {req}) => {
            return  usermodel.findOne({email: result}).then(user => {
            if (user) {
            throw new Error('User Already Exist');
            } else { return true;} })
         }),
        check('password', 'Password is Required').isAlphanumeric()
        .isLength({min: 8, max: 20}).withMessage('Password must be greater then 8 characters and less the 20 characters'),
    ];
}

exports.login = ()=> {
    return [query('email', 'Email is Required').isEmail()
        .custom((email, {req}) => {
            return usermodel.findOne({email: email}).then(user => {
                if (user) {
                    req.userO = user; // to save user details in req
                    return true;
                } else {
                    throw  new Error('User Does Not Exist');
                }
            });
        }), 
       query('password', 'Password is Required').isAlphanumeric()
    ]
}