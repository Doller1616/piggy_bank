const router = require("express").Router();
const userController = require('../controllers/user_controller.js')
const validateuser = require('../validators/user_validators.js')
const globalMidWare = require('../global_middlewares/global_middleware.js')

function execution_function (){
    postRoutes();
    getRouters();
}
execution_function(); //constructor


function postRoutes(){
 router.post("/register_user_info",validateuser.user_register(),globalMidWare.ractifyError,userController.regiatsrUserInfo);
  
  
}

function getRouters(){
router.get("/login_user",validateuser.login(),globalMidWare.ractifyError,userController.loginUser);
}

module.exports = router;