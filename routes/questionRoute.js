const express=require('express');
const router=express.Router();
const authMiddleware=require('../middleware/authMiddleware')
//authentication middleware
const authmiddleware=require("../middleware/authMiddleware");

//all question controller
const{allquecontroller,singquecontroller}=require('../controller/allquecontroller')

//all questions roiuter
router.get("/all-questions",allquecontroller)

//single question router
router.post("/single-question",singquecontroller)

module.exports=router;





