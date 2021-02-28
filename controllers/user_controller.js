const usermodel = require('../models/user_model.js');
const accountmodel = require('../models/user_account');
const jwt = require('jsonwebtoken');


exports.regiatsrUserInfo = async function (req,res,next){
     console.log("Data : ",req.body);
    let userInfo = new usermodel({
        email :req.body.email,
        mobile_no : req.body.mobile_no,
        password :req.body.password,
        name :req.body.name,
        country :req.body.country
    })
   await usermodel.insertMany([userInfo],(err,result)=>{
        if(err)
        return res.status(200).json({msg:"Error occur",status:err});
        else
        res.status(200).json({msg:"Add info successfully",status:result})
    }) 
}


exports.loginUser = async (req, res, next)=> {
    const password = req.query.password;
    const user = req.userO;
    try {
        if(!(user.password === password)){return next(new Error('Incorrect password'))}
        //send response with token
        const token = jwt.sign({email: user.email, user_id: user._id},"secrets", {expiresIn: '24h'});

        let account_obj = await accountmodel.findOne({_id:user.account_details},{__v:0,user_id:0})
        .populate('transection_history').exec();

        user.account_details = account_obj

        const data = {token: token, user: user};
        res.json(data);
        } catch (e) {
        next(e);
        }
}