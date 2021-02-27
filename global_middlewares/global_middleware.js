const { validationResult } = require('express-validator'); // it collect response from express-validators
const jwt = require('jsonwebtoken');

exports.ractifyError = (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        req.errorStatus = 422; // 422 Unprocessable Entity
        next(new Error(error.array()[0].msg)); // to global error method
    } else {
        next(); // to next middleware
    }
}

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.slice(7, authHeader.length) : null;
    // console.log("authHeader",req.headers);
    try {
        jwt.verify(token, 'secrets', ((err, decoded) => {
            if (err) {
                next(err)
            } else if (!decoded) {
                req.errorStatus = 401;
                next(new Error('User Not Authorised'))
            } else {
                req.userO = decoded;
                // console.log("decoded", decoded)
                next();
            }
        }))
    } catch (e) {
        req.errorStatus = 401;
        next(e);
    }
}