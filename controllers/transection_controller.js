const transectionmodel = require('../models/user_transections.js')

exports.addTransectionInfo = async function (req,res,next){

     let transection_details = req.body
     let user_details = req.userO
     let account_details = req.account_details;

     let transectionInfo = new transectionmodel({
        account_id: account_details._id,
        user_id: user_details.user_id,
        amount: transection_details.amount,
        to_from : transection_details.to_from,
        action_type: transection_details.action_type,
        transection_date: new Date()
       })

     account_details.transection_history.push(transectionInfo)
     await Promise.all([transectionInfo.save(),account_details.save()])
     res.status(200).json({"msg":"Account Added Succeccfully",'data':transectionInfo})
}