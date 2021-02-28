const router = require("express").Router();
const transectionController = require('../controllers/transection_controller')
const transectionValidator = require('../validators/transection_validation.js')
const globalMidWare = require('../global_middlewares/global_middleware.js')

function execution_function (){
    postRoutes();
    getRouters();
}
execution_function(); //constructor


function postRoutes(){
 router.post("/add",globalMidWare.authenticate,transectionValidator.validate_transection(),
 globalMidWare.ractifyError,transectionController.addTransectionInfo);
}

function getRouters(){
    router.get("/fatch_all",globalMidWare.authenticate,transectionValidator.validate_transection(),
    globalMidWare.ractifyError,transectionController.getAllTransections);
}


module.exports = router;