const express = require("express");
const User = require("../model/userModel");
const {homepage, registerUser,loginUser, getUserData, updateUserExpense,  updateUserIncome, updateUserData } = require("../controllers/userControllers");
const router = express.Router();


    
router.post ("/register" , registerUser)  // Create Data API
       
router.post ("/login" , loginUser)  // Get/Read Data API

router.get('/' , homepage)
router.get('/:id' , getUserData)

router.patch('/:id/income', updateUserIncome);  // Update one User Data
router.patch('/:id/expense', updateUserExpense);  // Update one User Data

router.patch('/:id/transection', updateUserData)



   
module.exports = router