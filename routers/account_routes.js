const router = require("express").Router();
const accountController = require('../controllers/account_controller')
const accountValidator = require('../validators/account_validator.js')
const globalMidWare = require('../global_middlewares/global_middleware.js')

function execution_function (){
    postRoutes();
    getRouters();
}
execution_function(); //constructor


function postRoutes(){
 router.post("/create_account",globalMidWare.authenticate,accountValidator.validate_account(),globalMidWare.ractifyError,
  accountController.regiatsrAccountInfo);
}

function getRouters(){

}

module.exports = router;