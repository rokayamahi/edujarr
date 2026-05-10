const userModel = require("../model/user.model");
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const bcrypt = require("bcrypt");

exports.registrationController = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;

   //hash the password
   const hashPassword = await bcrypt.hash(password, 12);

   const user = new userModel({
    name,
    email,
    password: hashPassword
   });

   await user.save();

   apiResponse(res, 201, true, 'User registered successfully', user);
   
})