const express=require('express');
const router=express.Router();

//authentication middleware
const authmiddleware=require("../middleware/authMiddleware");


//user controllers
const {register,login,checkUser}=require('../controller/usercontroller')



//register route
router.post("/register",register)


//Login user
router.post("/login",login)


//check user
router.get('/check',authmiddleware,checkUser)

module.exports=router;
