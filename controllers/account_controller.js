const accountmodel = require('../models/user_account.js')

exports.regiatsrAccountInfo = async function (req,res,next){

    let user_details = req.body
     let user = req.userO;
     let accountInfo = new accountmodel({
        user_id : user._id,
        account_no :user_details.account_no,
        account_type :user_details.account_type,
        created_at :new Date()
       })

     user.account_details = accountInfo
     await Promise.all([accountInfo.save(),user.save()])
     res.status(200).json({"msg":"Account Added Succeccfully",'data':accountInfo})
}