const usermodel = require('../models/user_model.js');
const jwt = require('jsonwebtoken');


exports.regiatsrUserInfo = function (req,res,next){
     console.log("Data : ",req.body);
    let userInfo = new usermodel({
        email :req.body.email,
        mobile_no : req.body.mobile_no,
        password :req.body.password,
        name :req.body.name,
        country :req.body.country
    })
    usermodel.insertMany([userInfo],(err,result)=>{
        if(err)
        return res.status(200).json({msg:"Error occur",status:err});
        else
        res.status(200).json({msg:"Add info successfully",status:result})
    }) 
}


exports.loginUser = (req, res, next)=> {
    const password = req.query.password;
    const user = req.userO;
    try {
        // await Utils.comparePassword({
        //     plainPassword: password,
        //     encryptedPassword: user.password
        // });

        //password check
        // console.log(!(user.password === req.query.password));
        if(!(user.password === password)){return next(new Error('Incorrect password'))}
        //send response with token
        const token = jwt.sign({email: user.email, user_id: user._id},"secrets", {expiresIn: '24h'});
        const data = {token: token, user: user};
        res.json(data);
        } catch (e) {
        next(e);
        }
}